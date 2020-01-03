---
layout: post
title: "About Komi"
date: 2020-01-03 16:00:00
categories: people komi
---

<div style="float:left;padding:1em;max-width:30%;">
<img src="/assets/komi-icon-2019-bow/icon-halfsize.png" alt="A realistic wide fabric bow knot with a transgender flag pattern, laying on an abstract bipolar coordinate grid floor with smooth metallic grid lines" style="border-radius:50%;box-shadow:0 0 1em grey;"/>
</div>

Hi! I'm Komi. "Programmer, engineer, and artist" is pretty accurate.
If you want something more grounded and specific, I'd say I main Python as a programming language and Blender as an art creation suite,
though that says more about the state of open source tools than my preferences and talents.

If you're looking for me on another site, try looking for username or tag `@komiamiko`. If it has my icon and all, it's probably me. I don't have anyone impersonating me at this time, though if it becomes an issue in the future I'll provide verifiable proof on all my accounts that I actually own them.

I like art and having fun, and I usually don't think much of throwing my full problem solving skillset at a task,
just as a gamer may solve many small problems to progress and never consider it work until it becomes particularly grindy or difficult.
I learn new topics as I need them, even if the use is silly,
and won't back down just because some arbitrary authority said the topic is above my level.
For example, as a host or content designer for roleplaying games,
growth rates are quite important to understand to achieve proper balance as players progress and get more powerful,
and hyperbolic space has been proposed as a way to fit many locations within short distances of each other.
These may look like intimidating topics in mathematics, but if I intend to use it in a roleplaying game, it's all for fun and I have a reason to look into it.
I pick up a lot of topics in this way, making my knowledge base wider and deeper as I go.
It's more or less why I've stayed well above my grade level in school without caring much for studying itself as a purposeful task.

## A powerful Komi

Unless I'm making an app or library meant to be shared and used,
programming is just another part of my toolkit used to get things done.
I use the Python shell as my everyday calculator because it's more powerful than the typical calculator app and can do a lot more than just arithmetic.
While long time mastery of a language can help to write code faster,
the documentation is always available if I need information on a library's API, language features, or even language syntax.
Looking up the documentation only takes a minute.
Those are things I never try to memorize, though if it sticks after enough usage it's a nice bonus.
The more time consuming topics are the large concepts, including algorithms and data structures drawn from larger subjects like graph theory.
Perhaps it does not take long to look up a specific algorithm, but you'd first need to know what algorithm to look up.
When faced with a large and new problem, it's up to you to figure out what concepts you'll need and how to combine them to solve the problem,
and for that it helps to already have a large knowledge base to draw from.
It is the more important kind of knowledge for writing good code.
Fortunately, I do have a large knowledge base there.
I also document and test my code, as well was format it nicely and leave informative comments, so the code is maintainable.
Even if you never expect someone else to see your program, I'd suggest you do the same, so you aren't looking at your own spaghetti code later and wondering what it was for, or breaking your own API that you never properly specified.
That happened to me before.
Never again.

Artists "cheat".
As the classic example I give, why bother with a smoke simulation when you can slap a 2D smoke effect on your scene and nobody will notice?
There's nothing shameful or immoral about it.
"Cheating" may be the short form for it, but it's really about finding faster and easier solutions to problems.
The same creative spirit that helps artists make great pieces also allows engineers to problem solve better,
because for the artist, how to present a scene is a real problem.
I embrace it.
While many novice programmers seek to learn a language by memorizing the syntax and features, I don't mind spending most of my time looking at documentation.
It's just me using the resources available to me, and it allows me to produce a better result.
If I can adapt to my environment and work more efficiently, why should I not?

## My art portfolio

I started Blender in 2014-12[^firsttime].
I've been limited by what my toaster of a computer can handle, but that hasn't stopped me from getting excited about art others have made in Blender and trying to make some art myself.
I first used GIMP in 2015-07[^firsttime], Inkscape in 2019-01[^firsttime], and Audacity in 2015-02[^firsttime].
Blender ends up being the dominant tool for all sorts of creative works from animation to video editing, with GIMP coming in second place as specializing in 2D raster images, being my painting and image editing program.
Inkscape I use when I need to work with SVGs, which sometimes happens. Audacity is what I use for audio.

My first notable artwork is "Komi's Bow", seen in my icon. I conceived it in some form long before, began work in Blender on 2019-12-18, and had it done and rendered out in its current form on 2019-12-26. The regular version at the 2k resolution took a little under 15 minutes to render on my laptop.

[^firsttime]: All of these dates I reference refer to the earliest work of mine that I was able to dig up for the specific tool or language. Perhaps I used it earlier but no files survived. I didn't require it was impressive, I just need to see one file as proof that I did use the program.

### All art posts

{% for post in site.categories.art %}
[{{ post.title }} ({{ post.date | date: "%Y-%m-%d" }})]({{ post.url }})
{% endfor %}

## My programming languages

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
