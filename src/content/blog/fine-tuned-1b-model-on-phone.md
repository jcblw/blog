---
title: 'I fine-tuned a 1B parameter model to run on my phone. Here''s what actually happened.'
description: 'A frontend engineer''s journey fine-tuning Gemma 3 1B for on-device dream analysis — from data wrangling and JSON disasters to quantization and shipping a model on Android.'
date: 2026-03-28
status: draft
---

*Written by a frontend engineer who had no business doing any of this*

---

I'm a frontend engineer. TypeScript, React, the usual. Until about a year ago, the closest I'd gotten to machine learning was `fetch("https://api.openai.com/...")`. Then I had this idea for a dream journal app, and the idea ruined my weekends and I love it.

The app is called Sandman. You wake up, record your dream, and an AI running on your phone extracts themes, tags emotions, identifies symbols, and finds patterns over time. The important part: nothing leaves the device.

There were two reasons I wanted it this way. The obvious one is privacy. Dreams are weird and personal and I didn't want to build something that uploads your subconscious to somebody else's server.

The less obvious one is resource cost. Every time you send a prompt to a cloud API, a data center somewhere spins up GPUs, pulls electricity, and uses water for cooling. A single ChatGPT query uses something like 10x the energy of a Google search. Multiply that by millions of people journaling their dreams every morning and you're burning real resources for what is, at the end of the day, a personal note-taking feature. A 1B model running on your phone doesn't need any of that. No network call, no server, no cooling system. The chip in your pocket was already drawing power whether you ran inference on it or not. Not every AI feature needs a data center behind it. A dream journal definitely doesn't.

That "on-device" constraint is what made the project interesting. It's also what made it hard.

## Choosing a model

The on-device constraint narrows your options fast. You need something small enough to fit on a phone, open-weights so you can actually fine-tune and ship it, and ideally well-supported by the deployment tooling you're targeting.

I looked at a few options. There are smaller models out there like [SmolLM2](https://huggingface.co/HuggingFaceTB/SmolLM2-1.7B) and Meta's [MobileLLM](https://github.com/facebookresearch/MobileLLM) that are purpose-built for mobile, but I didn't evaluate them seriously. Sandman needs to do structured extraction *and* generate conversational text (short dream interpretations, pattern summaries), and at that size I wasn't confident the models could hold a real conversation. [Qwen 2.5](https://huggingface.co/Qwen/Qwen2.5-0.5B) at 500M is surprisingly capable for its size, but [MediaPipe](https://ai.google.dev/edge/mediapipe/solutions/genai/llm_inference)'s conversion pipeline is most battle-tested with [Gemma](https://ai.google.dev/gemma), and I didn't want to fight the tooling on top of everything else.

I also tried [FunctionGemma](https://huggingface.co/google/gemma-2-2b-it-function-calling-GGUF), which seemed promising since Sandman is basically asking a model to do structured extraction, which is close to function calling. In practice, it was too specialized. The model *only* wanted to call functions. Ask it to generate any kind of free-form text and it would either refuse or try to shoehorn the response into a function call. Not useful when one of your tasks is generating a short dream interpretation in plain language.

There's no sub-1B Gemma, so [Gemma 3 1B](https://huggingface.co/google/gemma-3-1b-it) was basically the smallest general-purpose option in the family.

I was already building a native Android app in Kotlin, so Google's ecosystem was the path of least resistance. MediaPipe supports Gemma well, the conversion tooling (SafeTensors to TFLite to `.task` bundle) has decent docs, and 1B is roughly the ceiling for what a modern phone can handle without the experience feeling terrible.

What I didn't appreciate yet: 1B is small. It's a billion parameters, sure, but in LLM terms that's a model being asked to punch way above its weight. There's less room for error. Every bad decision during fine-tuning costs you more because the model has less capacity to paper over your mistakes.

## The data is everything

I had about 22,000 training examples. For fine-tuning, that's a lot. Most task-specific fine-tunes work fine with a few thousand. But I learned pretty quickly that volume without quality is just noise.

My data came from academic dream datasets ([DreamBank](https://dreambank.net/), a CC0-licensed [Dryad dataset](https://datadryad.org/) with 20,000+ coded dream reports), a cross-cultural interpretation dataset covering Western, Chinese, and Arabic traditions, and a symbol dictionary from a GitHub repo. The gathering phase was kind of fun, honestly. The cleaning phase was not.

I spent more time reformatting data than I did on any other part of this project. Fine-tuning is a data preparation problem. The actual training run is the easy part: configure hyperparameters, start the job, go do something else. The weeks of work that determine whether you get a useful model or an expensive autocomplete happen before training, in the tedious work of cleaning JSON schemas and making sure your examples actually teach what you think they teach.

## My first mistakes

22,000 training examples sounds like a strength. It wasn't. Or at least, not at first.

My initial fine-tuning run used the full dataset and the model overfit. It had memorized patterns in the training data so thoroughly that it was brittle with real input. Dream descriptions that didn't closely match the phrasing in the training set got weird, confused responses. I'd essentially taught it to be really good at the test and terrible at the job.

I had to scale back, clean more aggressively, and be more intentional about what went into the training set. More data isn't automatically better, especially with a 1B model that has limited capacity. It'll happily memorize your entire dataset instead of learning the underlying behavior if you let it.

The other early disaster was JSON. The model needed to output structured data: mood tags, symbol lists, theme extractions. So every output had to be valid, parseable JSON in a consistent schema. After my first fine-tuning run, it couldn't do this at all. It would produce these lovely flowing natural language dream interpretations but couldn't reliably close a curly brace.

What fixed it:

The biggest thing was putting a system prompt in every training example. If you train without system prompts and then add one at inference time, the model has never seen that pattern. It doesn't know what to do with it. I also varied the wording across examples ("Respond only in JSON", "Output valid JSON", "Return a JSON object with...") so it would learn the *behavior* rather than memorize one specific string.

The other thing was data hygiene. Every assistant turn in the training data had to be valid JSON. Not "mostly JSON." Not "JSON with a sentence before it." I wrote a script that parsed every output against the expected schema and flagged anything that didn't pass. At 22,000 examples, a 5% error rate is 1,100 bad examples, which is more than enough to teach the model bad habits.

I also stopped mixing formats. Some of my early examples had markdown outputs, others had JSON, and the model was blending them in creative and completely unhelpful ways. One format per task. No exceptions.

## One model, multiple jobs

Sandman needs the model to do four things: extract themes, identify symbols, tag emotions, and generate interpretations. I could have fine-tuned separate models, but running four models on a phone isn't realistic.

So, multitask: one model, multiple capabilities. The tricky part is the training data distribution. If 80% of your examples are symbol extraction and 10% are emotion tagging, the model will be great at one and mediocre at the other. I had to balance the mix.

I also added a task type hint in the system prompt, like `"Output format: symbol_extraction"`. This gave the model a clean signal to switch behavior instead of trying to infer what I wanted from the prompt text. Tiny change, disproportionate improvement.

## Converting the model (the part that made me question everything)

Going from a fine-tuned [HuggingFace](https://huggingface.co/) model to something that actually runs on a phone is a three-stage process.

First, [SafeTensors](https://huggingface.co/docs/safetensors/) to [TFLite](https://www.tensorflow.org/lite) using [`ai_edge_torch`](https://github.com/google-ai-edge/ai-edge-torch). Google has a `build_model_1b()` function that takes your weights, re-authors the architecture for mobile, and traces it all the way down to a TFLite FlatBuffer. It sounds like a lot, but the code is about 10 lines of Python.

Second, TFLite to `.task` bundle using MediaPipe's bundler. This wraps the model with a tokenizer and inference metadata into a single deployable file.

The catch: your fine-tuned model's architecture has to be identical to the base Gemma 3 1B. The conversion tool hardcodes the topology (26 layers, 8 attention heads, 4 KV heads, hidden size 2304). If your fine-tune only changed weights, you're fine. If you touched the architecture, it breaks, and the error messages won't help you figure out why.

Also: if you used [LoRA](https://huggingface.co/docs/peft/conceptual_guides/adapter#low-rank-adaptation-lora), merge the adapters first. Runtime LoRA loading doesn't work for Gemma 3 1B in MediaPipe. I didn't know that going in.

One more thing: the conversion needs a lot of RAM. I tried it on a 32GB machine and got OOM errors that took me an embarrassingly long time to diagnose. Budget 64GB+.

## Quantization

A 1B model in FP32 is about 3.8GB. That's too big for most phones. Quantization reduces weight precision to shrink the file, and the tradeoffs are real.

INT4 gets you to about 657MB and roughly 47 tokens per second on a flagship phone. INT8 lands around 1GB at 33 tok/s, with better accuracy. FP16 is 1.9GB and probably too big for most devices unless you're only targeting flagships. There are tradeoff tables in the `ai_edge_torch` docs if you want the full picture.

I started with INT8 because the docs said it was safe. Eventually moved to INT4 when I realized the quality loss was acceptable for my use case. For a dream journal, speed matters more than you'd think. You're using the app right after you wake up. You're groggy. If the response takes too long, the dream fades and you close the app.

Google publishes Quantization-Aware Trained checkpoints for base Gemma 3 1B that get down to 529MB at INT4 with better quality than post-training quantization. But those are base model only. If you've fine-tuned, you're on your own for quantization.

## On-device performance

After all the conversion work, I loaded the model onto my phone, ran a prompt, and waited.

It worked. But there's a gap between "works" and "feels good to use." On-device inference with a quantized 1B model is slower than you'd expect if your reference point is cloud APIs. Prefill takes a beat. Generation speed depends on the device, quantization, and how much context you're carrying.

Things that helped: test on real hardware (emulator performance is misleading), keep prompts short (every input token costs you during prefill), cap the generation length, and remember that context length is baked into the `.task` file at conversion time. I set `kv_cache_max_len` to 4,096, but for shorter interactions you could go lower.

I've also been looking at [Gemini Nano](https://developer.android.com/ai/gemini-nano), which hooks into Android's [AICore](https://developer.android.com/ai/aicore) and can offload to the NPU instead of running everything on CPU/GPU. You can't fine-tune it the same way, but for standard tasks the speed difference could be substantial. Still evaluating.

## The tooling keeps changing

One thing I didn't expect: the tooling is in active transition. `ai-edge-torch` is becoming [`litert-torch`](https://github.com/google-ai-edge/LiteRT). MediaPipe LLM Inference is being deprecated for [LiteRT-LM](https://ai.google.dev/edge/litert/inference). The `.task` format works today but `.litertlm` is the future format.

Nothing is broken, and the migration path seems manageable. But it means half the tutorials you find are already partially outdated, and "the right way" to do something depends on when you're reading the docs. Check the dates on everything.

## What I'd do differently

I'd prototype the full pipeline before optimizing any single step. I spent weeks perfecting my training data before I'd even confirmed that the conversion pipeline worked. Getting a hello world through the entire chain (train, convert, quantize, deploy, run on phone) should have been day one.

I'd build the JSON validation tooling before I started collecting data, not after my first failed training run.

And I'd seriously consider whether a 1B LLM was even the right tool. For structured extraction with consistent schemas, smaller models or non-LLM approaches might have worked and would have been way faster on-device.

## Where it's at now

The model is on HuggingFace at [`mujo-labs/sandman-gemma3-1b-multitask`](https://huggingface.co/mujo-labs/sandman-gemma3-1b-multitask). It converts to a `.task` bundle, runs on-device in a native Kotlin Android app, and produces structured JSON for dream analysis. Speed is acceptable on flagship phones with INT4 quantization. Not great. Acceptable.

The speed story needs more work. I want to try the LiteRT-LM migration. I'm still not sure 1B is the right size for this. But it runs on a phone, it does what I trained it to do, and no dream data goes anywhere. I'll take that for now.

---

*I'm still figuring a lot of this out. If you're working on something similar, I'd like to hear about it.*
