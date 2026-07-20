---
title: "Don't wake it, your phone's dreaming"
description: "Idle compute is already becoming an appealing place to precompute. How Sandman uses your phone's overnight hours to make weekly summaries feel like magic."
date: 2026-07-08
status: published
heroImage: /dont-wake-it-your-phone-is-dreaming-hero.png
---

Last Sunday morning I opened Sandman and my weekly dream summary was just there. I didn't get to experience the fantastic animations Sandman plays while it's thinking. It was just there. The phone had written it overnight while sitting on the charger next to my bed. It's a small thing, but it felt different from most LLM interactions I have in a day.

Here's the thought that I keep coming back to. My phone spends around 7 hours a night on a charger, with an NPU chip that can crunch a bunch of matrix math. That's a nightly window of free compute, not warm from watching videos, not on the last 10% of juice, and it's an appealing place to precompute things instead of making people wait for them.

Google's [Health Coach](https://blog.google/products-and-platforms/products/google-health/google-health-coach/) creates a workout plan for the week before you ask and lets you know about it Monday morning. The chat box is still there for changes on the fly, but the value is the stuff the model did while you weren't looking. The difference is that Google's coach runs in the cloud on your health data. Sandman runs the same pattern on the phone, and no dream ever leaves the device.

## How the sausage is made

The weekly summary is a [WorkManager](https://developer.android.com/develop/background-work/background-tasks/persistent) cron job with constraints: device charging, battery not low. When Android decides I can run this job, usually somewhere in the middle of the night, the job loads Gemma 4 E2B through LiteRT-LM, feeds it the week's journal entries, and writes out a summary of themes, recurring symbols, and patterns. The user sees a finished artifact in the morning.

What makes this viable is that latency stops mattering. There's a [recent benchmark of edge LLM inference](https://arxiv.org/abs/2603.23640) where a dedicated edge NPU generated about 7 tokens per second at under 2 watts. A 500-token response takes over a minute at that rate, which is hopeless for conversation and perfectly fine for a job nobody is waiting on.

## Android permits, but is not a fan

Doze mode and App Standby exist because apps used to burn battery doing sketchy things at 3am, and now every app pays the compute tax. A "weekly" WorkManager interval is a minimum, not a schedule, work can slip to the next maintenance window, and OEM battery managers kill background work even more aggressively. I've made peace with slop in the schedule: the job runs overnight Saturday, but "overnight" means whenever Android decides the constraints line up, not a time I picked.

Getting the job to start is only half of it, because a regular worker gets about ten minutes before the system stops it, and a model load plus a week of entries can blow past that. The fix I landed on is promoting the worker to a [foreground service](https://developer.android.com/develop/background-work/services/foreground-services) mid-job: `setForeground()` turns my invisible batch job into something Android treats like the user is watching it. You need the `FOREGROUND_SERVICE` permission, a declared service type (I use `specialUse`, since on-device inference doesn't fit any of the named categories, which also means explaining yourself to Play review), and `POST_NOTIFICATIONS` so the mandatory persistent notification actually shows. It's a strange bargain: to be allowed to work while nobody's watching, the app has to put up a sign saying it's working. I'll be honest, I use these same permissions for chat already, so it's not like I'm adding new ones just for this workaround.

## The heat is turning up

In that same benchmark, an iPhone 16 Pro lost nearly half its throughput within two iterations of sustained load. Phones are built for bursts, and sustained inference is the opposite of a burst. That's why Sandman's inference runs on the NPU: sustained throughput at a fraction of the power draw with basically no throttling, and Google has been [pushing LiteRT toward NPU delegation](https://developers.googleblog.com/building-real-world-on-device-ai-with-litert-and-npu/) hard this year. The phone stays cool, the job finishes, and nobody wakes up to a warm brick.

## Chat is cheap, this needs validation

In chat, bad output is cheap. The user reads it, says "no, I meant the other thing," and the model corrects. A batch job has no second turn, so the first thing a user sees has to be the finished product. Gemma 4 E2B uses sliding window attention for most of its layers, and over long contexts I've found it can drift, holding the format fine at entry three and going sideways by entry seven. So I chunk the week's entries, run a validation pass on the output structure, and keep the prompts more conservative than I would for interactive use. Boring prompts, somewhat reliable output.

## What's worth computing before anyone asks

What gets me is how much of this works right now, with current models. A model small enough to fit in a phone's memory can read a week of messy, personal writing and hand back real structure: themes, recurring symbols, patterns I hadn't noticed myself. Give it the overnight window and today's on-device models are already enough for digests, embeddings for semantic search over everything you've written, indexes over your own data, drafts of things you'll probably want. None of that needs a frontier model. It needs a quiet hour and a charger.

And the models are the fastest-moving part of the stack. Each generation of small models absorbs things that needed a cloud GPU the year before; Gemma 4 E2B already handles tool calling well enough to run the agent loop from the last post. Give that trend a year or two and I think the overnight jobs stop being summaries and start being work: agents that organize and cross-reference your data, draft the things you were going to write anyway, maybe fine-tune themselves to your voice without your words leaving the device. I'd bet the idle compute on our phones ends up mostly spoken for, the same way idle bandwidth got spoken for by sync and prefetch. Chat will probably exist forever, but as a way to steer when the precomputed answer misses.

For Sandman that means packing more work into each overnight model load, since cold starts cost about 12 seconds before the first token, precomputing embeddings so semantic search over your dream history is instant, and eventually a year-of-dreams retrospective no interactive session would sit through. There's something I find genuinely funny about all of this: I built a dream journal, and it turns out the app also does its best work while you're asleep.

---

*This is part of an ongoing series about building [Sandman](https://sandman.sh), an on-device dream journal app. The previous post, ["The agent loop pattern that made a 2B model stop embarrassing itself"](/agent-loops-local-models), covers splitting the on-device agent loop into route, execute, and respond stages.*
