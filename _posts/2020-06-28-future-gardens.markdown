---
layout: post
title: "Future Gardens"
date: 2020-06-07 20:00
categories: games
---

{::options parse_block_html="true" /}

# Future Gardens
{: #app-section}

{% include collapser.markdown %}

<div>

</div>

# Developer commentary
{: #dev-commentary}

{% include collapser.markdown %}

<div>

## Inspiration
{: #inspiration}

{% include collapser.markdown %}

<div>

### Prestige in incremental games
{: #prestige-incremental}

{% include collapser.markdown %}

<div>

Incremental games, otherwise referred to as clicker games or idle games, are characterized by a large range of numbers for you to climb, lots of waiting, and possibly clicking.
They also commonly have some form of a game mechanic called "prestige".

As commonly presented to the player:

> Once you reach a certain point in the game, you can reset your game but gain a permanent boost, which helps you progress faster and climb higher in the ladder in future runs.

First of all, you aren't truly resetting your game.
Generally you do give up some kind of progress or resource, but you gain something new in the process.

</div>

### Exploring prestige with matchstick diagrams
{: #matchstick-exploration}

{% include collapser.markdown %}

<div>

If we mark the times where we reach milestones in the game leading up to the first prestige, or even as we obtain individual units of game resource or currency, it looks something like this.

{% include light_box_begin.markdown %}

![Matchstick diagram of omega. Looks like the rungs of an infinite ladder, extending off into the distance.](/assets/ordinal-images/matchstick-omega.svg)

{% include light_box_end.markdown %}

*This "matchstick diagram" and all other matchstick diagrams in this post were taken from [Madore's website](http://www.madore.org/~david/weblog/d.2011-09-18.1939.nombres-ordinaux-intro.html). I did not make them, and I am using them here for educational purposes.*

It gets progressively faster until you reach the point in the game where you can prestige.
So far, not very interesting.

Later runs are faster than the first, and we start to gain prestige bonuses faster.
In many incremental games, this prestige is even measured by another number, much like the basic resource or currency of the game.
If we mark the times that we prestige, they form another accelerating series, which quite possibly converges if the game is eventually won or there is yet another layer of prestige after this one.

{% include light_box_begin.markdown %}

![Matchstick diagram of omega^2. Looks like a series of infinite ladders, where the horizon at the end of each ladder leads into the start of the next, and the series as a whole tapers off into the distance.](/assets/ordinal-images/matchstick-omega-2.svg)

{% include light_box_end.markdown %}

Oops! We accidentally invented the matchstick diagram.

</div>

### Ordinal model of prestige
{: #ordinal-prestige}

{% include collapser.markdown %}

<div>

I already teased it earlier, but ordinals provide a natural way to measure prestige.
You can read more about ordinals elsewhere, but here, I only provide a brief introduction.

Ordinals extend the natural numbers.
Under the Von Neumann definition of ordinals, every ordinal is a set which contains all the ordinals that are less than it and only those ordinals.
*0* is the empty set since it is the smallest ordinal, *1* is *{0}*, *2* is *{0, 1}*, and so on.
*ω* then is precisely the set of all natural numbers: *{0, 1, 2, 3, ...}*
By definition, all the natural numbers, since they are included in *ω*, are less than *ω*.

In the game, we count up at first in the natural numbers: *0, 1, 2, 3, ...*
Once we reach some arbitrary large number *N*, we are able to prestige, which moves us to *ω*.
We would have a single *ω*, representing a point of prestige, and no large number *N* tacked onto it, which would represent the basic currency.
According to the ordinals, *ω* is larger than any possible *N*.
Does this make sense?
Well, the first prestige is the eventual goal of any first run.
Regardless of how long that run takes or how high you ascend there, every possible run ends up at that same prestige point.
In a similar manner, *ω* is the limit of the sequence *0, 1, 2, 3, ...*.
If you follow that sequence, or any increasing sequence of numbers, at infinity, you eventually reach *ω*.

In the second run, we count up with *ω + N*.
Then, at the second prestige, we move to *ω2*.
This counts up as *ω2 + N*, eventually reaching *ω3*, and so on.
If there is another layer of prestige after the first layer, the eventual goal of all runs would be the first prestige of the second prestige layer.
In a similar manner, the limit of the sequence *0, ω, ω2, ω3, ...* is *ω<sup>2</sup>*.
Thus, *ω<sup>2</sup>* is the unit of the second prestige layer.

</div>

### Prestige in batches
{: #prestige-batch}

{% include collapser.markdown %}

<div>

A lot of incremental games won't just give you a single *ω* after collecting enough *1*s, but rather, allow you to redeem multiple *ω* at once.
Notably, if you get far enough in your first layer run, you can redeem more *ω* at once than if you just got barely far enough to redeem any at all.
This would, at first glance, appear to break our ordinal model of prestige.

Skipping ordinals doesn't matter.
What's important that characterizes *ω* as *ω* is that you had to trade in your *1* progression to get a *ω*, which preserves *ω* and higher currencies.
Given the choice between *ωN* and *M*, you would certainly take *ωN*, unless you could trade in *M* immediately for at least *ωN*.

Fractional units work fine too.
You can read about [surreal numbers](https://en.wikipedia.org/wiki/Surreal_number) if you're interested.
It's the most natural way to combine infinite ordinals and real number arithmetic, though beware, to achieve that, we need to give up normal ordinal arithmetic.
In the surreals, *1 + ω = ω + 1* just as real number addition is commutative, but this is not true for ordinals.

</div>

### *ω<sup>ω</sup>* and prestige
{: #omega-omega-prestige}

{% include collapser.markdown %}

<div>

At this point I am obligated to inform you that **ordinals are meaningless for ascending**.
No matter where you start, no matter how you count, there will always be an infinite number of ordinals above.
You can ascend in any silly and arbitrary sequence and get an infinite sequence of ordinals.
The true utility of ordinals is in descending.
The ordinal *3* says you can take only 3 steps down.
The ordinal *ω* says the number of steps down you can take is unbounded, but once you take your first step, you lock yourself in to a finite number of steps remaining.
The ordinal *ω2* says once you take your first step, you either lock yourself into a finite number of steps remaining total, or you lock yourself into a finite number of steps before you must take a step that locks yourself into having a finite number of steps remaining total.
Descriptions of this form become cumbersomely long with higher ordinals, but remember, that is what the ordinal really means.

All incremental games I have seen so far use a finite number of prestige layers.
I have never seen a game that lets you reach *ω<sup>ω</sup>*, which is the limit of the sequence *1, ω, ω<sup>2</sup>, ω<sup>3</sup>...*.

One issue that arises in determining a game's ordinal is what counts as a prestige.
If a game uses 3 different currencies before the first of what it calls a prestige, has it attained *ω<sup>3</sup>* or only *ω*?
It depends on how those currencies behave.
If gaining the second currency is the eventual goal of collecting the first and gaining the third currency is the eventual goal of collecting the second, then it does attain *ω<sup>3</sup>*.
If the currencies all go up together rather than each building on the previous one, then just one number is sufficient to measure the progress, and it attains only *ω*.
This example with *ω<sup>3</sup>* may sound silly, but what we really wanted to discuss was *ω<sup>ω</sup>*.
There is not fundamentally a difference between a game that uses *ω* different currencies leading up to a single layer of prestige, and a game that uses *ω* layers of prestige leading up to a final ultimate layer of prestige.
For both, the unit of the largest layer of prestige is *ω<sup>ω</sup>*.

You may have noticed there is an unnatural offset in the ordinals I used.
For a game that has one layer of currency then one layer of prestige, this is 2 layers total, so shouldn't it be *ω<sup>2</sup>*, not *ω*?
That is correct.
Ordinals conventionally measure not what a system does obtain, but what the system cannot.
In this case, what *ω<sup>2</sup>* represents is the smallest ordinal that the game will never reach.
The examples before of *ω* layers leading up to a final single layer are measured by *ω<sup>ω + 1</sup>*, which is the smallest ordinal they will never reach.

You may have thought of the case where a system goes exactly up to and including some ordinal *α*, and no further, and that in this case perhaps it is easier to associate the system with *α*.
Actually there is no issue assigning the system a least ordinal that it cannot reach - this ordinal is simply *α + 1*.
The convention that systems are measured by the least ordinal it cannot reach is fully capable of handling these cases,
and if you recall the Von Neumann definition of ordinals, every [downward closed](https://en.wikipedia.org/wiki/Upper_set) set of ordinals is itself an ordinal, so it is quite universal.
If you have the choice to use one or the other, choose to measure a system by the smallest ordinal it cannot reach, for consistency reasons.

</div>

### Higher ordinals and the game
{: #higher-ordinals-game}

{% include collapser.markdown %}

<div>

I wanted to create a game that could reach *ω<sup>ω</sup>* or higher.
Originally, I wanted to shoot as high as possible, and I started setting up a regular hierarchy using Buchholz's *ψ* for the ordinal notation.
However, that conflicts with my more important goal, which is to get people to be aware of the ordinals and appreciate just how large they are.
To make ordinals appear large, you shouldn't let the player climb to large ordinals - quite the opposite, you need to make apparently small ordinals hard to reach.
I don't think the slow-growing hierarchy is sufficient to give players a sense of scale, since numbers don't go up.
The Hardy hierarchy is alright, so I decided to go for some variant of it as the underlying hierarchy.

I made a decision in planning for the game to go up to *ω<sup>ω<sup>ω</sup></sup>*, though the end of content happens already well before that.
The hierarchy was carefully designed so it'd appear to go faster up to *ω<sup>ω</sup>*, but after that, progress would appear to slow down, and further progress would seem difficult.
It's not because of some hardcoded brake in the game.
In fact, undoubtedly, your ordinal is getting larger at an accelerating rate.
It's just that humans reframe the scale to be focused on milestones, and if we just look at the next major ordinals coming after *ω<sup>ω</sup>*, such as *ω<sup>ω + 1</sup>* and *ω<sup>ω2</sup>*, then the game does appear to slow down a lot.

I did also include a "models" game mechanic, which in some sense is a kind of ultimate prestige layer,
however, I don't think that classification is actually accurate, since there are a finite number of models and you will reach significantly higher ordinals than ever before once the last model is attained.
I chose to structure the game this way so players would have enough time to properly enjoy each tier, without making the next tier inaccessible.

I also set aside my desire for great elegance and something that just naturally works.
Instead, I set out to create a fun game experience.
While a lot of content is created programmatically combining a regular structure and random elements, I also have made a significant number of hand tweaks to make it better.

</div>

</div>

## Making the game
{: #making-of-game}

{% include collapser.markdown %}

<div>

### Plant sequences
{: #making-of-plants}

{% include collapser.markdown %}

<div>

TODO talk about egyptian fractions, ODE, and upgrade efficiency

</div>

### Models in the game
{: #making-of-models}

{% include collapser.markdown %}

<div>

TODO talk about the tiers of play and why the models are what they are, possibly with ordinal analysis

</div>

### Challenge system
{: #making-of-challenges}

{% include collapser.markdown %}

<div>

The challenge system was one of the hardest parts of the game to implement.
It was the one thing that kept gameplay interesting while climbing an ordinal ladder.
As you'd notice if you reached that point in the game, every challenge is randomly generated,
and it's diverse enough that you can tell they aren't all premade and handcrafted.

Without going too much into the gritty details, I can at least describe the basic infrastructure.
Every challenge is generated initially as a kind of special low level program, a little higher than assembly.
This program has complexity limits, and is divided into 3 sections - retrieving data, manipulating data, and applying rules.
All data is strongly typed, and there are additional restrictions on what can be done.
Still, there's enough options here to ensure diversity.
If a program fails the checks and we can't trivially fix it, we just generate a new one and try again.
After a program passes type checking, it then gets transpiled into an abstract syntax tree (AST).
Finally, we perform optimizations.
While the optimization engine does occasionally allow stupid things to slip through, it will at least catch a lot of basic things, like changing "not even" into "odd".

There's one more exotic optimization done.
Since challenges are only allowed to affect lower tiers, this means some ordinal predicates will always be true or false.
The game can generally figure out when this happens, but it's not perfect.

Having the challenges' difficulty be programmatically judged as well is unreasonable to ask.
As the best compromise I can offer, all challenges have the same bounty.
Some will just be easier to complete than others.
Some end up being impossibly difficult.
That's just how it is when you aren't handcrafting all the challenges.

</div>

### Fastforwarding and offline progress
{: #making-of-fastforward}

{% include collapser.markdown %}

<div>

TODO talk about fastforwarding, common numerical ODE pitfalls, game memory with optimizing challenges

</div>

</div>

</div>