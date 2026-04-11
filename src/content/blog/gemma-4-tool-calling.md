---
title: 'Gemma 4 tool calling turned my 2B model into something I actually want to talk to'
description: 'A follow-up to my Gemma 4 post. On-device tool calling, agent loops, and what it is like to actually use a 2B model every day.'
date: 2026-04-11
status: published
heroImage: /gemma-4-tool-calling-hero.png
---

I published my [Gemma 4 post](/swapped-gemma-3-for-gemma-4) and almost immediately realized I left out the thing I've been most excited about. Tool calling.

It's changed how [Sandman](https://sandman.sh) feels to use more than anything else I wrote about last time. I've been living with it for a bit now, and I wanted to write up where things are at.

## The problem tool calling solved

I kept running into the same frustration when chatting with the model. I'd be talking about a dream and want to ask "have I dreamed about this before?" or "what does this symbol usually mean?" The model had no way to answer. It could only work with what was in the prompt right now. With Gemma 3 this was just a limitation I accepted. The model was the whole system, and if the information wasn't in the context window, it didn't exist.

Once I realized Gemma 4 E2B supported tool calling it clicked. I could give the model a way to go get what it needed instead of me trying to anticipate everything up front.

## What I've built so far

I started with two tools: a memory lookup that searches your previous dreams, and a dream symbol dictionary.

The memory tool is the one that changed things. If you had a recurring dream about water three weeks ago and you mention water again today, the model can actually go check your history. I logged a dream about being lost in a building last week, and when I logged one about hallways today it pulled up the old entry and connected them on its own. I didn't ask it to. That was a cool moment.

The symbol lookup is simpler. Instead of relying on whatever the model learned during training, it can query an actual dictionary. I'm using the same symbol dataset I originally used for fine-tuning, but now it's a lookup table instead of baked-in knowledge. The interpretations reference real dream analysis frameworks instead of whatever the model half-remembers.

## The agent loop

Tool calling on its own is just a single round trip. The model asks for something, gets it, continues. But I realized pretty quickly that I needed an actual agent loop. The model calls a tool, my app executes it, passes the result back, and the model decides what to do next. It might call another tool, or respond, or evaluate its own response and try again.

This is what made the chat feature actually work. The model can gather a previous dream, look up a symbol, and then put it all together in one response. Instead of just reacting to the last thing you said, it pulls in context from different places and the responses actually feel informed.

We also added animations and better feedback for when the model is working through a tool chain. Without that it just felt like the app was frozen. With the loading states it feels more like the model is actually doing something, which it is. It makes a big difference.

## The hiccups

It's not perfect. Sometimes the model calls a tool and then doesn't use the result, like it forgot why it asked. Other times it calls the memory tool looking for something specific and gets back a bunch of unrelated entries because my retrieval isn't great yet.

The bigger issue I've been hitting is context. Every tool call adds tokens. The tool request, the result, all of it stays in the conversation. After a few back-and-forth exchanges with tool calls mixed in, the context gets large and the model starts losing its place. It'll repeat things it already said or forget what you told it two messages ago. On a phone with limited context length this adds up fast.

There's also the latency I mentioned. Each tool call is a round trip, and when the model chains two or three of them the response time is noticeable. We've managed to make it feel okay with the loading animations, but it's something I'm keeping an eye on.

## Living with a 2B model

I've been using Sandman as my actual dream journal for a while now. Every morning I log whatever I remember and chat with it a bit. It's good. Not as smart as you'd wish. It misses things, it makes connections that don't quite land, it occasionally loses the thread of a conversation. But it's all on the device, it's private, and it's mine.

Most of the issues I've run into I've been able to prompt my way out of. The system prompt is doing a lot of heavy lifting. When the model does something weird, my first instinct now is to tweak the prompt rather than assume the model can't do it. More often than not that works.

## What I'm thinking about next

Tool calling opened up a lot of ideas. I keep going back and forth on whether to give the model access to the internet. It would be useful for looking up cultural context around symbols, but it also kind of defeats the whole on-device philosophy. I haven't decided yet.

The wilder idea I keep coming back to is something like a smart tamagotchi. Sandman already remembers your dreams and has a consistent voice and can look things up. That's honestly not that far from a little persistent character that lives on your phone. I don't know exactly what that looks like yet but I keep thinking about it.

I don't know if any of that will happen, but a year ago I didn't know what fine-tuning was, so who knows.

---

*This is part of an ongoing series about building [Sandman](https://sandman.sh), an on-device dream journal app. Previous posts: ["I ruined my weekends teaching a 1B model to interpret dreams on a phone"](/fine-tuned-1b-model-on-phone) and ["6 things that changed when I swapped Gemma 3 for Gemma 4"](/swapped-gemma-3-for-gemma-4).*
