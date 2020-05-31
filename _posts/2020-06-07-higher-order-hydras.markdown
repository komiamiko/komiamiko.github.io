---
layout: post
title: "Amiko hydras"
date: 2020-05-07 23:00
categories: math ordinals
---

^ change to 06-07

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

# Visualizing nested hydras
{: #visualizing-nested-hydras}

<div>

Before we proceed to make stronger hydras, I should show a method to draw nested hydras.
It would be inconvenient to try and embed a diagram of a hydra within a single node, and possibly even do that recursively.
Instead, I propose drawing the label to the left of the node, connected using a sideways edge.

![Two diagrams of the same Buchholz hydra, side by side. One of them draws the labels on the node, while the other draws the label to the left of the node with an edge between them.](/assets/hydras/left-labels.png)

This looks unnecessary and silly when the labels are small ordinals like this, but when we use hydras as labels, this becomes much more practical.

</div>

# Externalize and close
{: #externalize-close}

{% include collapser.markdown %}

<div>

"Externalize" and "close" are some important basic transformation types in our toolkit of higher order transformations on hydra constructions.
"Externalize" means to shift information from the labels (internal) toward the children (external), with the end goal of putting an upper bound on the labels without changing the strength of the construction.
"Close" means to take a construction where labels are upper-bounded, and extend it to support arbitrary hydras as labels, thus taking the closure of the construction under using hydras as labels, and making the construction stronger.
These form a natural pair.
I call these transformation types because there is not just one way to externalize or close, and different possible transformations may differ in strength.

Amiko hydras can be derived from Buchholz hydras with a close step, a somewhat strong externalize step, then a close step.
The interesting step here is the externalize.
I'll walk you through converting the example hydra from above, and then discuss the strength of the system.

![Diagram of a Buchholz hydra with the labels drawn to the left instead of on the nodes.](/assets/hydras/externalize-0.png)

We're first going to mark all existing edges with label \\\(0\\\).

![Diagram of a Buchholz hydra with the labels drawn to the left instead of on the nodes, and edges labelled with 0.](/assets/hydras/externalize-1.png)

We're then going to move the current label into a child node, with edge labelled \\\(1\\\).

![Diagram of a Buchholz hydra with the former labels drawn as children with edge label 1, and original edges labelled with 0.](/assets/hydras/externalize-2.png)

All original labels have now been evicted.
We transfer these edge labels into the now unlabelled children.
The root could be considered to have a special fake label, or no label.

![Diagram of a Buchholz hydra with the former labels drawn as children with label 1, and original nodes labelled 0.](/assets/hydras/externalize-3.png)

We then expand these former labels into the appropriate hydras, except that the immediate children of that root has label \\\(1\\\), and then fuse those with their parents.
Recall that the lone root hydra is ordinal \\\(0\\\), a hydra with \\\(n\\\) children is the ordinal \\\(n\\\), and the hydra \\\(((()))\\\) is the ordinal \\\(\omega\\\).
You'll notice in this step since \\\(0\\\) turned into \\\(()\\\) and got fused with its parent, that branch just disappears, and since \\\(2\\\) turned into \\\((()())\\\) and got fused with its parent, it gained another child with label \\\(1\\\).

![A transformed hydra with only 0 and 1 labels and some new branches.](/assets/hydras/externalize-4.png)

We're almost there!
We just need to get rid of the remaining ordinal labels by recursively converting them into hydras.

![A transformed hydra with no ordinals, just more hydras. Roots are specially marked with a star symbol.](/assets/hydras/externalize-5.png)

There we have it, our first Amiko hydra!
Whatever rules we use to define its evolution, it should evolve pretty much the same as Buchholz hydras, for hydras that were converted from Buchholz hydras.

Amiko hydras with only \\\(0 = (\star:)\\\) and \\\(1 = (\star:((\star:):))\\\) labels correspond to nested Buchholz hydras.
Amiko hydras with labels below \\\(\omega = (\star:((\star:):((\star:):)))\\\) correspond to hyper-nested Buchholz hydras with a finite number of hyper-nesting dimensions,
which we may collectively call \\\(\textrm{hyper}^\omega\\\)-nested Buchholz hydras.
The full construction of Amiko hydras, obtained by applying a close transform after this externalize, is far more powerful,
and its corresponding ordinal is the first common fixed point of "\\\(\alpha\\\) maps to the ordinal of \\\(\textrm{hyper}^\alpha\\\)-nested Buchholz hydras."

</div>

# Form of Amiko hydras
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

Direct children of the root and children of children of the root (but not any further children) are required to have label \\\((\star:)\\\).
This is the analogous rule to Buchholz hydras requiring direct children of the root to have label \\\(0\\\).

</div>

# Converting Buchholz hydras to Amiko hydras
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

# Comparison of Amiko hydras
{: #amiko-hydras-comparison}

{% include collapser.markdown %}

<div>

Comparison operators may have a filter, which refers to the labels of the immediate children of the nodes being compared, and causes children not matching the filter to be ignored.
The filter does not propagate in recursive comparisons.
For example, writing \\\(A <>_{>C} B\\\) means to compare \\\(A\\\) and \\\(B\\\) as if all their immediate children with labels \\\(\le C\\\) were removed.

I'm not actually sure about the comparison rules for Amiko hydras, which would decide if a hydra's associated fast-growing function would dominate another hydra's.
My gut feeling is that it should be the same as Buchholz hydras (and thus nested Buchholz hydras), but there's something very wrong with that.
The comparison defines the ordering, which determines the order type, and thus the ordinal that describes the strength of the system.
If the comparison rules were exactly the same as nested Buchholz hydras, it would imply the order type is the same, and that they are the same strength, but clearly Amiko hydras are much stronger.

I haven't figured out the comparison rules yet, but assuming all hydras terminate, it would be possible to derive the comparison rules from that.
As a possible starting point, weaker hydras like Buchholz hydras will have their ordering preserved when converted to Amiko hydras, also implying that these converted hydras correspond to the same ordinals.

</div>

# Evolution of Amiko hydras
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
> Do this \\\(N\\\) times, for some \\\(N\\\): "Replace \\\(E\\\) with \\\((D:E)\\\)."
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

The rules are sensitive to the order of recursive evaluations if the value of \\\(N\\\) depends on which comes first, as it does in the derived fast-growing function.
In the future I may need to re-order the instructions to better reflect the underlying ordinal notation, though for now this is okay.

</div>

# Ordinal notation
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

# Flattening of Amiko hydras
{: #amiko-hydras-flattening}

{% include collapser.markdown %}

<div>

For some purposes, it may be useful to flatten the hydra.
If hydra labels are "internal" and children are "external", in the process of deriving Amiko hydras from the nested hydra system, we externalized that nesting already.
We can also externalize the hydra labels in Amiko hydras by moving the hydra from the label into a fake first child, except for the root (and sub-roots) which will have no label.
Rules would need to be slightly reworded so rules about labels instead refer to the first child and rules about children ignore the first child, but the hydras would be functionally the same, just now in tree form without further nesting.
If you wanted to flatten it further, you could use any of a number of methods which represents a tree uniquely using a list.

</div>

# Fast-growing function and reference number
{: #amiko-hydras-fast-growing}

{% include collapser.markdown %}

<div>

## Summary of the fast-growing function and reference number
{: #amiko-hydras-fast-growing}

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

\\\(AH(3)\\\) is the first truly huge value, and it blows Buchholz hydras out of the water.
I don't feel a necessity to give this number a fancy name, so I'll submit \\\(AH(3)\\\) as-is to the ever-growing list of large numbers people have come up with.
I also don't see a reason to submit any more specific values, since any other named numbers will likely be far smaller than \\\(AH(3)\\\) anyway or so large as to be practically out of reach for \\\(AH\\\) -
that if we replace \\\(f_0\\\) in the fast-growing hierarchy with \\\(AH\\\), \\\(f_\alpha(N)\\\) for reasonable ordinal \\\(\alpha\\\) and small integer \\\(N\\\) will still not get even close to that other number.
\\\(AH(3)\\\) is the natural representative I think for \\\(AH\\\).

</div>

## Walked expansions of sample hydras
{: #amiko-hydras-samples}

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

\\\(AH(3)\\\) starts with the hydra \\\((\star:((\star:((\star:((\star:):)):)):))\\\), and expands quite large on the first outer step.
I didn't want to do it by hand, but according to the program, after the first step, \\\(N = 7\\\) and the hydra is `(*:((*:((*:):((*:):((*:):((*:):))))):((*:((*:):((*:):((*:):((*:):))))):((*:((*:):((*:):((*:):((*:):))))):((*:((*:):((*:):((*:):((*:):))))):((*:((*:):((*:):((*:):((*:):))))):((*:((*:):((*:):((*:):((*:):))))):((*:((*:):((*:):((*:):((*:):((*:):((*:):((*:):((*:):))))))))):((*:((*:):((*:):((*:):((*:):((*:):((*:):((*:):((*:):))))))))):((*:((*:):((*:):((*:):((*:):((*:):((*:):((*:):((*:):))))))))):((*:((*:):((*:):((*:):((*:):((*:):((*:):((*:):((*:):))))))))):((*:((*:):((*:):((*:):((*:):((*:):((*:):((*:):((*:):))))))))):((*:((*:):((*:):((*:):((*:):((*:):((*:):((*:):((*:):))))))))):)))))))))))))`.
However, this exact expansion is almost certainly wrong since I don't actually know the comparison rules for Amiko hydras yet and I'm using Buchholz hydra comparison rules as a placeholder in the program.
In any case, even the *label* is very large, so it has a long way to go before it becomes remotely comparable to hyper-nested Buchholz hydras.

</div>

</div>

# A program implementing Amiko hydras
{: #amiko-hydras-program}

{% include collapser.markdown %}

<div>

To save myself the trouble of needing to do larger hydras by hand, and to allow you to play with Amiko hydras, I wrote a program which includes all the related functionality: [amiko_hydra.py](/assets/hydras/amiko_hydra.py).
Please keep in mind I do not yet know the comparison rules for Amiko hydras, so I used the Buchholz hydras comparison rules as a placeholder.
It's not as clean as my usual code, but please forgive me, I was very excited to share this with the world so I took some shortcuts.

</div>

# Higher order hydras
{: #higher-order-hydras}

{% include collapser.markdown %}

<div>

This whole time I've been avoiding mention of "higher order hydras".
A higher order theory should quantify over and work with the objects of the lower order theory, for example, first order arithmetic quantifies over integers, and second order arithmetic can now quantify over sets of integers (and thus relations on integers and real numbers).
While it may be true that we used a higher order technique to get to this hydra construction, the hydras themselves are first order trees and the evolution rules are all first order computable,
which I understand are very different things, but the point is I can't find anything second order about the hydras themselves which would allow me to refer to them as second order.

For the time being, Amiko hydras are just a hydra construction that is stronger than Buchholz hydras and introduces new techniques.

</div>

# Stronger hydra constructions beyond Amiko hydras
{: #beyond-amiko-hydras}

{% include collapser.markdown %}

<div>

Amiko hydras are by no means the end.
I've already introduced externalize and close, so I acknowledge that you can boost further with more iterations of externalize and close.
The reason I don't bother just presenting those instead is because Amiko hydras are in some sense the minimal example for this technique,
and stacking on more externalize and close iterations does not necessarily make it more interesting.
It would make it more confusing though.

I believe the next stronger hydra worthy of study must introduce something new.
Buchholz introduced labels.
I introduced externalize and close as higher order transformations.
What comes next may be a higher order closure over the hydra constructions reachable by externalize and close, or perhaps something more novel and creative that I have not even conceived.

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