---
title: '6 things that changed when I swapped Gemma 3 for Gemma 4'
description: 'I shipped Sandman with a fine-tuned Gemma 3 1B model. Gemma 4 came out three days later and I ripped it all out.'
date: 2026-04-06
status: published
---

In my [last post](/fine-tuned-1b-model-on-phone), I wrote about fine-tuning [Gemma 3](https://ai.google.dev/gemma) 1B to analyze dreams on-device for my app [Sandman](https://sandman.sh). That post covered the whole mess: dataset creation, LoRA fine-tuning, the conversion pipeline, getting it running through [MediaPipe](https://ai.google.dev/edge/mediapipe/solutions/genai/llm_inference). It worked. I shipped it.

Then Google released [Gemma 4](https://ai.google.dev/gemma) three days later and I ripped it all out. I've been experimenting with the E2B model for about a week now. Here's what I've noticed.

## 1. The chat feature isn't a beta anymore

Sandman has had a chat feature for a while where you can talk back and forth with the model about your dream. With Gemma 3 it was labeled "beta" because, honestly, it couldn't really hold a conversation. It would just say what it wanted to say regardless of what you'd told it. You'd share something specific about your dream and the response would feel like it was written before you even said anything.

With E2B it can actually have a conversation. I've been logging my own dreams and chatting with it, and I've gotten genuine insight from it. Not every time, but enough that I stopped thinking about whether the feature works and started thinking about how it should sound. Like, what tone should this thing have? How should it talk to someone about their dreams at 6am? That's a totally different kind of problem than "can it hold context for more than two turns," and the fact that I'm even asking those questions means the model crossed a line somewhere.

## 2. JSON doesn't break

My longest-running headache with Gemma 3 was getting it to return valid JSON. The model would stop mid-bracket, hallucinate key names, wrap JSON in markdown backticks for no reason. I wrote retry logic, fallback parsers, added special tokens to the training data. All of it was duct tape.

E2B produces clean JSON almost every time. But the bigger thing is what's inside the JSON. I've seen the symbol extraction pull out like 8 symbols from a single dream and return the whole thing as valid structured output. With Gemma 3 I was happy if it caught 3 or 4 without breaking the response. It's still slower than I'd like, but I think there's room to speed things up on the processing side rather than it being a model limitation.

## 3. Bye bye task files

This one caught me off guard. The `.task` file format I spent months learning, the MediaPipe LLM Inference API I built everything on top of, the SafeTensors to TFLite conversion pipeline I documented in my last post: all of it is on the way out. The new path is [LiteRT-LM](https://ai.google.dev/edge/litert/inference) with `.litertlm` model files.

I was annoyed at first. I fought for that pipeline. But the new tooling feels more intentional, and the memory and speed improvements are real. Google claims E2B runs under 1.5GB RAM with mixed quantization. I haven't verified the exact number but the footprint feels noticeably lighter.

## 4. My app already speaks Spanish

Gemma 4 is trained on over 140 languages. I didn't think much about that until I tried chatting with it in Spanish on a whim. It just worked. The dream analysis, the back and forth, all of it held up without any extra work on my side.

With Gemma 3 this wasn't really an option. My fine-tuning dataset was entirely in English, so the model's responses skewed hard toward English even though the base model technically supported other languages. Multilingual support was something I'd filed away as a "maybe someday" feature that would require building out training data in other languages. Now it's just there. Sandman could ship with Spanish support tomorrow and I wouldn't have to train anything new for it.

## 5. You can take a picture of your journal

E2B supports native image input. OCR, handwriting, images alongside text in the same prompt. I wasn't thinking about this at all until I realized a lot of people keep physical dream journals.

You wake up, scribble your dream in a notebook like you always have, then snap a photo and let the model read it and run the analysis. No typing, no transcription step, just your handwriting straight into the model. It supports variable aspect ratios and you can configure how many visual tokens it uses per image, so there's room to balance quality against speed on-device.

I haven't built this yet but I think it might be the feature that clicks for people who already journal but don't want to change how they do it.

## 6. Apache 2.0

Gemma 4 ships under [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0) instead of Google's custom Gemma license. For Sandman, which I want to ship as a consumer app eventually, this just removes a thing I was thinking about in the back of my head.

---

*This is part of an ongoing series about building [Sandman](https://sandman.sh), an on-device dream journal app. The previous post, ["I ruined my weekends teaching a 1B model to interpret dreams on a phone"](/fine-tuned-1b-model-on-phone), covers the Gemma 3 fine-tuning journey.*
