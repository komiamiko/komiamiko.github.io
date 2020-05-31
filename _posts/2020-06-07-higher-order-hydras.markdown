---
layout: post
title: "Higher order hydras"
date: 2020-06-07 23:00
categories: math ordinals
---

<div class="no-js">
Math on this page may not display correctly without JavaScript.
</div>

{::options parse_block_html="true" /}

# Kirby-Paris and Buchholz hydras
{: #kp-buchholz-hydra}

{% include collapser.markdown %}

<div>

Hydras are a classic iterative game played on trees, known by googologists for the fast-growing functions derived from them and by serious mathematicians for their contributions to ordinal analysis.
Unlike their combinatorial counterparts like TREE and SCG, no search is required to compute these fast-growing function values - just keep applying the transformation rule to the tree until the game says to stop.

Kirby-Paris hydras came first.
For Kirby-Paris hydras, the rules are simple.
Start with your hydra, which is an unordered unlabelled rooted tree.
At each stage, choose a leaf node \\\(C\\\) to chop and a non-negative integer \\\(N\\\).
If \\\(C\\\) is a child of the root, it is removed from the tree and that's it.
Otherwise, let \\\(P\\\) be \\\(C\\\)'s parent, and \\\(G\\\) be \\\(P\\\)'s parent.
Remove \\\(C\\\) from \\\(P\\\), then add \\\(N\\\) copies of the modified \\\(P\\\) as children to \\\(G\\\).
The game ends when the hydra is reduced to a single node.

To obtain a fast-growing function, we can fix \\\(N\\\), say, \\\(N = 1\\\) at the first step, then \\\(N = 2\\\), \\\(N = 3\\\), and so on,
and decide on a simple rule for where to cut, say, always choosing the rightmost leaf.
Then, \\\(Hydra(k)\\\) is the number of steps needed for the game to end starting with a path of length \\\(k\\\), that is, a linear stack of \\\(k + 1\\\) nodes.

Buchholz hydras extend Kirby-Paris hydras with labels, and require a few extra transformation cases.
\\\(0\\\)-labelled nodes behave the same as in the Kirby-Paris hydra game.
Integers greater than \\\(0\\\) turn into their predecessor but make the tree deeper.
\\\(ω\\\), rather than being chopped, turns into the current value of the step counter, more or less.
I won't explain Buchholz hydras in detail here, but you can read more about them yourself.

Googology wiki has fine articles on
[Kirby-Paris hydras](https://googology.wikia.org/wiki/Kirby-Paris_hydra) and
[Buchholz hydras](https://googology.wikia.org/wiki/Buchholz_hydra),
which I suggest you read before coming back here.

In this post, I introduce a higher extension of these hydras, which I believe is interesting in its own right.

</div>

# An idea to nest hydras
{: #nested-hydras}

{% include collapser.markdown %}

<div>

In exploring ways to build faster growing functions than the one based on Buchholz hydras, a natural question to ask is "what if we used higher ordinals as labels?"
and then since hydras are ordinal-like, "what if we used nested hydras as labels?"
We can skip the details of adapting ordinal transformation rules for hydras right now, but in any case, these nested hydras are surely more powerful than plain Buchholz hydras.

I then thought to add a singleton, which I'll call \\\( \lambda \\\), which when encountered, expands into a hydra involving labels which are hydras involving labels which are hydras... \\\(N\\\) layers deep, containing no mention of \\\( \lambda \\\).
This is, in some sense, a fixed point ordinal of hydra nesting, or for accuracy, the first common fixed point of whatever ordinal operation nesting hydras corresponds to.
I cannot think of what ordinal such a system corresponds to, but surely it is stronger than without \\\( \lambda \\\).
Why stop there?
We can rename \\\( \lambda \\\) to \\\( \lambda_0 \\\), then introduce \\\( \lambda_1 \\\), the second common fixed point of hydra nesting, which expands like \\\( \lambda_0 \\\), except the nested hydras contain \\\( \lambda_0 \\\).
Why stop there?
We can make subscripts ordinals, or even hydras.
Then we can add another layer, say, \\\( \xi_0 \\\), the first common fixed point of \\\( \lambda \\\) nesting, which expands into a stack of nested \\\( \lambda \\\) hydras, and so on.

</div>

# Second order hydras
{: #second-order-hydras}

{% include collapser.markdown %}

<div>

Okay, we got the basic idea now.
So we can add up to \\\( \omega \\\) layers on top of the base hydra system.
Instead of using numbers, we can use hydras here too, as the index of the dimension for hyper-nesting.

As less of a mathematical opinion and more of a philosophical one, I believe going to higher orders should never be easy.
Whether it's higher order arithmetic, higher order set theory, higher order Turing machines, or something else, there should not be a straightforward scheme to ascend the ladders of orders.
If it's too easy to go higher, I doubt what you have invented is worth being called higher order, and perhaps you should take the next major milestone and call that the next higher order.
After properly analyzing the hydras I came up with, it was a bit disappointing to see that I had only attained the strength of hydra-indexed hyper-nesting, and not any of the larger schemes I had vaguely named,
which was a bit poetic to me, as even if I wanted to call those further extensions third order and beyond, I hadn't reached them with my best efforts.

There's a bit of a conundrum in how to describe the strength of my hydras.
If each layer of nesting (or even each hyper-nesting dimension) contributed \\\(1\\\) order, then the order would be an obscenely large ordinal.
However, to flatten that entire hierarchy and say my hydras are second order seems to be giving it too much credit,
since my constructions don't actually quantify over the first order kinds of objects, which are unnested hydras.
There isn't really an inbetween that I know of, so I'll have to call my hydras second order for now.
I think it's fine though, since hierarchies can be very deep - first order set theory is stronger than every \\\(\alpha\\\)-order arithmetic,
and within second order arithmetic we have many subsystems of varying strength,
and even between \\\(\Pi_1^1-CA\\\) and \\\(Pi_2^1-CA\\\) there is a wide range of theories of varying strength.
I think it's fine to say my hydras are second order, if only because they're definitely above first order.
Within second order, it may be very low, and yet still have a family of weaker second order hydras below it.
We have a long way to go until we reach third order hydras, whatever that means.
While my hydras can definitely be extended further to obtain stronger second order hydras, I believe they are sufficiently minimal and natural to be worth studying.

</div>

# Amiko hydras
{: #amiko-hydras}

{% include collapser.markdown %}

<div>

## Form of Amiko hydras
{: #amiko-hydras-form}

{% include collapser.markdown %}

<div>

A hydra is an ordered rooted labelled tree.
It would actually be more natural to assign labels to the edges, but just so we can have an easy representation, they are given to the child instead.
The root then, which has no label, is given the singleton label \\\(\star\\\).
In comparison, \\\(\star\\\) is considered less than all actual hydras.

Children must be ordered descending.
This is a strict requirement to ensure normality.
When reducing hydras, this invariant is always maintained.

Hydras are written with a \\\(:\\\) between the label and the children.
For example, \\\((\star:((\star:):)((\star:):))\\\) is a hydra where the root has \\\(2\\\) children, and both those children have label \\\((\star:)\\\) and no further children.

</div>

## Converting Buchholz hydras to Amiko hydras
{: #amiko-hydras-buchholz-conversion}

{% include collapser.markdown %}

<div>

It's useful to be able to show a Buchholz hydra can be converted into an equivalent Amiko hydra, since it shows that Amiko hydras are at least as strong as Buchholz hydras.

The root just becomes a root node.
All its children are then recursively transformed with this procedure:

> Recursively transform all its children.
> Let \\\(\alpha\\\) be the label of the Buchholz hydra node.
> Change its label to \\\((\star:)\\\).
> If \\\(\alpha < \omega\\\), then insert \\\(\alpha\\\) copies of \\\(((\star:((\star:):)):)\\\) just before its leftmost child.
> Otherwise, insert \\\(((\star:((\star:):)):((\star:):))\\\) just before its leftmost child.

As you can see, the hydras converted this way are nowhere near the largest Amiko hydras allow.
All original nodes now have label \\\((\star:)\\\), and the largest node we possibly injected was \\\(((\star:((\star:):)):((\star:):))\\\).

The converted Amiko hydra will not necessarily evolve exactly the same as the Buchholz hydra, but they will correspond to the same ordinal, and if analogous fast growing functions were defined on them, they would have the same growth rate.

</div>

## Comparison of Amiko hydras
{: #amiko-hydras-comparison}

{% include collapser.markdown %}

<div>

Comparison operators may have a filter, which refers to the labels of the immediate children of the nodes being compared, and causes children not matching the filter to be ignored.
The filter does not propagate in recursive comparisons.
For example, writing \\\(A <>_{>C} B\\\) means to compare \\\(A\\\) and \\\(B\\\) as if all their immediate children with labels \\\(\le C\\\) were removed.

To compare hydras \\\(A, B\\\), first compare their labels, then tiebreak by lexicographic order of their children tuples (which are always ordered descending).
\\\(\star\\\) is considered less than all hydras.

This is an extension of the Buchholz hydra comparison rules.
It may seem surprising that the comparison rules are still the same, even though the hydras have been restructured and the evolution rules are different.
I believe these simple rules are correct, but if not, the evolution rules are the reference and should be used to derive the correct comparison rules.

</div>

## Evolution of Amiko hydras
{: #amiko-hydras-evolution}

{% include collapser.markdown %}

<div>

Let \\\(S(A)\\\) be the outer reduction function, which is what we mean by reducing a hydra that includes the root node.
It is defined like so:

> It is guaranteed if we are reducing \\\(A\\\) that it has children.
> Let \\\(B\\\) be the \\\(A\\\)'s rightmost child, and let \\\(C\\\) be \\\(B\\\)'s label.
>
> **1.** If \\\(C = (\star:)\\\):
> Search for the rightmost leaf of \\\(A\\\), but do not enter nodes with labels \\\( > (\star:)\\\).
> Let \\\(D\\\) be this rightmost leaf (whose label is guaranteed to be \\\((\star:)\\\)).
> 
> **1.1.** If \\\(D\\\) has no children:
> Let \\\(E\\\) be the parent of \\\(D\\\).
> Remove \\\(D\\\) from \\\(E\\\).
> If \\\(E\\\) has a parent, append \\\(N\\\) copies of \\\(E\\\) as additional children to the parent of \\\(E\\\), for some \\\(N\\\).
> \\\(S(A)\\\) is the modified \\\(A\\\).
>
> **1.2.** If \\\(D\\\) has any children (which are guaranteed to have label \\\( > (\star:)\\\)):
> Traverse up the parents from \\\(D\\\) searching for a node \\\(E\\\) satisfying \\\(E <_{> (\star:)} D\\\), or if no suitable \\\(E\\\) is found, take \\\(E\\\) as \\\(A\\\) but with all children removed except for the rightmost.
> Let \\\(E'\\\) be \\\(R(D)\\\) with the children of \\\(E\\\) appended as children.
> Let \\\(F = ((\star:):)\\\).
> Do this \\\(N\\\) times, for some \\\(N\\\): "Replace \\\(F\\\) with \\\(E'\\\) where \\\(D\\\) is replaced by \\\(F\\\)."
> Replace \\\(D\\\) with \\\(F\\\).
> \\\(S(A)\\\) is the modified \\\(A\\\).
>
> **2.** If \\\(C > (\star:)\\\):
> Let \\\(D = S(C)\\\).
> Let \\\(E = R(B)\\\).
> Do this \\\(N\\\) times, for some \\\(N\\\): "Replace \\\(E\\\) with \\\(D:E\\\)."
> Replace \\\(B\\\) with \\\(E\\\).
> \\\(S(A)\\\) is the modified \\\(A\\\).

Let \\\(R(A)\\\) be the inner reduction function, which is used when reducing something other than the root hydra.
It is defined like so:

> **1.** If \\\(A\\\) has no children:
> Let \\\(B\\\) be the label of \\\(A\\\).
> It is guaranteed that \\\(B > (\star:)\\\).
> Let \\\(C = S(B)\\\).
> Let \\\(D = (C:)\\\).
> Do this \\\(N\\\) times, for some \\\(N\\\): "Replace \\\(D\\\) with \\\((C:D)\\\)."
> \\\(R(A) = D\\\).
>
> **2.** If \\\(A\\\) has any children:
> Let \\\(B\\\) be \\\(A\\\) but with the label changed to \\\(\star\\\) (which turns it into a root).
> Let \\\(C = S(B)\\\).
> Let \\\(D\\\) be \\\(C\\\) but with the root label changed to the label of \\\(A\\\).
> \\\(R(A) = D\\\).

</div>

## Ordinal notation
{: #amiko-hydras-ordinals}

{% include collapser.markdown %}

<div>

Hydras naturally yield ordinal notations, so long as you abide by the normal form rules.
In fact, if you really wanted to, you could use hydras directly to denote ordinals.
A hydra \\\(A\\\) is less than a hydra \\\(B\\\) if they are not identical and \\\(A\\\) can be reached from \\\(B\\\) by some series of steps.
This ordering is a well-order with order type whatever the hydra system's ordinal is.
Amiko hydras follow this too, and they do correspond to some large ordinals.

However, even if Amiko hydras themselves are already an ordinal notation, this is not quite complete.
If we look at Buchholz hydras, the hydras can be converted into expressions using Buchholz's \\\(\psi\\\), which is an ordinal collapsing function defined just using ordinals.
I have not yet found or created such a system for Amiko hydras, an ordinal notation defined purely using ordinals which is able to exactly mirror the structure of Amiko hydras.
It seems challenging, and perhaps that is an item best left for future research.

</div>

## Flattening of Amiko hydras
{: #amiko-hydras-flattening}

{% include collapser.markdown %}

<div>

For some purposes, it may be useful to flatten the hydra.
If hydra labels are "internal" and children are "external", in the process of deriving Amiko hydras from the nested hydra system, we externalized that nesting already.
We can also externalize the hydra labels in Amiko hydras by moving the hydra from the label into a fake first child, except for the root (and sub-roots) which will have no label.
Rules would need to be slightly reworded so rules about labels instead refer to the first child and rules about children ignore the first child, but the hydras would be functionally the same, just now in tree form without further nesting.
If you wanted to flatten it further, you could use any of a number of methods which represents a tree uniquely using a list.

</div>

## Visualization of Amiko hydras
{: #amiko-hydras-visualization}

{% include collapser.markdown %}

<div>

Actually drawing hydras inside of nodes is not very practical, so instead I draw unlabelled nodes but use a sideways edge (as opposed to vertical, which is for children) to denote the label hydra.
This means all initial hydras from my \\\(AH\\\) function (next section) look like staircases or zigzags.
I'm not saying this is the only option, but it's how I dealt with it.

</div>

## Fast-growing function and named number
{: #amiko-hydras-fast-growing}

{% include collapser.markdown %}

<div>

For completeness, and for fun, I should define a fast-growing function based on Amiko hydras.
So, let's define \\\(AH(k)\\\).

Begin with the smallest possible hydra, which is \\\((\star:)\\\).
Repeat \\\(k\\\) times: \\\(A \mapsto (\star:(A:))\\\).
This is now the starting hydra.

Begin with a global shared counter \\\(N = 1\\\), which will increment after every time it is called for (including additional mentions when reducing nested hydras), not on each outer evaluation of \\\(S\\\).
Reduce the hydra using \\\(S\\\) until it is \\\((\star:)\\\).
The final value of \\\(N\\\) is \\\(AH(k)\\\).

As examples, here are the first few values of \\\(AH\\\):

* \\\(AH(0) = 1\\\)
* \\\(AH(1) = 1\\\)
* \\\(f_{\omega^{\omega^\omega}}(4) < AH(2) < f_{\omega^{\omega^\omega}}(5)\\\)

</div>

## A program implementing Amiko hydras
{: #amiko-hydras-program}

{% include collapser.markdown %}

<div>

To save myself the trouble of needing to do larger hydras by hand, and to allow you to play with Amiko hydras, I wrote a program which includes all the related functionality: [amiko_hydra.py](/assets/hydras/amiko_hydra.py).
It's not as clean as my usual code, but please forgive me, I was very excited to share this with the world so I took some shortcuts.

</div>

## Discussion of stronger hydras
{: #discussion-stronger-hydras}

{% include collapser.markdown %}

<div>

Second order hydras aren't very well mapped out, but I do have a guess as to what kind of hydra systems are worth studying, and what makes this hydra system second order.

There are 2 basic transformation types: "close" and "externalize".
Externalize means to take a hydra system where the labels are allowed to be arbitrary hydras (which are also in that hydra system) and re-encode the hydra such that labels are upper-bounded.
Externalize does not change the strength of the system, but now permits us to perform the close operation.
I call it externalize because it takes the label (internal) and shifts that data toward the children (external).
Close means to take a hydra system where the labels are meaningfully upper-bounded, and allow arbitrary hydras as labels.
I call it close because it results in the closure under using hydras as labels.
These form a natural pair, and repeating them both (though I know of no automated way to do so) would yield progressively stronger systems of hydras.
It is possible to get from Buchholz hydras to Amiko hydras using just close then externalize then close, though some other possible sequences may take more steps or even never be able to reach Amiko hydras.

You're probably excited to add a limit meta-transformation and assign ordinals, but that would collude the important information here.
Externalize operations vary in strength, and there are different transformations (and meta-transformations, meta-meta-transformations, and so on) which you can do closures with.

I believe second order hydras should include all hydra systems reachable with these kinds of transformations, and perhaps some more.
Ultimately, the order is about what we quantify over.
In this second order analysis, our transforms work with hydra systems, which were the first order object.
Every hydra system ultimately looks flat and first order, but to derive and analyze Amiko hydras and beyond requires second order techniques.
A third order hydra system would need to be at least as strong as all second order hydra systems, and its analysis would demand quantifying over all transforms of second order strength.
Reaching third order hydras seems very difficult.

There may be a correspondence between the ladders of \\\(\alpha\\\)-order arithmetic and \\\(\beta\\\)-order hydras, but that's way beyond me.

</div>

## My contributions to the field
{: #contributions-to-field}

{% include collapser.markdown %}

<div>

Hydras have been used so far as independence results for a certain theory, where the corresponding hydra theorem itself and its unprovability in that theory can be proved in a slightly stronger theory.
Incidentally, these hydras also defined ordinal notations up to some \\\(\alpha\\\) which is also the proof-theoretic ordinal of that weaker theory, and the fast-growing functions derived from those hydras grow similarly fast to \\\(f_\alpha\\\) in the fast-growing hierarchy.
For Kirby-Paris hydras, this was Peano Arithmetic and \\\(\varepsilon_0\\\).
For Buchholz hydras, this was \\\(\Pi_1^1-CA+BI\\\) and the Takeuti-Feferman-Buchholz ordinal.
These ordinal notations can also be turned into actual predicative ordinal functions with normal forms -
the Cantor normal form for Kirby-Paris hydras and the Buchholz's \\\(\psi\\\) normal form for Buchholz hydras.

Hydras are useful to mathematicians.
Now, I don't have any of these other parts yet.
For now, all I have is the hydras.
I can perhaps answer at a later date how strong of a theory is needed to prove the termination of Amiko hydras, build a proper ordinal notation out of these hydras, and give a name to the ordinal for these hydras.
Right now I'm just getting the idea out there and my name on it.
I hope someday I will have the chance to study them more in depth, answer these questions, and perhaps get a paper published.

I'm open to feedback and additions, including corrections.
It would be great if I nailed everything the first time, but it's quite likely I didn't.

</div>

</div>

# Sample Amiko hydra evolutions
{: #sample-hydras}

{% include collapser.markdown %}

<div>

For \\\(AH(0)\\\), the starting hydra is just \\\((\star:)\\\), and there are no steps left to take, so \\\(N\\\) stays at \\\(1\\\) and thus \\\(AH(0) = 1\\\).

For \\\(AH(1)\\\), the starting hydra is just \\\((\star:((\star:):))\\\).
Rule **1.1** applies, the single child node is chopped, and there is no regrowth.
Thus, \\\(AH(1) = 1\\\).

For \\\(AH(2)\\\), the starting hydra is \\\((\star:((\star:((\star:):)):))\\\).
This one actually gets large.

On our first outer evaluation of \\\(S\\\), we invoke rule **2**.
The value of \\\(C\\\) is \\\((\star:((\star:):))\\\), so \\\(D = S(C) = (\star:)\\\).
The value of \\\(B\\\) is \\\(((\star:((\star:):)):)\\\), which then goes through \\\(R\\\).

When we evaluate \\\(R\\\), rule **1** applies.
\\\(B\\\) here is taken as \\\((\star:((\star:):))\\\), so \\\(C = S(B) = (\star:)\\\).
\\\(D\\\) is created as \\\(((\star:):)\\\).
Now it calls for \\\(N\\\), so we will use \\\(N = 1\\\), and increment \\\(N\\\) afterward.
We replace \\\(D = ((\star:):)\\\) with \\\(D = (C:D) = ((\star:):((\star:):))\\\).
The returned value from \\\(R\\\) is \\\(((\star:):((\star:):))\\\).

Back to the outer scope, \\\(E = ((\star:):((\star:):))\\\).
Now it calls for \\\(N\\\) again, so we will use \\\(N = 2\\\), and increment \\\(N\\\) afterward.
At the end of this loop, \\\(E = ((\star:):((\star:):((\star:):((\star:):))))\\\).
We then replace \\\(B\\\) (which is the only child of the hydra root) with \\\(E\\\).
Finally we finish our first outer step, the new hydra is \\\((\star:((\star:):((\star:):((\star:):((\star:):)))))\\\), and currently \\\(N=3\\\).

Now, I know that looks confusing.
But that's just a root node, and then a linear chain of \\\(4\\\) nodes that each have label \\\((\star:)\\\).
Future steps will just be a lot of iterations of rule **1.1**, which you should recognize as the Kirby-Paris regrowth rule.
At this point, it's just a Kirby-Paris hydra which is a linear chain of \\\(5\\\) nodes: \\\(((((()))))\\\).

If we follow it for another step, it becomes \\\((((()()()())))\\\), with \\\(N = 4\\\).
So quickly we can say that \\\(H_{\omega^{\omega^{\omega^\omega}}}(4) < AH(2) < H_{\omega^{\omega^{\omega^\omega}}}(5)\\\).
Converting these bounds to use FGH instead, we get \\\(f_{\omega^{\omega^\omega}}(4) < AH(2) < f_{\omega^{\omega^\omega}}(5)\\\).
These bounds are sufficiently tight, I believe, for all practical purposes.

\\\(AH(3)\\\) expands quite large on the first step, so I won't show the expansion here.

</div>