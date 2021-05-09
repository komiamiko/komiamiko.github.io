---
layout: post
title: "Boy/girl flag interpolations"
date: 2021-05-10 22:00
categories: art experimental
---

{::options parse_block_html="true" /}

# Flag interpolations app
{: #app-section}

{% include collapser.markdown %}

<input type="range" min="0" max="100" value="0" id="boySlider">Male-ness <span id="boyPercent">please enable JS</span>%<br/>
<input type="range" min="0" max="100" value="0" id="girlSlider">Female-ness <span id="girlPercent"></span>%<br/>
<div>
<div id="stripe-01"/>
<div id="stripe-02"/>
<div id="stripe-03"/>
<div id="stripe-04"/>
<div id="stripe-05"/>
<div id="stripe-06"/>
<div id="stripe-07"/>
<div id="stripe-08"/>
<div id="stripe-09"/>
<div id="stripe-10"/>
<div id="stripe-11"/>
</div>

<div class="no-js">
This app requires JavaScript to run.
</div>

# Story of a 90% girl
{: #story-girl}

{% include collapser.markdown %}

<div>

## A meme origin
{: #meme-origin}

{% include collapser.markdown %}

<div>

I made a meme the other day describing my gender as a 90% girl dilution, representing it with a flag design between the demigirl flag and the solid colour pink.
If you assume the colour pink on its own is a female flag, this is a sensible flag interpolation to represent 90% girl, and I had made that by hand.
I did not know about the paragirl label at the time, but it would have fit.

![A parody of the swing set project meme, showing how various groups would understand or perceive the author's gender. The last 3 are, in order: the demigirl flag, with the caption "You underestimate my gender", a solid pink colour, representing female, with the caption "You overestimate my gender", and a flag design between the demigirl flag and a solid pink colour, with the caption "What I think my gender is".](/assets/misc/gender-design-meme-all.png)

I later had the idea to use the power of programming to automatically create all the other possible flag interpolations.
I quickly narrowed the scope to just 2 axes, male-ness and female-ness, both ranging from 0 to 100%.
If you got this far, I don't think I need to tell you this, but there is a lot more to gender than just male-ness and female-ness, including gender fluidity and nonbinary genders outside of the male-female spectrum.
I didn't expand the scope too much to avoid taking on too much work, and I hope this will make sense as you continue reading.
I considered making it in Python for automation convenience, but ultimately built it in JavaScript as a webapp for greater accessibility.

</div>

## Creating the interpolation
{: #create-interpolation}

{% include collapser.markdown %}

<div>

From the corners and the midpoints, we have 9 points.
4 of these have popular flags already - agender, demiboy, demigirl, and bigender - and I definitely wanted the generated flags to hit those if the exact male-ness and female-ness amounts were correct.
I originally imagined this as the kind of project where I throw stuff at the computer and see what it comes up with, but as I needed to code in the logic to generate the flags, I needed to have some idea of what the flags should look like.
In fact, as the flag generation logic is entirely handwritten and not assisted by machine learning or existing algorithms, I needed to tell the computer exactly what to do, and thus, I needed to know exactly what I wanted the flags to look like.
That's not to say I could not be surprised by the results at all - it is totally possible to write some math and know exactly what it does in math terms but not be able to connect it to the visuals that would ultimately be produced.
I did need to at least have the other 5 key point flags, in any case.
I found a bidemigender flag which seemed to be a combination of demiboy, demigirl, and bigender, and I used that for 50% boy 50% girl.
I used plain blue and plain pink for the boy and girl flags.
I took some creative liberties remixing the bigender flag into a 100% boy 50% girl flag and a 100% girl 50% boy flag.

![A 3x3 grid of flags showing combinations of varying amounts of male-ness and varying amounts of female-ness, including my flag designs for the entries without popular flags.](/assets/misc/flag-interpolations-idea.png)

In the end, after staring at the mockup for a while and thinking about how to do the interpolation, I came up with a scheme involving 11 stripes.
Even though no flag individually uses more than 7 stripes, because I wanted to have some homologous structures like having the agender middle green stripe interpolate into the demiboy blue stripes or demigirl pink stripes, 11 stripes ended up being needed.
I don't think all 11 are visible at once with any settings.
I was originally planning to write out the interpolation rules more explicitly, but with how complicated the interpolations needed to be, I ended up using a 3x3 grid of key points and linear interpolation for most of the stripe size and colour parameters.
Had I taken on another axis, this could very well have turned into a 3x3x3 grid.
Aside from the visibly increased workload, it would be significantly more of a challenge to fill in the missing key point flags, now that 3 axes are involved.
2 axes was something I could do in an evening.

</div>

## Flag taxonomy
{: #flag-taxonomy}

{% include collapser.markdown %}

<div>

One may define a field of flag taxonomy that looks at flag design and relates similar flags.
This is the main creative challenge with flag interpolation, as one needs to understand how 2 flags are similar to determine a sensible way to interpolate between them.
When expanding the scope to include more base flags, one would want to look for rules to guide interpolation.
The thing about the pride flags is that all the main ones are made by hand in a largely creative process, rather than following hard rules.
They are largely dissimilar and don't follow any hard taxonomy.
One goes backwards from the flags to infer what rules would have created them, and the rules become quite complicated, because there is not much regularity in the original flags.
Programmatic flag interpolation demands regularity, even if there is no such regularity in the original flags.
That's the entire purpose of flag interpolation after all, to see what else comes out of the existing rules, a naive combination with no new ideas.
There is a problem shared by computer-generated flag interpolations and handmade ones - they are not designed with meaning in mind.
Even the base flags made by hand, such as the 100% girl 50% boy flag, are, due to the nature of the project, necessarily designed with regularity and rules in mind rather than meaning.
A flag designed independently specifically to represent the 100% girl 50% boy identity would likely be quite different than what I came up with and not follow the inferred rules so far, as pride flags usually go.
Pride flags are irregular, at least to some extent, and I think that's how they should be.
A pride flag ought to have a little soul in it.
At the very least, a person should have thought about the meaning once at some point.
I don't consider this project very serious.
Most settings produce something that looks like a meme flag to me.
If you like the flags, or you want to use them, great!
However, I won't be promoting these interpolated flags, even the key point flags I made by hand, as pride flags.

</div>

</div>

# Fun and silly projects
{: #fun-project}

{% include collapser.markdown %}

<div>

In looking back at my posts here, the fun and silly projects like this are quite possibly my favourites.
I'm most likely to look back at them myself and show them off to others, because they're, well, fun.
I am proud of all my posts though, of all kinds.

Really, the posts I am least proud of are the hydra posts.
I didn't prove the thing I was supposed to prove, which I'm not proud of and looks bad for me.
That's mostly a personal thing for me; I'm well aware those posts are for quite a niche readership in the first place and most readers wouldn't even realize the proof had an issue if I didn't point it out myself.
I was quite happy back then to publish it, but it's felt like more of a thorn now.
I once again considered removing the posts rather than leaving them up archived.
But, greater reasons aside, I can always go back to my basic reason for archival.
It's the same reason I have some old unfinished GitHub projects up.
By leaving these works up, even if they aren't my best, I show a piece of my journey and a piece of me, and perhaps it may be useful to someone.
As for why not go back and edit them, a point specific to blog posts, I would say it's nice to be able to go back to an old website and find it just as you last saw it.
There is value in permanent resources, and that stability is necessary for citations.
It's something to consider whether I expect to be cited or not.

</div>

<script src="/assets/js/flag_interpolation.js"></script>