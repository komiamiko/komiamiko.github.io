---
layout: post
title: "Proof of termination for Amiko hydras"
date: 2020-06-01 22:30
categories: math ordinals
---

{::options parse_block_html="true" /}

# Introduction
{: #introduction}

{% include collapser.markdown %}

<div>

The [Amiko hydras](math/ordinals/2020/06/07/higher-order-hydras.html) post
has been the most contentious post I've published since I started making content actively.
Unlike my other posts, which were quite safe for me as a content creator,
this one felt immature, half-hearted, disrespectful even,
like a tourist who stopped by a temple to take photos without ever learning about the religion.
I thought I would be mocked for naming a salad number,
and that this would be a permanent stain on my career.
It was a ghost, haunting me, always there, and it would only go away after a proper resolution to give it closure.

If I think about it more, I can tell that's rubbish, just intrusive thoughts.
There's also impostor syndrome in there, with all the parts that undervalue the work I did.
I do not claim now, and did not claim then, that I have contributed as much as the leading mathematicians in ordinal analysis,
but I did at least introduce (or at least explicitly describe) a new technique and a new system, so \\\(AH(4)\\\) is definitely not a salad number.
Even if I never resolved this issue, it would still be alright.
Not every post needs to be perfect.
People are forgiving, and in time, it just becomes one thing I said in the past, not representing the best of present me.
In academia especially, we are forgiving - so long as a contributor can honestly own up to their mistakes, they are forgiven and there is no damage to their record.
It's not a ghost that can haunt me forever.

I also have other good news.
I finally have a proof of termination for Amiko hydras, which I hope is correct.
Most of the work on my part needed to get here wasn't actually proof writing, but study within the topic.
I was already comfortable using the Cantor normal form up to \\\(\varepsilon_0\\\),
the Veblen normal form up to \\\(\Gamma_0\\\),
and the (extended) Buchholz normal form up to \\\(\psi_0(\Lambda)\\\).
As I see it, there is no point in using the notations between the 2-argument Veblen function and the extended Buchholz function,
including the finitary and transfinite versions of the Veblen function and some other ordinal collapsing functions,
as the extended Buchholz function is simpler than all of those, so you might as well jump up to there.

![A scatter plot with connecting lines, with strength of a system on the horizontal axis and complexity of a system on the vertical axis. Each highlighted point is the next stronger system which is minimally more complex. They are, in order, the integers, Cantor normal form, 2-argument Veblen normal form, Buchholz normal form, and Taranovsky's C in the Degrees of Recursive Inaccessibility variant.](/assets/hydras/ordinal-systems.png)

My next major leap was to [Taranovsky's C](https://web.archive.org/web/20200628053709/http://web.mit.edu/dmytro/www/other/OrdinalNotation.htm),
specifically the "Degrees of Recursive Inaccessibility" system, which is the weakest one on that page.
It took a lot of reading up on background concepts and examining that system until I was comfortable working in it,
and it really does not help that that page contains very few examples.
Once that was done, I was ready to attempt a proof of termination for Amiko hydras, and that proof itself was actually relatively easy.

</div>

# Structure of the proof
{: #proof-structure}

{% include collapser.markdown %}

<div>

Let \\\(\mathbb{H}\\\) be the set of all hydras.
Let \\\(0_H = (\star:)\\\).
Let \\\(\chi = ?\\\) be the set of ordinals used.

**1. Definition of termination.**
\\\(\forall A \in \mathbb{H}, \pi(A) = (A = 0_H \lor \pi(S(A)))\\\)
Note that \\\(S\\\) is nondeterministic due to the free variable \\\(N\\\), so there is an implied \\\(\forall N \in \mathbb{N}\\\).

*In words, \\\(\pi\\\) is the predicate "this hydra terminates".
The hydra \\\(0_H\\\) is already considered terminated, and any other hydra terminates if after a step it becomes a hydra which terminates.*

**2. Correspondence from hydras to ordinals.**
We define a function \\\(M: \mathbb{H} \to \chi\\\) with \\\(M(0_H) = 0\\\).
Let \\\(\tau(\alpha) = (\forall A \in \mathbb{H}, M(A) = \alpha \implies \pi(A))\\\)

*In words, \\\(\tau\\\) is the predicate "for all hydras which correspond to this ordinal, that hydra terminates".
There may be no such hydras, in which case it is vacuously true.*

**3. Hydra step always decreases the ordinal.**
\\\(\forall A \in (\mathbb{H} - \\\{0_H\\\}), M(S(A)) \in M(A)\\\)
Note that \\\(S\\\) is nondeterministic due to the free variable \\\(N\\\), so there is an implied \\\(\forall N \in \mathbb{N}\\\).

**4. Transfinite induction.**
\\\(\tau(0) \land (\forall \alpha \in \chi, (\forall \beta \in \alpha, \tau(\beta)) \implies \tau(\alpha)) \implies (\forall \alpha \in \chi, \tau(\alpha))\\\)

*In words, if it holds for \\\(0\\\), and if it holds for some \\\(\alpha\\\) if it holds for all \\\(\beta\\\) below \\\(\alpha\\\), then it holds for all ordinals.
There is actually nothing wrong with making this claim for all ordinals, but in this context, there is no point going above \\\(\chi\\\) anyway, since no hydras map to those large ordinals.*

The only non-trivial part of this is step 3.
I dedicate some space to defining \\\(M\\\), and the rest of the proof is for proving step 3.

**Result.**
\\\(\forall A \in \mathbb{H}, \pi(A)\\\)

**Corollary.**
Additionally (though not directly proved by these parts alone), the strength of Amiko hydras is upper-bounded at \\\(\chi\\\).

I must emphasize that, because \\\(M\\\) is not necessarily a bijection, \\\(\chi\\\) is only an upper bound for the strength of Amiko hydras, and actually the hydras may be weaker.
To be precise, for the unique \\\(\chi\\\) for which a bijective \\\(M\\\) exists, the strength of Amiko hydras is exactly that \\\(\chi\\\).

</div>