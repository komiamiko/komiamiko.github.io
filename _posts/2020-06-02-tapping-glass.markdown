---
layout: post
title: "Lightly tapping a glass with a metal rod"
date: 2020-06-02 23:00
categories: art speed
---

{::options parse_block_html="true" /}

![A glass cup on a metal table in a machine shop, with a metal rod slightly above the cup. The glass cup has been broken into several fragments, and it is just starting to fall apart.](/assets/tapping-glass/render-small.png)

<span style="font-size:80%;">"Lightly tapping a glass with a metal rod" © 2020 Untether AI, published under [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) | [full size](/assets/tapping-glass/render-4k.png) | [project files](/assets/tapping-glass/tapping-glass-project.zip)</span>

# A speed art challenge
{: #speed-art-origin}

{% include collapser.markdown %}

<div>

This is my first time writing anything related to work.
Most happenings aren't interesting enough to write about publicly, and I've signed an NDA anyway.
I have asked for this one though.
Since it was made at work, I did automatically surrender ownership of the art to my employer, but since the art itself isn't work-related, the NDA doesn't cover it.
They said I can use it how I want, so I'm able to license it to myself and subsequently publish under [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/).

I currently work at [Untether AI](https://untether.ai), as my co-op placement.
The folks are nice, I enjoy the work, and we're making cool things.
We hold a recurring event that gives us a chance to share non-work topics in an organized way.
By some chance, a slot on 2020-05-28 was open (which I found out earlier, of course), and I decided to present about [Blender](https://blender.org).
I had 1 hour to deliver a presentation and also get a scene created from scratch and rendered out.

To be clear, I volunteered to take this slot, and there was no requirement to do any of this.

I only allowed myself as preparation to have already selected and downloaded an HDRI environment texture,
and to have my default blank Blender file created so I wouldn't need to navigate my filesystem with screen sharing on.
The rest was made as part of the live demo.

By the way, that HDRI environment texture is ["Machine Shop 02", by Sergej Majboroda](https://hdrihaven.com/hdri/?c=indoor&h=machine_shop_02), published under a [CC0](https://creativecommons.org/publicdomain/zero/1.0/) license.

I would estimate the presentation took 20 minutes over the 2 parts, leaving only 40 minutes for the speed art.
At some points, I was worried I wouldn't finish on time.
I managed to get the render done at a lower resolution before the 1 hour was up.
I re-rendered it out in 4K later.
I'm quite satisfied with the result.
Some others have told me it is photoreal, which makes me very happy.

</div>

# Planning for speed
{: #planning-for-speed}

{% include collapser.markdown %}

<div>

I came up with the idea for the scene well in advance, and I planned out what I would make so that the result would be good.
The quick sketch is even in the slides I made.

The requirements for the scene can be broken down into 3 goals:

1. It must not take very long to make. I can't exceed the time limit and I wanted the render to be done in time. This is the strictest requirement.
2. It should pass. Perhaps not photoreal, but it should look very good.
3. It should be interesting. There should be something going on in the scene, and you actually want to look at it. Being interesting is a desireable property, perhaps even required, for art.

I did some brainstorming, excluded the ideas that were unlikely to work out, refined the ideas and explored more, and repeated this until I settled on a viable idea.

Every material can benefit from textures, but some materials can look passable without textures, including smooth metal and clean glass, which I ended up using.
There are plenty of other materials that fit the bill too, including water, fog, mirrors, jelly, and some smooth plastics, so it's not like I used the only options available.
In fact, in the iteration before what I finally stuck with, I intended to have a jelly-looking tentacle whack the glass cup and break it,
but then I realized the tentacle would need to be attached to something, and that image was unappealing to me.
I'm glad I chose to use a metal rod instead, since the issue of where to put the tentacle isn't the only issue I would have with it -
it's also a more complicated shape, would need rigging, and demand soft body physics to make the scene pass.

Physics simulations tend to be slow, and they would generally be unviable for speed art.
However, they're also free animation that you don't need to make by hand.
Breaking glass is a classic interesting visual, and it would mean I only need the small amount of animation to set up the breaking glass, and the rest comes for free.
I would have to watch out for not making too many glass pieces, since they're hard on the render engine and may also be slow to do a rigid body simulation on.

At this point, the scene demands 2 objects - a glass object to be broken and a ground for it to fall on.
Naturally, this ground must be made of metal, due to the material requirements.
I didn't want to deal with throwing the glass object at the ground, and I thought just dropping it on the ground wouldn't be very interesting, so I introduced a 3rd object - the thing that hits the glass and causes it to break.

I had to also think about scene composition.
What story am I trying to tell?
In the end, the art is standalone and detached from my intentions.
I understand that any story I make in planning will be discarded and replaced by whatever story the art tells.
The purpose of figuring out the story is to ensure the scene is consistent and the parts feel right together.
The object that whacks the glass didn't need to be a metal rod, and I considered other metal objects, such as a spoon.
A metal rod does have the advantage of being long enough that the person holding it can be plausibly out of frame, and it's also more rigid than some other candidate objects.
This metal rod in particular gave the impression of some scientific experiment, yet nothing else about the setup seems professional.
So, we have some kind of unprofessional scientist here, who has access to equipment, and isn't doing a formal experiment.
It sounds like the kind of "experiment" someone would do in their shed.
However, a shed would be too small and make the background meant to be too up close, yet it would be infinitely far away since it'd be an environment texture, and that would ruin the realism.
For that reason I chose the machine shop HDRI environment texture to go with this scene.

I knew I would not have time to set up a proper background, so I needed to cheat a bit to make it pass.
Depth of field is my best friend here - make the camera focused on the interesting stuff in the foreground, so nobody notices what's going on in the background.
I originally intended to make the depth of field so strong even the far edge of the table below (which is just a cylinder) would blur,
but I had to tone it down since at that level even the glass started becoming blurry.
It did make the environment texture blurred though and hide the fact that it was the lowest resolution version of that image,
which I expected but wasn't sure would happen, so that was a nice side effect.

Come time for the live demo, my planning paid off.
I didn't nail the cell fracture, and I learned some things about the add-on on the spot.
I also had to look up something on the fly - how to copy modifiers between objects.
It worked out well in the end though.

In post, I gave the artwork the ironic name "Lightly tapping a glass with a metal rod".

</div>

# Publication and licensing
{: #licensing}

{% include collapser.markdown %}

<div>

It's my art, but my employer owns the intellectual property rights since I made it at work.
With permission, I licensed it to myself under [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/), which is what I would have published this art under anyway if I owned it.
When reusing or building upon this artwork, remember that I am the actual creator but Untether AI owns the copyright.

CC-BY 4.0 requires me to declare if this is a derivative work.
The art published here on my site is the exact same as what I presented to Untether AI, so no, it is not a derivative work.

</div>