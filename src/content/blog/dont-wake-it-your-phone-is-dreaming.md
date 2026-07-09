---
title: "Don't wake it, your phone's dreaming"
description: "What building Sandman's background weekly summaries taught me about taking LLMs beyond the chat box, and why idle compute is about to get very busy."
date: 2026-07-08
status: published
---

Last Sunday morning I opened Sandman and my weekly dream summary was just there. No button, no spinner, no streaming tokens. The phone had written it overnight while sitting on the charger next to my bed. It's a small thing, but it felt different from every other LLM interaction I have in a day, and I've been chewing on why.

Almost every LLM product is chat. You ask, you wait, the answer streams in. The model only does work when a human is staring at the screen. Sandman's weekly summaries flip that: the model runs before anyone asks, and the answer is waiting when you show up. I think this pattern, precomputing things for the user, is where a lot of on-device AI is headed. Getting it working also taught me how many things stand in the way right now.

I'm clearly not the only one thinking this way. Google's new [Health Coach](https://blog.google/products-and-platforms/products/google-health/google-health-coach/) does the same thing with workouts: it compiles a plan for your week, sends you a notification when your recommendations are ready, and quietly rebuilds the plan when your readiness or sleep changes. They've even shifted the whole app from daily goals to weekly ones to match. The chat interface is still there, but the core value is the stuff the model did while you weren't looking. The difference is that Google's coach runs in the cloud on your health data, and Sandman runs on your phone. Same pattern, very different place for your data to live.

## How the summaries actually run

Sandman is a dream journal, and everything happens on the phone. The weekly summary is a [WorkManager](https://developer.android.com/develop/background-work/background-tasks/persistent) periodic job with constraints: device charging, battery not low. When Android decides the conditions are met, usually somewhere in the middle of the night, the job loads Gemma 4 E2B through LiteRT-LM, feeds it the week's journal entries, and writes out a summary of themes, recurring symbols, and patterns. The user sees a finished artifact in the morning. No dream ever leaves the device.

The thing that makes this viable is that latency stops mattering. There's a [recent benchmark of edge LLM inference](https://arxiv.org/abs/2603.23640) where a dedicated edge NPU generated about 7 tokens per second at under 2 watts. The authors point out that a 500-token response takes roughly 72 seconds at that rate, which is hopeless for conversation but perfectly fine for background summarization. Nobody is waiting. The whole cost model changes when the user isn't watching a cursor blink.

## Android does not want you to do this

The first hurdle is that the operating system is actively suspicious of background work, for good historical reasons. Doze mode and App Standby exist because apps used to burn battery doing sketchy things at 3am, and now every app pays the tax.

The practical consequence: a "weekly" job is not weekly. WorkManager's periodic intervals are minimums, not schedules, and the [official guidance](https://medium.com/androiddevelopers/workmanager-periodicity-ff35185ff006) is blunt that work can be delayed to the next maintenance window if the device is dozing. Then there are OEM battery managers on top of stock Android that kill background work even more aggressively. I've made peace with slop in the schedule. The job runs overnight Saturday so the summary is waiting Sunday morning, but "overnight" means whenever Android decides the constraints line up, not a time I picked. If I needed it at exactly 6am, I'd be using the wrong tool, and honestly the wrong platform.

## Heat is the real ceiling

The second hurdle surprised me more. In that same edge inference benchmark, an iPhone 16 Pro lost nearly half its throughput within two iterations of sustained load, and the Galaxy S24 Ultra hit a hard OS-enforced GPU frequency floor. Phones are built for bursts. Sustained LLM inference is the opposite of a burst.

Those numbers are exactly why Sandman's inference runs on the NPU instead. NPUs handle sustained inference at a fraction of the power draw with basically no throttling, and Google has been [pushing LiteRT toward NPU delegation](https://developers.googleblog.com/building-real-world-on-device-ai-with-litert-and-npu/) hard this year. The charging constraint still matters, since I'm not spending the user's battery, but a couple watts overnight on the NPU is a much easier ask than heating up the GPU for twenty minutes. The phone stays cool, the job finishes, and nobody wakes up to a warm brick.

## Nobody is there to say "that's wrong"

This one is more subtle. In chat, bad output is cheap. The user reads it, says "no, I meant the other thing," and the model corrects. A batch job has no second turn. The summary has to land right the first time, because the first time a user sees it is the finished product.

That raises the quality bar in ways I didn't expect. Gemma 4 E2B uses sliding window attention for most of its layers, and I've found that over long contexts the model can drift, holding the format fine at entry three and going sideways by entry seven. In a chat you'd notice and course-correct. In a background job, drift ships. So I chunk the week's entries, run a validation pass on the output structure, and keep the prompts more conservative than I would for interactive use. Boring prompts, reliable output. I've learned to like boring.

Cold starts sting too. Model loading in that arxiv setup took almost 12 seconds before a single token. Once a week, who cares. But if I want lots of small precomputed things instead of one big weekly one, the load cost starts to dominate, and the design pressure becomes doing as much as possible per model load instead of loading the model whenever a job needs it.

## All the compute, all the time

Here's the frame I keep coming back to. My phone spends around eight hours a night on a charger, plugged into wall power, with an NPU that draws almost nothing at idle. That's a nightly window of free, thermally comfortable, battery-irrelevant compute, and right now almost nothing uses it.

I think that changes. Once inference is cheap enough and the scheduling problems get tamed, the interesting question stops being "how fast can the model answer" and becomes "what's worth computing before anyone asks." Digests are the obvious first case. But also: embeddings for semantic search, indexes over your own data, drafts of things you'll probably want, answers to questions you haven't asked yet. Speculative work, done on spec, discarded when wrong. Wasteful by the old accounting, free by the new one.

I'd bet that in a few years the idle compute on our devices is mostly spoken for, the same way idle network bandwidth got spoken for by sync and prefetch. Chat will still exist, but it'll be the exception, the thing you do when the precomputed answer missed.

## What I'm trying next

Two things. First, packing more work into each overnight model load, so the same session that writes the weekly summary can also handle smaller precomputed artifacts without paying the cold-start tax twice. Second, precomputing embeddings for every entry so semantic search over your dream history is instant, another job that can run while nobody's watching.

There's something I find genuinely funny about all of this: I built a dream journal, and it turns out the app also does its best work while you're asleep.

---

*This is part of an ongoing series about building [Sandman](https://sandman.sh), an on-device dream journal app. The previous post, ["The agent loop pattern that made a 2B model stop embarrassing itself"](/agent-loops-local-models), covers splitting the on-device agent loop into route, execute, and respond stages.*
