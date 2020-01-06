---
layout: post
title: "About Komi"
date: 2020-01-03 16:00:00
categories: people komi
---

<div style="float:left;padding:1em;max-width:30%;">
<img src="/assets/komi-icon-2019-bow/icon-halfsize.png" alt="A realistic wide fabric bow knot with a transgender flag pattern, laying on an abstract bipolar coordinate grid floor with smooth metallic grid lines" style="border-radius:50%;box-shadow:0 0 1em grey;"/>
</div>

{::options parse_block_html="true" /}

Hi! I'm Komi. "Programmer, engineer, and artist" is pretty accurate.
If you want something more grounded and specific, I'd say I main Python as a programming language and Blender as an art creation suite,
though that says more about the state of open source tools than my preferences and talents.

I'm `@komiamiko` on social media and other sites.
If it has my icon and all, it's probably me.

Come say hello! I welcome new friends.

## A powerful Komi
{: #powerful-komi}

{% include collapser.markdown %}

<div>

I like art and having fun, and I usually don't think much of throwing my full problem solving skillset at a task,
just as a gamer may solve many small problems to progress and never consider it work until it becomes particularly grindy or difficult.
I learn new topics as I need them, even if the use is silly,
and won't back down just because some arbitrary authority said the topic is above my level.
For example, as a host or content designer for roleplaying games,
growth rates are quite important to understand to achieve proper balance as players progress and get more powerful,
and hyperbolic space has been proposed as a way to fit many locations within short distances of each other.
These may look like intimidating topics in mathematics, but if I intend to use it in a roleplaying game, it's all for fun and I have a reason to look into it.
I pick up a lot of topics in this way, making my knowledge base wider and deeper as I go.

"If it works, it counts."
It's an old mantra of mine.
It doesn't mean everything I produce is barely functional,
because part of "it works" is meeting quality standards and other requirements for the task.
It tells you to be resourceful and not limit your paths to your goal.
As the classic example I give, why bother with a smoke simulation when you can slap a 2D smoke effect in the scene and nobody will notice?
I work efficiently and use the resources available to me, no shame in that.
If I need to know a library's API or need information on a language feature or even forget the syntax for a for loop,
that is something I can look up anytime.
The documentation is always there and it only takes a minute.
If I don't know how to solve a problem because I lack the algorithms for it,
I'm out of luck.
While having long time mastery of a language is a nice bonus to write code faster,
it is the large concepts, including algorithms and data structures drawn from larger subjects like graph theory,
which are important to solving problems and writing good code.
Fortunately, I have a large knowledge base for those concepts.
I also document and test my code, as well was format it nicely and leave informative comments, so the code is maintainable.
Even if you never expect someone else to see your program, I'd suggest you do the same,
so you aren't looking at your own spaghetti code later and wondering what it was for, or breaking your own API that you never properly specified.
That happened to me before with an old project that shall not be named because it was made under a different name.
Later in development I formed a habit of leaving doc comments and writing tests.
I'm very consistent with it now.

</div>

## My art portfolio
{: #artworks-list}

{% include collapser.markdown %}

<div>

I started Blender in 2014-12[^firsttime].
I've been limited by what my toaster of a computer can handle, but that hasn't stopped me from getting excited about art others have made in Blender and trying to make some art myself.
I first used GIMP in 2015-07[^firsttime], Inkscape in 2019-01[^firsttime], and Audacity in 2015-02[^firsttime].
Blender ends up being the dominant tool for all sorts of creative works from animation to video editing,
with GIMP coming in second place as specializing in 2D raster images, being my painting and image editing program.
Inkscape I use when I need to work with SVGs, which is rare.
Audacity is what I use for audio, though I only use it for audio editing, as it's not suitable for making things.
All are open source tools.

My first notable artwork is "Komi's Bow", seen in my icon.
I conceived it in some form long before, began work in Blender on 2019-12-18, and had it done and rendered out in its current form on 2019-12-26.
The regular version at the 2k resolution took a little under 15 minutes to render on my laptop.

[^firsttime]: All of these dates I reference refer to the earliest work of mine that I was able to dig up for the specific tool or language. Perhaps I used it earlier but no files survived. I didn't require it was impressive, I just need to see one file as proof that I did use the program.

### All art posts

{% for post in site.categories.art %}
[{{ post.title }} ({{ post.date | date: "%Y-%m-%d" }})]({{ post.url }})
{% endfor %}

</div>

## My programming languages
{: #programming-languages-list}

{% include collapser.markdown %}

<div>

You can find my recent work on [GitHub](https://github.com/komiamiko).

I've been doing
Java since 2014-06[^firsttime][^javatime],
Python since 2016-08[^firsttime],
JavaScript since 2016-11[^firsttime],
C++ since 2017-03[^firsttime],
Rust since 2019-04[^firsttime],
and C since 2019-09[^firsttime].
Those plus a few lesser used and esoteric languages.
I don't use them all equally, as each has its advantages and situations where it's appropriate to use them.
I'd say I main Python, with Java and C++ as secondaries.

[^javatime]: [Processing](https://processing.org) (ProcessingJava specifically) since 2014, plain Java since 2016. The distinction isn't really that important for determining experience. While Processing does make it easier to write a full program with graphics, a Processing program uses Java syntax and still has access to all of Java, so there's nothing stopping you from using, say, `java.util.ArrayList`. I later did graphics with Java2D, which gave me finer control over what I render and how the user interacts with it, and didn't need Processing by then.

This sums up the main reasons I'd use each, in order that they'd be considered, like a if-elif-else tree.

### JavaScript - web apps

JavaScript is a pretty bad language, but its one merit for me is that it can be used in web pages.
It's the "accessible" language to me.
Not everyone has a particular language runtime or is able to download executables,
but just about everyone has a web browser.
If I want some tool to be as accessible as possible, to be made available to more people and with less barriers, I will choose JS and make a web app.
The JS is just for the dynamic content and client side computation; there'd be HTML and CSS as expected to actually present something to the user.
I tend to keep the interface minimal and easy to use.
It should be accessible by someone on a library computer, and should play nicely with screen readers as well.

This case is actually relatively rare for me, so despite entering my toolkit at a similar time to Python, I'm not nearly as experienced in JS, and it shows in how often I need the docs.

I also use JS for userscripts and Google Sheets scripts, which is a use case that doesn't really need more explaining. It's not that often though, and the programs tend to be simple.

### Java - graphics and custom UIs

Java for me is the awkward inbetween of high level languages, championed by Python, and low level languages, championed by C++.
It touts performance ranging between slightly faster than C and about 2x as slow as C for most tasks and a verbosity level between that of Python and C++.
It sports a garbage collector characteristic of high level languages with object-oriented programming, yet suffers from an inability to define custom primitives like C++'s `struct`s and is forced to create objects for types as simple as a complex number type or else find a hacky solution using arrays to manage your own compact memory.
Despite this role, there is one thing I would always go to Java for, chalking up to my programming experience.
If I want to make a visualizer, a simulator, a complicated user interface, a custom UI component with rendering and user interaction defined by me, or something along those lines, I go to Java.
I'm already familiar with Java2D, and I've used Java's Swing and Apache Pivot before, so of course I'll be most comfortable with a Java project there.

My favourite little Java project is a visualizer for a simple 2D world with a circular portal.
It barely qualifies as raytracing.
It's interesting how the space appears to warp just because of the paths light would take.

![A normal blue checkerboard pattern on the right, and a warped purple checkerboard on the left. The purple area is actually on the other end of a portal, but there is no visual indicator of the portal.](/assets/misc/circle-portal-screenshot-long.png)

### C++ - high performance

If I need the fastest performance possible, I go to C++.
I still get to take advantage of mid level language features like classes, while being able to work at a low level and having the program compile to optimized assembly.
It tends to get forced out simply when there's a lot of heavy lifting to be done,
but also when the computation is very involved and I can get asymptotic or large constant factor by weaving the algorithms together rather than putting a few wires between their APIs.

### Python - everything else

Python is the most terse language in my toolkit that isn't a straight up golfing language.
It's great for scripting, prototyping, and one-off computations.
It's also the language I use when none of the other specific needs demanded another language,
so I end up using it a lot to the point where I converted from a Java main to a Python main.
It isn't entirely doomed for performance, as libraries like numpy have all the heavy lifting in a low level language,
so if most of the work happens in that library, I can get the high level language benefits of Python and still have a quite fast program.

Python does pretty much everything I need.
It's powerful alone and can do even more when equipped with the right libraries.
Web clients and servers, machine learning, dataset analysis, image processing, and more - Python does it all!

### Other languages - never

C is pretty much a weaker version of C++. C++ has access to just about everything C does, and more, so I have no reason to use C.

Rust is a contender for the role of a high performance language, though I often pick C++ instead out of familiarity. I'm not against using Rust if a project demands it though, and I'll certainly take it if C++ isn't available.

</div>
