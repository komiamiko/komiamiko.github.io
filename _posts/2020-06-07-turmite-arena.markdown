---
layout: post
title: "Turmite Arena"
date: 2020-06-07 23:00
categories: math automata
---

{::options parse_block_html="true" /}

# Turmite Arena app
{: #app-section}

{% include collapser.markdown %}

<div id="game-window">

<div class="no-js">
This app requires JavaScript to run.
</div>

## Canvas
{: #turmite-canvas-section}

{% include collapser.markdown %}

<div id="turmite-canvas"></div>

## Messages
{: #turmite-message-section}

<div id="turmite-message"></div>

## Status
{: #turmite-status-section}

<div id="turmite-status">

Not initialized

</div>

## Settings
{: #turmite-settings-section}

{% include collapser.markdown %}

<div id="turmite-settings-form">
<input type="button" value="Pause/resume" onclick="turmites.sendPauseResume()">

<input type="button" value="Apply settings and restart session" onclick="turmites.sendRestart()">

<label for="settings-seed">Random seed</label>
<input type="text" id="settings-seed" name="settings-seed">
<input type="button" value="Generate a new seed" onclick="turmites.generateNewSeed()">

<label for="settings-canvas-w">Canvas width</label>
<input type="number" id="settings-canvas-w" name="settings-canvas-w" min="1" max="10000000">

<label for="settings-canvas-h">Canvas height</label>
<input type="number" id="settings-canvas-h" name="settings-canvas-h" min="1" max="10000000">

<label for="settings-ncolors">Number of colours</label>
<input type="number" id="settings-ncolors" name="settings-ncolors" min="1" max="64">

<label for="settings-nstates">Number of states</label>
<input type="number" id="settings-nstates" name="settings-nstates" min="1" max="10000000">

<label for="settings-nturmites">Number of turmites</label>
<input type="number" id="settings-nturmites" name="settings-nturmites" min="1" max="10000000">

<label for="settings-ffiters">Number of steps per tick</label>
<input type="number" id="settings-ffiters" name="settings-ffiters" min="1" max="10000000">

<label for="settings-tick-delay">Tick delay (ms)</label>
<input type="number" id="settings-tick-delay" name="settings-tick-delay" min="10" max="10000">

Colour palette

<input type="radio" id="settings-color-map-handpicked" name="settings-color-map" value="handpicked">
<label for="settings-color-map-handpicked">Handpicked</label>

<input type="radio" id="settings-color-map-sobol" name="settings-color-map" value="sobol">
<label for="settings-color-map-sobol">Sobol</label>

<input type="radio" id="settings-color-map-random" name="settings-color-map" value="default">
<label for="settings-color-map-random">Random</label>
</div>

</div>

# About Turmite Arena
{: #about-game}

{% include collapser.markdown %}

<div>

## Inspiration
{: #about-inspiration}

{% include collapser.markdown %}

<div>

I always have more potential project ideas bouncing around than I have time for, and putting several turmites in a big arena was not originally one of them.

Originally, my plan was for a machine learning project with an artistic focus as my first machine learning project.
Without going into the details of that, my journey with turmites began as I thought about where to get training data.
I thought there would be a scarcity of art matching my needs, and artists are also slow to produce new art.
I turned to a kind of 2D Turing machine (which I later discovered was called a "turmite") as a way to quickly generate many interesting yet also thematically varied images with minimal human involvement.
It would just need some patient volunteers to categorize these images by theme.
It was alright for my purposes that the art would be rather abstract.
At some point, I had a thought - what if instead of using 1 turmite on a small canvas, I put many of them on a big canvas?

In hindsight, the approach I thought of for the machine learning process was stupid.
If all I wanted was a dataset to start the process with, any art dataset should have been fine.
Also, I would have eventually used a generative adversarial network, if not right from the start, and GANs generally don't need that kind of help.
I suppose I would have discovered as much in the research if I undertook the project seriously, so perhaps my lack of planning is entirely expected.

Anyway, the project I ended up making didn't involve machine learning at all.
In maybe an hour, I got a proof of concept up, and since that was so much fun to watch and it seemed successful, I decided to improve it and publish it.

</div>

## Game mechanics
{: #about-mechanics}

{% include collapser.markdown %}

<div>

I do not know if this app can be called a game, though I can think of no better term for the rules of its world than "game mechanics", so that is what I will use.

Each session uses a fixed number of colours, conveniently numbered from *0* to *C - 1*, which are later mapped to pretty display colours.
The canvas is a finite rectangular grid which starts filled with the colour *0*.
The grid is looping, so topologically it is a torus.

On the canvas live a number of "turmites".
Each turmite occupies a tile on the canvas, holds a state numbered from *0* to *N - 1*, and has a current orientation which is a cardinal direction.
Multiple turmites are able to occupy the same tile at once.

Each turn, every turmite takes a step.
Depending on what colour it is standing on and its current state, and only that information, it chooses (1) a movement action, (2) a colour to vote, and (3) a next state.
This "transition table" is determined once at the start of the session and is different for each turmite.

A movement action can be any combination of (don't turn, turn left, turn to face backwards, or turn right) and (take 1 step forward, do not move, or take 1 step backward).
Traditional turmite movement actions impose a restriction on the parity of the turmite, which in this world would prevent some turmites from getting to interact with other turmites.
These additional movement options allow turmites to change parity, and thus every turmite may have a chance to interact with other turmites.

With only 1 turmite, that turmite would be allowed to simply paint the tile below it a colour according to its transition table.
However, our world has many turmites, and it is possible they will occupy the same tile at once and disagree on what colour it should be.
Instead of allowing 1 turmite to arbitrarily win, we employ a simple voting system - the colour with the most votes wins, but if there's a tie, the colour of the tile doesn't change.

Note that there are no special restrictions on the transition table - an entry that says to not move, vote the same colour as what the tile already is, and not change state is, while unlikely, totally possible and allowed.
One might argue it even serves a very specific but real purpose in this world with many turmites, as it allows a turmite to wait until at least 2 other turmites come to overpower the vote and free the stuck turmite.

That's it for the actual game mechanics.
The rest of the options are to control the app's behaviour.

</div>

## Commentary
{: #about-commentary}

{% include collapser.markdown %}

<div>

Langton's ant, the simplest non-degenerate turmite imaginable, is Turing complete, so it is capable of general computation.
To be specific, you can always encode a problem, including all its input parameters, on an infinite canvas, and let the ant do its thing, and after a sufficient amount of time, you can re-interpret the canvas to extract the answer.

The turmites that appear in Turmite Arena are usually at least as powerful as Langton's ant.
We can expect a huge diversity of complex and emergent behaviours, and I would guess relatively few states and colours are needed for interesting dynamics involving multiple turmites.
You can see in the app, sometimes they build highways, sometimes they build other structures, and sometimes they do other interesting things.
There's no programmed in behaviour or content providers here - all this results from a simple set of rules and a source of randomness.

It's always fun to watch the turmites.

</div>

## Licensing
{: #about-licensing}

{% include collapser.markdown %}

<div>

It's unclear whether a mathematical process with a seed chosen by the user counts as a creative work I co-authored just because I wrote the program and it contains many arbitrary constants.
I don't think it should, but just in case it does:

> "Turmite Arena" refers to the application in [the section titled "Turmite Arena app"](#app-section).
> All outputs of Turmite Arena, including the displayed grid, are dedicated to the public domain under [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/).
> Where the output of Turmite Arena is not separable from the part of the program from which it originates, that part of the program is also released under CC0 1.0.

Meanwhile, the program itself (the parts that are separable from the output anyway) is licensed under an MIT license, the same as the rest of the site.

</div>

</div>

<script src="/assets/js/turmite_arena.js"></script>