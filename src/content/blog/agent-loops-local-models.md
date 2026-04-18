---
title: 'The agent loop pattern that made a 2B model stop embarrassing itself'
description: "One giant prompt didn't work. Splitting the agent loop into route, execute, respond made a 2B local model actually reliable."
date: 2026-04-18
status: published
heroImage: /agent-loops-local-models-hero.png
---

My [last post](/gemma-4-tool-calling) was about adding tool calling to [Sandman](https://sandman.sh). That post covered the what. This one is about the how, and specifically about the thing that took the longest to figure out: the agent loop itself.

It took me a while to get here. My first approach was a mess, and I ended up rewriting the whole loop before it started working reliably.

## The one giant prompt problem

My first version of the agent loop was simple. One system prompt that contained everything: the persona instructions, all the tool definitions, the dream context, the user's memories, conversation history. The model got all of it every turn and was expected to figure out what to do.

This works fine with big cloud models. They have enough capacity to hold all that context and still make good decisions about when to call tools versus when to just respond. A 2B model running on a phone does not have that luxury.

What actually happened was the model would get confused about what it was supposed to be doing. It would call tools when it should have just responded. It would try to use tools that didn't exist, or hallucinate tool syntax that looked almost right but wasn't parseable. It would constantly forget how to format tool calls, like it couldn't hold the formatting instructions and the conversation in its head at the same time. The prompt was something like 1500 tokens of instructions before the user even said anything, and once the payload got large enough the model would slow down noticeably on top of everything else.

The worst part was the inconsistency. The same message would get routed correctly one time and completely wrong the next. I kept tweaking the prompt, reordering sections, adding emphasis to certain instructions. It helped a little but the fundamental problem was that I was asking a small model to do too many things at once.

## Splitting it up

The fix was breaking the loop into three steps, each with its own focused prompt.

**Step 1: Router.** A tiny prompt, maybe 300 tokens, that routes the request to the correct system prompt. Is this a question about a past dream? A request to look up a symbol? Just a normal conversational response? The router doesn't generate any text the user sees. It just emits a structured tag like `<lookup symbol="water" />` or `<respond />`. I run this at low temperature (0.3) so it's deterministic.

**Step 2: Execute.** Based on the router's decision, run the appropriate tool calls. This step doesn't use the model at all. It's pure function calls. If the router said "lookup," query the dream database. If it said "memory," fetch the user's stored memories. The results get formatted as `<tool_result>` blocks.

**Step 3: Respond.** Now the model gets a second, different prompt. This one is the persona prompt, but it's focused. It only includes the tool definitions that are relevant to this step (interactive tools like saving a symbol meaning, not the read-only lookup tools that already ran). It gets the user's message plus whatever data Step 2 gathered. The model's job is just to write a good response using the information it's been given.

The thing that made this click for me is that Step 1 and Step 3 use completely different system prompts. The router prompt is minimal and structured. The response prompt is conversational and persona-driven. Neither prompt has to do both jobs.

## Why this works better on small models

I think the reason this works is that small models need you to reduce the problem for them. A big cloud model can handle "you're a dream journal assistant, here are your tools, here's the user's history, here's the current dream, now respond appropriately" and figure it out. Every time I tried that with the 2B model it was a coin flip.

By the time the model gets to Step 3, it doesn't have to decide whether to call a tool or not. That decision already happened. It doesn't have to figure out what data it needs. That data is already there. All it has to do is be a good conversational partner with all the context it needs already provided.

The router prompt works because it's a classification task, not a generation task. Small models are surprisingly good at picking from a short list of options when you frame it right. Five possible routes, structured output, low temperature. That's a much easier job than "here's everything, figure out what to do."

I'm not saying this is the best approach. There might be something smarter I haven't tried yet, or a way to get the single-prompt version working with better prompt engineering. But this is what got me from unreliable to reliable, and for now that's enough.

## The loop part

There's one more piece. After Step 3 generates a response, I check if the model emitted any additional tool calls. If it did, and they're read-only, I execute them and run Step 3 again with the new data included. This gives the model one chance to gather more information if it realizes mid-response that it needs something.

I cap this at one extra loop. Two reasons: latency on a phone is already noticeable with the base pipeline, and letting a 2B model loop indefinitely is asking for trouble. One extra round trip has been enough for every case I've hit so far.

## What I got wrong along the way

The router was tricky to get right. My first version had too many routes. I started with maybe ten different intents and the model couldn't reliably distinguish between them. I collapsed it down to five and accuracy went way up. With small models, fewer categories is almost always better.

I also spent too long trying to make the tool parser strict. The model doesn't always produce perfect XML. Sometimes it'll close a tag wrong, or put the attributes in a weird order, or wrap the tool call in a JSON block for some reason. I ended up writing a very forgiving parser that handles all the common malformations. I have something like 56 tests just for the parser at this point, each one covering a different way the model has mangled a tool call. Fighting the model's output format is a losing battle with local models. You just have to be flexible about what you accept.

The other thing I wish I'd done earlier is strip tool markup from the visible response. For a while, users could occasionally see raw XML tags in the chat. Now the parser strips all tool-related markup before the response hits the UI. Small thing but it matters.

## The prompt is the product

Most of the issues I've run into building this, I've solved by changing prompts rather than changing code. The router got better when I simplified the prompt, not when I added more parsing logic. The response quality improved when I stopped trying to cram everything into one prompt and let each step focus on one job.

With big models, the prompt is important but the model can compensate for a mediocre one. With small models, the prompt is basically the entire product. Every token counts because there aren't that many to work with, and the model will faithfully follow whatever you tell it to do, including the parts where your instructions are ambiguous or contradictory.

The other thing I keep thinking about is fine-tuning. Tool calling feels like a good candidate for it — training the model to reliably produce the right format instead of prompt-engineering around its mistakes. My worry is losing some of the generalized behaviors I actually like about the base model. Fine-tuning can make a model great at one thing and worse at everything else. I'll be testing this eventually, but for now the prompt-and-parser approach is holding up.

The pipeline approach changed how Sandman feels to use. Before, I'd send a message and hold my breath wondering if the model would do the right thing. Now it's consistent. The router picks the right path almost every time, the tools gather the data, and the model just has to be a good conversational partner. I went from debugging weird tool hallucinations every other day to mostly just tweaking the persona prompt to get the tone right. That's a much better problem to have.

---

*This is part of an ongoing series about building [Sandman](https://sandman.sh), an on-device dream journal app. Previous post: ["Gemma 4 tool calling turned my 2B model into something I actually want to talk to"](/gemma-4-tool-calling).*
