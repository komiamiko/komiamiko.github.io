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
and the Buchholz normal form up to \\\(\psi_0(\varepsilon_{\Omega_\omega + 1})\\\).
As I see it, there is no point in using the notations between the 2-argument Veblen function and the Buchholz function,
including the finitary and transfinite versions of the Veblen function and some other ordinal collapsing functions,
as the Buchholz function is simpler than all of those, so you might as well jump up to there.

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

All ordinals are written in Taranovsky's DoRI C normal form.

Let \\\(\mathbb{H}\\\) be the set of all hydras.
Let \\\(0_H = (\star:)\\\).
Let \\\(\chi = ?\\\) be the set of ordinals used.

**1. Definition of termination.**
\\\(\forall A \in \mathbb{H}, \pi(A) = (A = 0_H \lor \pi(S(A)))\\\)
Note that \\\(S\\\) is nondeterministic due to the free variable \\\(N\\\), so there is an implied \\\(\forall N \in \mathbb{N}\\\).

*In words, \\\(\pi\\\) is the predicate "this hydra terminates".
The hydra \\\(0_H\\\) is already considered terminated, and any other hydra terminates if after a step it becomes a hydra which terminates.*

**2. Correspondence from hydras to ordinals.**
We define a function \\\(M: \mathbb{H} \to \chi\\\) with \\\(M(0_H) = 0\\\)
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

**Hydra theorem.**
\\\(\forall A \in \mathbb{H}, \pi(A)\\\)

**Corollary.**
The strength of Amiko hydras is upper-bounded at \\\(\chi\\\).
Formally proving this requires some more technical steps, but the are not hard after the main proof is done.

I must emphasize that, because \\\(M\\\) is not necessarily a bijection, \\\(\chi\\\) is only an upper bound for the strength of Amiko hydras, and actually the hydras may be weaker.
To be precise, for the unique \\\(\chi\\\) for which a bijective \\\(M\\\) exists, the strength of Amiko hydras is exactly that \\\(\chi\\\).

</div>

# Definition of \\\(M\\\)
{: #proof-hydra-map}

{% include collapser.markdown %}

<div>

</div>

# Proving the ordinal always decreases
{: #proof-ordinal-decrease}

{% include collapser.markdown %}

<div>

</div>

# Closing notes
{: #closing-notes}

{% include collapser.markdown %}

<div>

</div>

# Appendix - Taranovsky's DoRI C examples
{: #appendix-taranovsky-c-examples}

{% include collapser.markdown %}

<div>

To help understand Taranovsky's DoRI C, I provide many examples against other hopefully more familiar notations.
\\\(\psi\\\) refers to the extended Buchholz function.

Shorthands I use for Taranovsky's DoRI C:

* \\\(C(\alpha, \beta) = C(0, \alpha, \beta)\\\)
* \\\(\uparrow \alpha = C(1, 0, \alpha)\\\)
* \\\(\Uparrow \alpha = C(1, 1, \alpha)\\\)
* \\\(\Omega = \uparrow 0\\\) (importantly, not the same as \\\(\omega_1\\\), which is what is usually meant by \\\(\Omega\\\))

<div style="overflow:auto;">

| In other notations | Taranovsky's DoRI C |
|--:|:--|
| \\\( 0 \\\) | \\\( 0 \\\) |
| \\\( 1 = \varphi(0, 0) = \psi_0(0) \\\) | \\\( C(0, 0) \\\) |
| \\\( 2 = \varphi(0, 0) + \varphi(0, 0) = \psi_0(0) + \psi_0(0) \\\) | \\\( C(0, 1) = C(0, C(0, 0)) \\\) |
| \\\( 3 = \psi_0(0) + \psi_0(0) + \psi_0(0) \\\) | \\\( C(0, 2) \\\) |
| \\\( \alpha + 1 = \alpha + \psi_0(0) \\\) | \\\( C(0, \alpha) \\\) |
| \\\( \omega = 1 + 1 + \cdots = \varphi(0, 1) = \varphi(0, \varphi(0, 0)) = \psi_0(1) = \psi_0(\psi_0(0)) \\\) | \\\( C(1, 0) = C(C(0, 0), 0) = C(0, C(0, \cdots)) \\\) |
| \\\( \omega + 1 \\\) | \\\( C(0, C(1, 0)) \\\) |
| \\\( \omega + 2 \\\) | \\\( C(0, C(0, C(1, 0))) \\\) |
| \\\( \omega 2 = \omega + \omega = \omega + 1 + 1 + \cdots = \psi_0(1) + \psi_0(1) \\\) | \\\( C(1, C(1, 0)) \\\) |
| \\\( \omega 3 \\\) | \\\( C(1, C(1, C(1, 0))) \\\) |
| \\\( \alpha + \omega \\\) | \\\( C(1, \alpha) \\\) |
| \\\( \omega^2 = \omega + \omega + \cdots = \varphi(0, 2) = \psi_0(2) \\\) | \\\( C(2, 0) = C(1, C(1, \cdots)) \\\) |
| \\\( \omega^2 + 1 \\\) | \\\( C(0, C(2, 0)) \\\) |
| \\\( \omega^2 + \omega \\\) | \\\( C(1, C(2, 0)) \\\) |
| \\\( \omega^2 2 = \omega^2 + \omega^2 \\\) | \\\( C(2, C(2, 0)) \\\) |
| \\\( \alpha + \omega^2 \\\) | \\\( C(2, \alpha) \\\) |
| \\\( \omega^3 = \varphi(0, 3) = \psi_0(3) \\\) | \\\( C(3, 0) = C(2, C(2, \cdots)) \\\) |
| \\\( \alpha + \omega^3 \\\) | \\\( C(3, \alpha) \\\) |
| \\\( \omega^n = \varphi(0, n) = \psi_0(n) \\\) | \\\( C(n, 0) \\\) |
| \\\( \alpha + \omega^n \\\) | \\\( C(n, \alpha) \\\) |
| \\\( \omega^\omega = \omega^{1 + 1 + \cdots} = \varphi(0, \omega) = \varphi(0, \varphi(0, 1)) = \psi_0(\omega) = \psi_0(\psi_0(1)) = \psi_0(\psi_0(\psi_0(0))) \\\) | \\\( C(\omega, 0) = C(C(1, 0), 0) = C(C(0, C(0, \cdots)), 0) \\\) |
| \\\( \alpha + \omega^\omega \\\) | \\\( C(\omega, \alpha) = C(C(1, 0), \alpha) \\\) |
| \\\( \omega^{\omega + 1} = \psi_0(\omega + 1) = \psi_0(\psi_0(1) + 1) \\\) | \\\( C(\omega + 1, 0) = C(C(0, C(1, 0)), 0) \\\) |
| \\\( \omega^{\omega 2} = \psi_0(\omega 2) = \psi_0(\psi_0(1) 2) \\\) | \\\( C(\omega 2, 0) = C(C(1, C(1, 0)), 0) \\\) |
| \\\( \omega^{\omega^2} = \psi_0(\omega^2) = \psi_0(\psi_0(2)) \\\) | \\\( C(C(2, 0), 0) \\\) |
| \\\( \omega^{\omega^\omega} = \varphi(0, \varphi(0, \varphi(0, 1))) = \psi_0(\omega^\omega) = \psi_0(\psi_0(\omega)) = \psi_0(\psi_0(\psi_0(1))) \\\) | \\\( C(C(C(1, 0), 0), 0) \\\) |
| \\\( \alpha + \omega^\beta = \alpha + \psi_0(\beta), \beta < \varepsilon_0 \\\) | \\\( C(\beta, \alpha) \\\) |
| \\\( \varepsilon_0 = \omega^{\omega^{\omega^\cdots}} = \varphi(1, 0) = \psi_0(\psi_1(0)) = \psi_0(\psi_0(\psi_0(\cdots))) \\\) | \\\( C(\Omega, 0) = C(\uparrow 0, 0) = C(C(1, 0, 0), 0) = C(C(C(\cdots, 0), 0), 0) \\\) |
| \\\( \varepsilon_0 + 1 \\\) | \\\( C(0, C(\Omega, 0)) \\\) |
| \\\( \varepsilon_0 + \omega \\\) | \\\( C(1, C(\Omega, 0)) \\\) |
| \\\( \varepsilon_0 2 = \varepsilon_0 + \varepsilon_0 = \varepsilon_0 + \omega^{\omega^{\omega^\cdots}} \\\) | \\\( C(C(\Omega, 0), C(\Omega, 0)) = C(C(C(C(\cdots, 0), 0), 0), C(\Omega, 0)) \\\) |
| \\\( \varepsilon_0 3 \\\) | \\\( C(C(\Omega, 0), C(C(\Omega, 0), C(\Omega, 0))) \\\) |
| \\\( \omega^{\varepsilon_0 + 1} = \varepsilon_0 \omega = \varepsilon_0 + \varepsilon_0 + \cdots = \varphi(0, \varphi(1, 0) + 1) = \psi_0(\psi_1(0) + 1) \\\) | \\\( C(C(0, C(\Omega, 0)), C(\Omega, 0)) = C(C(\Omega, 0), C(C(\Omega, 0), \cdots)) \\\) |
| \\\( \omega^{\varepsilon_0 + \omega} = \varepsilon_0 \omega^\omega \\\) | \\\( C(C(1, C(\Omega, 0)), C(\Omega, 0)) \\\) |
| \\\( \omega^{\omega^{\varepsilon_0 + 1}} = \psi_0(\psi_1(0) + \psi_0(\psi_1(0) + 1)) \\\) | \\\( C(C(C(0, C(\Omega, 0)), C(\Omega, 0)), C(\Omega, 0)) \\\) |
| \\\( \varepsilon_1 = \varphi(1, 1) = \psi_0(\psi_1(0) 2) \\\) | \\\( C(\Omega, C(\Omega, 0)) = C(C(C(\cdots, C(\Omega, 0)), C(\Omega, 0)), C(\Omega, 0)) \\\) |
| \\\( \varepsilon_2 = \varphi(1, 2) = \psi_0(\psi_1(0) 3) \\\) | \\\( C(\Omega, C(\Omega, C(\Omega, 0))) = C(C(\cdots, C(\Omega, C(\Omega, 0))), C(\Omega, C(\Omega, 0))) \\\) |
| \\\( \varepsilon_\omega = \varphi(1, \omega) = \varphi(1, \varphi(0, 1)) = \varepsilon_{1 + 1 + \cdots} = \psi_0(\psi_1(1)) = \psi_0(\psi_1(\psi_0(0))) = \psi_0(\psi_1(0) + \psi_1(0) + \cdots) \\\) | \\\( C(\Omega + 1, 0) = C(C(0, \Omega), 0) = C(\Omega, C(\Omega, \cdots)) \\\) |
| \\\( \varepsilon_{\omega + 1} = \psi_0(\psi_1(1) + \psi_1(0)) \\\) | \\\( C(\Omega, C(C(0, \Omega), 0)) \\\) |
| \\\( \varepsilon_{\omega 2} = \psi_0(\psi_1(1) 2) \\\) | \\\( C(C(0, \Omega), C(C(0, \Omega), 0)) \\\) |
| \\\( \varepsilon_{\omega^2} = \varepsilon_{\omega + \omega + \cdots} = \psi_0(\psi_1(2)) \\\) | \\\( C(\Omega + 2, 0) = C(C(0, C(0, \Omega)), 0) = C(C(0, \Omega), C(C(0, \Omega), \cdots)) \\\) |
| \\\( \varepsilon_{\omega^n} = \psi_0(\psi_1(n)) \\\) | \\\( C(\Omega + n, 0) \\\) |
| \\\( \varepsilon_{\omega^\omega} = \psi_0(\psi_1(\psi_0(1))) \\\) | \\\( C(\Omega + \omega, 0) = C(C(1, \Omega), 0) \\\) |
| \\\( \varepsilon_{\omega^{\omega^\omega}} = \psi_0(\psi_1(\psi_0(\psi_0(1)))) \\\) | \\\( C(\Omega + \omega^\omega, 0) = C(C(C(1, 0), \Omega), 0) \\\) |
| \\\( \varepsilon_{\varepsilon_0} = \varphi(1, \varphi(1, 0)) = \psi_0(\psi_1(\psi_0(\psi_1(0)))) \\\) | \\\( C(\Omega + \varepsilon_0, 0) = C(C(C(\Omega, 0), \Omega), 0) \\\) |
| \\\( \varepsilon_{\omega^{\varepsilon_0 + 1}} = \varepsilon_{\varepsilon_0 \omega} = \psi_0(\psi_1(\psi_0(\psi_1(0) + 1))) \\\) | \\\( C(\Omega + \varepsilon_0 + 1, 0) = C(C(0, C(C(\Omega, 0), \Omega)), 0) \\\) |
| \\\( \varepsilon_{\varepsilon_1} = \varphi(1, \varphi(1, 1)) = \psi_0(\psi_1(\psi_0(\psi_1(0) 2))) \\\) | \\\( C(\Omega + \varepsilon_1, 0) = C(C(C(\Omega, C(\Omega, 0)), \Omega), 0) \\\) |
| \\\( \varepsilon_{\varepsilon_\omega} = \varphi(1, \varphi(1, \varphi(0, 1))) = \psi_0(\psi_1(\psi_0(\psi_1(1)))) = \psi_0(\psi_1(\psi_0(\psi_1(\psi_0(0))))) \\\) | \\\( C(\Omega + \varepsilon_\omega, 0) = C(C(C(C(0, \Omega), 0), \Omega), 0) \\\) |
| \\\( \varepsilon_{\varepsilon_{\varepsilon_0}} = \varphi(1, \varphi(1, \varphi(1, 0))) = \psi_0(\psi_1(\psi_0(\psi_1(\psi_0(\psi_1(0)))))) \\\) | \\\( C(\Omega + \varepsilon_{\varepsilon_0}, 0) = C(C(C(C(C(\Omega, 0), \Omega), 0), \Omega), 0) \\\) |

</div>

I'll take a small break here to remind you about how \\\(C\\\) is defined.

> 1. C(a, b, c) is the least ordinal e of admissibility degree a that is above c and is not in H(b, e).
> 2. H(b, e) is the least set of ordinals that contains all members of e, and is closed under h, i, j → C(h, i, j) where i < b.
> 3. If an ordinal e is of admissibility degree a, then C(h, i, j) < e whenever h < a and j < e. 0 is of admissibility degree 0.

*Taranovsky, 2020, Section 3.1*

We won't need to use \\\(a > 0\\\) until larger ordinals, so you can ignore the parts about admissibility degree.
In short, \\\(C(0, b, c)\\\) is the smallest ordinal above \\\(c\\\) which cannot be built from ordinals below it, with the additional restriction that sub-expressions \\\(C(h, i, j)\\\) must satisfy \\\(i < b\\\).

I think this is where pattern recognition begins to break down and it's necessary to know the definition.
Just from what intuitively makes sense, one would guess \\\(C(\alpha + 1, 0) = C(\alpha, C(\alpha, \cdots))\\\) was the regular rule,
and that \\\(C(\Omega, \alpha) = C(C(\cdots, \alpha), \alpha)\\\) was some special rule.
This guess fails at the next example, or if not there, soon after.

<div style="overflow:auto;">

| In other notations | Taranovsky's DoRI C |
|--:|:--|
| \\\( \zeta_0 = \varepsilon_{\varepsilon_{\cdots}} = \varphi(2, 0) = \varphi(1, \varphi(1, \cdots)) = \psi_0(\psi_1(\psi_1(0))) = \psi_0(\psi_1(\psi_0(\psi_1(\cdots)))) \\\) | \\\( C(\Omega 2, 0) = C(\Omega + \Omega, 0) = C(C(\Omega, \Omega), 0) = C(C(C(C(\cdots, \Omega), 0), \Omega), 0) \\\) |
| \\\( \zeta_0 2 \\\) | \\\( C(\zeta_0, \zeta_0) = C(C(C(\Omega, \Omega), 0), C(C(\Omega, \Omega), 0)) \\\) |
| \\\( \omega^{\zeta_0 + 1} = \varphi(0, \varphi(2, 0) + 1) = \psi_0(\psi_1(\psi_1(0)) + 1) \\\) | \\\( C(\zeta_0 + 1, \zeta_0) = C(C(0, C(C(\Omega, \Omega), 0)), C(C(\Omega, \Omega), 0)) \\\) |
| \\\( \varepsilon_{\zeta_0 + 1} = \varphi(1, \varphi(2, 0) + 1) = \psi_0(\psi_1(\psi_1(0)) + \psi_1(0)) \\\) | \\\( C(\Omega, \zeta_0) = C(\Omega, C(C(\Omega, \Omega), 0)) \\\) |
| \\\( \zeta_1 = \varphi(2, 1) = \psi_0(\psi_1(\psi_1(0)) 2) \\\) | \\\( C(\Omega 2, \zeta_0) = C(C(\Omega, \Omega), C(C(\Omega, \Omega), 0)) \\\) |
| \\\( \zeta_\omega = \varphi(2, \varphi(0, 1)) = \psi_0(\psi_1(\psi_1(0) + 1)) \\\) | \\\( C(\Omega 2 + 1, 0) = C(C(0, C(\Omega, \Omega)), 0) \\\) |
| \\\( \zeta_{\zeta_0} = \varphi(2, \varphi(2, 0)) = \psi_0(\psi_1(\psi_1(0) + \psi_0(\psi_1(\psi_1(0))))) \\\) | \\\( C(\Omega 2 + \zeta_0, 0) = C(C(C(C(\Omega, \Omega), 0), C(\Omega, \Omega)), 0) \\\)
| \\\( \zeta_{\zeta_\omega} = \varphi(2, \varphi(2, \varphi(0, 1))) = \psi_0(\psi_1(\psi_1(0) + \psi_0(\psi_1(\psi_1(0) + 1)))) \\\) | \\\( C(\Omega 2 + \zeta_\omega, 0) = C(C(C(C(0, C(\Omega, \Omega)), 0), C(\Omega, \Omega)), 0) \\\) |
| \\\( \varphi(3, 0) = \psi_0(\psi_1(\psi_1(0) 2)) \\\) | \\\( C(\Omega 3, 0) = C(\Omega 2 + \Omega, 0) = C(C(\Omega, C(\Omega, \Omega)), 0) \\\) |
| \\\( \varphi(3, 1) = \psi_0(\psi_1(\psi_1(0) 2) 2) \\\) | \\\( C(C(C(\Omega, C(\Omega, \Omega)), 0), C(C(\Omega, C(\Omega, \Omega)), 0)) \\\) |
| \\\( \varphi(3, \varphi(0, 1)) = \psi_0(\psi_1(\psi_1(0) 2 + 1)) \\\) | \\\( C(\Omega 3 + 1, 0) = C(C(0, C(\Omega, C(\Omega, \Omega))), 0) \\\) |
| \\\( \varphi(3, \varphi(3, 0)) = \psi_0(\psi_1(\psi_1(0) 2 + \psi_0(\psi_1(\psi_1(0) 2)))) \\\) | \\\( C(C(C(C(\Omega, C(\Omega, \Omega)), 0), C(\Omega, C(\Omega, \Omega))), 0) \\\) |
| \\\( \varphi(3, \varphi(3, \varphi(0, 1))) = \psi_0(\psi_1(\psi_1(0) 2 + \psi_0(\psi_1(\psi_1(0) 2 + 1)))) \\\) | \\\( C(C(C(C(0, C(\Omega, C(\Omega, \Omega))), 0), C(\Omega, C(\Omega, \Omega))), 0) \\\) |
| \\\( \varphi(4, 0) = \psi_0(\psi_1(\psi_1(0) 3)) \\\) | \\\( C(\Omega 4, 0) = C(C(\Omega, C(\Omega, C(\Omega, \Omega))), 0) \\\) |
| \\\( \varphi(n + 1, 0) = \psi_0(\psi_1(\psi_1(0) n)) \\\) | \\\( C(\Omega (n+1), 0) = C(C(\Omega, \Omega n), 0) \\\)
| \\\( \varphi(\varphi(0, 1), 0) = \psi_0(\psi_1(\psi_1(1))) = \psi_0(\psi_1(\psi_1(\psi_0(0)))) \\\) | \\\( C(\omega^{\Omega + 1}, 0) = C(\Omega \omega, 0) = C(C(\Omega + 1, \Omega), 0) = C(C(C(0, \Omega), \Omega), 0) \\\)
| \\\( \varphi(\varphi(0, \varphi(0, 1)), 0) = \psi_0(\psi_1(\psi_1(\psi_0(1)))) = \psi_0(\psi_1(\psi_1(\psi_0(\psi_0(0))))) \\\) | \\\( C(C(\Omega + \omega, \Omega), 0) = C(C(C(1, \Omega), \Omega), 0) = C(C(C(C(0, 0), \Omega), \Omega), 0) \\\) |
| \\\( \varphi(\varphi(1, 0), 0) = \psi_0(\psi_1(\psi_1(\psi_0(\psi_1(0))))) \\\) | \\\( C(C(\Omega + \varepsilon_0, \Omega), 0) = C(C(C(C(\Omega, 0), \Omega), \Omega), 0) \\\) |
| \\\( \varphi(\varphi(\varphi(0, 1), 0), 0) = \psi_0(\psi_1(\psi_1(\psi_0(\psi_1(\psi_1(1)))))) \\\) | \\\( C(C(C(C(C(C(0, \Omega), \Omega), 0), \Omega), \Omega), 0) \\\) |
| \\\( \Gamma_0 = \varphi(1, 0, 0) = \psi_0(\psi_1(\psi_1(\psi_1(0)))) \\\) | \\\( C(\omega^{\Omega 2}, 0) = C(\Omega^2, 0) = C(C(\Omega 2, \Omega), 0) = C(C(C(\Omega, \Omega), \Omega), 0) \\\) |

</div>

</div>