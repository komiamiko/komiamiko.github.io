---
layout: post
title: "Large numbers in the SKI combinator calculus"
date: 2020-06-21 21:00
categories: math ordinals
---

<div class="no-js">
Math on this page may not display correctly without JavaScript.
</div>

{::options parse_block_html="true" /}

# Foreword
{: #foreword}

{% include collapser.markdown %}

<div>

Among all the kinds of mathematical problems you can choose to take on,
one of the easiest kinds is setting lower and upper bounds.
I don't mean to say it's always easy - there are definitely some notable bounds which were very difficult to prove and for which the proof is an achievement in mathematics.
However, most of the time, you can go find something for which the exact number is not known, and go bound it for the first time, or improve an existing bound, with little effort.
Congratulations, you just discovered a new mathematical fact and ever so slightly expanded humanity's collection of useful information.

Even if a fact seems easy to prove and not very useful to the discoverer, I would say that alone does not inherently make it unworthy of publication.
Please do share your small discoveries.
Once discovered and published, it becomes a fact that does not need to be derived again.
It may become a useful stepping stone for a larger research work.
That path may have yet to be mapped out.
That research work may not have been started yet.
The field of that research may not even exist yet.
When we do get there though, we will be one step closer to the goal than if you had not shared your discovery.

That is why I am now publishing some lower bounds I have found for the \\\(\Xi\\\) function, and all the rough work in deriving them.
Even though these seem to be a trivially obvious improvement over [Lawrence Hollom's bounds](https://sites.google.com/a/hollom.com/extremely-big-numbers/home/xi),
which are the best I know of other than my own work,
and even if I have no use for these discoveries,
I still believe these results are interesting enough to share, and I hope, even if they are not directly useful in serious mathematics, that I can at least alleviate some first steps or provide inspiration on where to go.

</div>

# Definitions
{: #definitions}

{% include collapser.markdown %}

<div>

The SKI combinator calculus is a very minimal computational system.
You should read about it on [its Wikipedia article](https://en.wikipedia.org/wiki/SKI_combinator_calculus) if you're unfamiliar with the topic.

I'm not going to explain it all again, but in short, it is like a programming language whose only objects are unary functions, and whose only primitives are the combinators \\\(S, K, I\\\), hence the name.
As a reminder, since there are only unary functions, the brackets are often dropped except when needed to show order of evaluation, and expressions are read left to right.
For example, \\\(SKS(KI)S\\\) is a shorthand for the following pseudocode program:

```
     a ← S(K)
     b ← a(S)
     c ← K(I)
     d ← b(c)
result ← d(S)
```

As a reminder, this is what each combinator does:

```
Sxyz = xz(yz)
Kxy = x
Ix = x
```

What we informally call "evaluation" of these rules is formally called "beta-reduction".
One would beta-reduce an SKI expression until no further rules can be applied,
which occurs when none of the combinators have enough arguments to use their rule.
Conventionally, we beta-reduce at the leftmost possible sub-expression.
For example, starting with \\\(SSS(SI)S\\\), here is the order of steps until it is maximally beta-reduced:

```
SSS(SI)S
S(SI)(S(SI))S
SIS(S(SI)S)
I(S(SI)S)(S(S(SI)S))
S(SI)S(S(S(SI)S))
SI(S(S(SI)S))(S(S(S(SI)S)))
I(S(S(S(SI)S)))(S(S(SI)S)(S(S(S(SI)S))))
S(S(S(SI)S))(S(S(SI)S)(S(S(S(SI)S))))
```

The reason we need a convention like this is because some sub-expressions might continue beta-reducing endlessly,
but \\\(K\\\) would cause that non-terminating sub-expression to disappear if that \\\(K\\\) rule was applied first.

Note that just because an expression does not terminate does not mean it expands infinitely.
For example, \\\(SII(SII)\\\) beta-reduces to itself, and thus does not terminate.

The "size" of an expression is defined as the total number of combinators.

\\\(\Xi_0(n)\\\) is defined as the largest final size of a terminating SKI expression which starts with size \\\(n\\\) or less.

\\\(\Xi_1(n)\\\) is like \\\(\Xi_0\\\) but it allows use of an oracle operator \\\(\Omega\\\).
Since the definable expressions are a superset of those of \\\(\Xi_0\\\), \\\(\Xi_1(n) \ge \Xi_0(n)\\\) for all \\\(n\\\).
There's no algorithm I know of to define higher \\\(\Xi\\\) and whatever additional operators they get.

The commonly named \\\(\Xi\\\), for whatever reason, is \\\(\Xi_1\\\).

I only analyze \\\(\Xi_0\\\), but keep in mind since \\\(\Xi_1(n) \ge \Xi_0(n)\\\), these lower bounds are valid as well for \\\(\Xi_1\\\), they just aren't particularly strong bounds for \\\(\Xi_1\\\).

</div>

# Summary of results
{: #summary}

{% include collapser.markdown %}

<div>

You can read all my rough work and explanations below, but if you just want the best numbers I could get, here's the table:

<div style="overflow:auto;">

| Full expression | Size | Bound set |
|--:|:-:|:--|
| \\\([A'] ([A] [2]) KK\\\) | 16 | \\\(\Xi_0(16) \ge 2^{2^9}+1=4^{2^8}+1=4^{4^4}+1 > f_3(2)\\\) |
| \\\([+1R] ([A] [2]) [A] KK\\\) | 17 | \\\(\Xi_0(17) \ge A^4(4)+1 > f_3(4)\\\) |
| \\\([+1R] ([A] [2]) [A] (SK)K\\\) | 18 | \\\(\Xi_0(18) \ge 2A^4(4)+1 > f_3(4)\\\) |
| \\\([+1R] [2] [+1:[A]] KK\\\) | 19 | \\\(\Xi_0(19) \ge A^{256}(256)+1=A_{+1}(256)+1=A_{+1}(A^2(2))+1=A_{+2}(2)+1 > f_3(256)\\\) |
| \\\([+1R] [2] [+1:[A']] KK\\\) | 21 | \\\(\Xi(21) \ge A'^{2^{2^6}}(2^{2^6})+1=A'\_{+1}(2^{2^6})+1=A'\_{+1}(A'^2(2))+1=A'\_{+2}(2)+1 > f\_4(2)\\\) |
| \\\([+1R] ([A] [2]) [+1:[A]] KK\\\) | 22 | \\\(\Xi(22) \ge A_{+2}(4)+1 > f_4(3)\\\) |
| \\\([+1R] [2] [B] KK\\\) | 25 | \\\(\Xi_0(25) >f_{\omega+1}(2)\\\) |
| \\\([+1R] [2] [+1:[B]] KK\\\) | 30 | \\\(\Xi_0(30) >f_{\omega+2}(2)\\\) |
| \\\([+1R] [2] [+1:[+1:[B]]] KK\\\) | 35 | \\\(\Xi_0(35) >f_{\omega+3}(2)\\\) |
| \\\([+1R] [2] [\omega^2 C] KK\\\) | 38 | \\\(\Xi_0(38) > f_{\omega^2+1}(2)\\\) |
| \\\([+1R] ([A] [2]) [\omega^2 C] KK\\\) | 41 | \\\(\Xi_0(41) > f_{\omega^2+1}(4)\\\) |
| \\\([+1R] [2] [+1:[\omega^2 C]] KK\\\) | 43 | \\\(\Xi_0(43) > f_{\omega^2+2}(2)\\\) |
| \\\([+1R] ([A] [2]) [+1:[\omega^2 C]] KK\\\) | 46 | \\\(\Xi_0(46) > f_{\omega^2+2}(4)\\\) |
| \\\([+1R] [2] [+2:[\omega^2 C]] KK\\\) | 48 | \\\(\Xi_0(48) > f_{\omega^2+3}(2)\\\) |
| \\\([+1R] [2] [\omega^3 C] KK\\\) | 51 | \\\(\Xi_0(51) > f_{\omega^3+1}(2)\\\) |
| \\\([+1R] ([A] [2]) [\omega^3 C] KK\\\) | 54 | \\\(\Xi_0(54) > f_{\omega^3+1}(4)\\\) |
| \\\([+1R] [2] [\omega^\omega C] KK\\\) | 56 | \\\(\Xi_0(56) > f_{\omega^\omega+1}(2)\\\) |
| \\\([+1R] ([A] [2]) [\omega^\omega C] KK\\\) | 59 | \\\(\Xi_0(59) > f_{\omega^\omega+1}(4)\\\) |
| \\\([+1R] [2] [+1:[\omega^\omega C]] KK\\\) | 61 | \\\(\Xi_0(61) > f_{\omega^\omega+2}(2)\\\) |
| \\\([+1R] ([A] [2]) [+1:[\omega^\omega C]] KK\\\) | 64 | \\\(\Xi_0(64) > f_{\omega^\omega+2}(4)\\\) |
| \\\([+1R] [2] [+2:[\omega^\omega C]] KK\\\) | 66 | \\\(\Xi_0(66) > f_{\omega^\omega+3}(2)\\\) |
| \\\([+1R] ([A] [2]) [+2:[\omega^\omega C]] KK\\\) | 69 | \\\(\Xi_0(69) > f_{\omega^\omega+3}(4)\\\) |
| \\\([+1R] [2] [+\omega:[\omega^\omega C]] KK\\\) | 70 | \\\(\Xi_0(70) > f_{\omega^\omega+\omega+1}(2)\\\) |
| \\\([+1R] ([A] [2]) [+\omega:[\omega^\omega C]] KK\\\) | 73 | \\\(\Xi_0(73) > f_{\omega^\omega+\omega+1}(4)\\\) |
| \\\([+1R] [2] [+\omega+1:[\omega^\omega C]] KK\\\) | 75 | \\\(\Xi_0(75) > f_{\omega^\omega+\omega+2}(2)\\\) |
| \\\([+1R] ([A] [2]) [+\omega+1:[\omega^\omega C]] KK\\\) | 78 | \\\(\Xi_0(78) > f_{\omega^\omega+\omega+2}(4)\\\) |
| \\\([+1R] [2] [+\omega+2:[\omega^\omega C]] KK\\\) | 80 | \\\(\Xi_0(80) > f_{\omega^\omega+\omega+3}(2)\\\) |
| \\\([+1R] [2] [+\omega^2:[\omega^\omega C]] KK\\\) | 83 | \\\(\Xi_0(83) > f_{\omega^\omega+\omega^2+1}(2)\\\) |
| \\\([+1R] [2] ([\times\omega] [\omega^\omega C]) KK\\\) | 85 | \\\(\Xi_0(85) > f_{\omega^{\omega+1} +1}(2)\\\) |
| \\\([+1R] [2] [\omega^{\omega^\omega} C] KK\\\) | 117 | \\\(\Xi_0(117) > f_{\omega^{\omega^\omega}+1}(2)\\\) |
| \\\([+1R] [2] [E:A] KK\\\) | 2120 | \\\(\Xi_0(2120) >f_{\varepsilon_0}(5)\\\) |
| \\\([+1R] ([A] [2]) [E:A] KK\\\) | 2123 | \\\(\Xi_0(2123) >f_{\varepsilon_0+1}(3)\\\) |
| \\\([+1R] ([A] [2]) ([\times \omega] [+\varepsilon_0] [A]) KK\\\) | 2171 | \\\(\Xi_0(2171) >f_{\varepsilon_0 \omega+1}(3) = f_{\omega^{\varepsilon_0+1}+1}(3)\\\) |
| \\\([+1R] ([A] [2]) ([2] [\times \omega] [+\varepsilon_0] [A]) KK\\\) | 2177 | \\\(\Xi_0(2177) >f_{\varepsilon_0 \omega^2+1}(3) = f_{\omega^{\varepsilon_0+2}+1}(3)\\\) |
| \\\([+1R] ([A] [2]) ([D] [\times \omega] [+\varepsilon_0] [A]) KK\\\) | 2201 | \\\(\Xi_0(2201) >f_{\varepsilon_0 \omega^\omega+1}(3) = f_{\omega^{\varepsilon_0+\omega}+1}(3)\\\) |
| \\\([+1R] ([A] [2]) ([2] [D] [\times \omega] [+\varepsilon_0] [A]) KK\\\) | 2207 | \\\(\Xi_0(2207) >f_{\varepsilon_0 \omega^{\omega^2}+1}(3) = f_{\omega^{\varepsilon_0+\omega^2}+1}(3)\\\) |

</div>

All macro definitions can be found in the rough work section below.

</div>

# Derivations and rough work
{: #rough-work}

{% include collapser.markdown %}

<div>

## Beta-reduction and extrinsic equivalence
{: #beta-reduction-equivalence}

{% include collapser.markdown %}

<div>

Let's say you have two programs, \\\(A\\\) and \\\(B\\\).
How do you determine if they are equal?

There are two very different ways to define equality on programs.
One is to only look from the outside - do they produce the same outputs for all possible inputs?
This is called extrinsic equivalence.
The other is to look inside at their code - is their code identical?
This is called intrinsic equivalence.

To see how this applies for SKI expressions, observe that \\\(SKx\\\) is extrinsically equivalent to \\\(I\\\) for all possible \\\(x\\\).
If we follow the beta-reduction, \\\(SKxy \to Ky(xy) \to y\\\), same as \\\(Iy \to y\\\).
Yet all functions in this family are intrinsically different.

As a more interesting example, observe that \\\(S(Kx)I\\\) is extrinsically equivalent to \\\(x\\\) for all possible \\\(x\\\).
Whatever \\\(y\\\) we probe it with, we find \\\(S(Kx)Iy \to Kxy(Iy) \to x(Iy) \to xy\\\).
After one evaluation, the expressions become intrinsically equivalent, yet the original expressions are intrinsically different.

The reason I discuss this is I'm about to make Church numerals in SKI.
Church numerals are a regular way to represent numbers as functions.
Under this encoding, \\\(n\\\) refers to a function satisfying \\\(nxy = x(x(...(xy)))\\\) with \\\(n\\\) copies of \\\(x\\\).
As the first few examples, \\\(0 = KI\\\) and \\\(1 = I\\\).
Notably, these are not the unique representations of the numbers.
In fact, for sufficiently large \\\(n\\\), you can create \\\(n\\\) with far fewer than \\\(n\\\) combinators.
**Naming a large Church numeral in SKI is alone not sufficient to set a lower bound for** \\\(\Xi_0\\\).

We want to create an implementation of \\\(n\\\) which reduces immediately after receiving \\\(x, y\\\) to the expression \\\(x(x(...(xy)))\\\), or to an expression which \\\(x(x(...(xy)))\\\) eventually beta-reduces to.
I'll call this kind of property of implementations the "eager" property, meaning that after receiving the specified number of arguments, it immediately reduces to be intrinsically equivalent to whatever the reference is.
In this case, we are asking for an eager \\\(n\\\) which reduces to \\\(x(x(...(xy)))\\\) after receiving \\\(x, y\\\).
It is helpful, but not a sufficient requirement, that we use only eager implementations in our constructions.
If we can ensure our implementation of \\\(n\\\) is eager, we can then evaluate \\\(nKK\\\) and get a final expression which for sure has size \\\(n+1\\\), and thus will set a proven lower bound for \\\(\Xi_0\\\).

I'm not going to prove eagerness in my constructions, but feel free to verify it for yourself and point it out if I actually did get it wrong.

</div>

## Church numeral 2 in SKI
{: #church-numeral-2}

{% include collapser.markdown %}

<div>

To get started, let's implement the Church numeral \\\(2\\\).
We don't really care about \\\(0 = KI\\\) and \\\(1 = I\\\) because they won't help us grow to large numbers.

\\\[\begin{eqnarray}
2 &= \lambda x.\lambda y.x(xy) \\\\\\
&= \lambda x.\lambda y.Kxy(xy) \\\\\\
&= \lambda x.\lambda y.S(Kx)xy \\\\\\
&= \lambda x.S(Kx)x \\\\\\
&= S(\lambda x.S(Kx))I \\\\\\
&= S(S(KS)K)I \\\\\\
\end{eqnarray}\\\]

It took \\\(6\\\) combinators.
There is no smaller implementation of \\\(2\\\) that I know of, but if there is one, it would improve the bounds I present.

For clarity in later mentions, I'll use \\\([n]\\\) to denote a function which is the Church numeral for the number \\\([n]\\\), and I'll use \\\([2]\\\) specifically as a shorthand or "macro" for \\\(S(S(KS)K)I\\\).
If a smaller implementation of the Church numeral \\\(2\\\) exists, it can be used instead.

</div>

## Arithmetically large constructions
{: #arithmetic-construction}

{% include collapser.markdown %}

<div>

Our journey begins with numbers which are small enough for ordinary people to fathom with their understanding of arithmetic.
We look for a function which can make a number bigger, and in just \\\(3\\\) combinators we get it - \\\(SII\\\).
This is an eager function that applies a number to itself.
Let's call it \\\([A]\\\).
In arithmetic terms, \\\([A][n] = [n][n] = [n^n]\\\).

In \\\(3 + 6 = 9\\\) combinators we name \\\([A][2] = [4]\\\).

We'll also define \\\([A'] = S[A]I = \lambda x.xxx\\\) which uses \\\(5\\\) combinators to help fill in some gaps.
In arithmetic terms, \\\([A'][n] = [n][n][n] = [n^{n^n}]\\\).

Note that \\\(A\\\) is asymptotically faster than \\\(f_2(n) = 2^n n\\\) in the fast-growing hierarchy, but as a very important gotcha for our bounds, \\\(A(n) < f_2(n)\\\) at \\\(n \le 2\\\).
Meanwhile, \\\(A'\\\) beats \\\(f_2\\\) even at \\\(n = 2\\\), but loses to \\\(f_2^2(n)\\\) at \\\(n = 2\\\) analogously.

We can try building bigger numbers.

| Expression | Size | Value |
|--:|:-:|:--|
| \\\([2]\\\) | 6 | \\\(2\\\) |
| \\\([A] [2]\\\) | 9 | \\\(4=2^2\\\) |
| \\\([A'] [2]\\\) | 11 | \\\(16=2^{2^2}\\\) |
| \\\([A] ([A] [2])\\\) | 12 | \\\(256=2^8=4^4\\\) |
| \\\([2] [A] [2]\\\) | 15 | \\\(256=2^8=4^4\\\) |
| \\\([A'] ([A] [2])\\\) | 14 | \\\(2^{2^9}=4^{2^8}=4^{4^4} > f_3(2)\\\) |
| \\\([A] ([A] ([A] [2]))\\\) | 15 | \\\(2^{2^{11}}=2^{8\times 2^8}\\\) |
| \\\([A'] ([A] ([A] [2]))\\\) | 17 | \\\(2^{2^{2^{11} + 3}}=2^{2^{8\times 2^8 + 3}}=2^{8\times 2^{8\times 2^8}} > f_3(3)\\\) |

That's enough counting, since by now we have enough combinators to perform a more clever construction.

Also, when we eventually get to creating the \\\(\Xi_0\\\) lower bounds, we can fill in gaps by doing ex. \\\([n]KK, [n] (SK)K, [n] (S(SK))K, \cdots\\\).
This will get you marginally larger numbers.
To be specific, if the next lower record was \\\(M+1\\\), this fills in \\\(2M+1, 3M+1, \cdots\\\).
I still record these for completeness, but only for the first few examples, since beyond that it doesn't really help the size and it takes up space in the table.

</div>

## First steps up
{: #first-steps}

{% include collapser.markdown %}

<div>

We're going to define a new macro \\\([+1:f]\\\) which will perform a step of \\\(f_\alpha \mapsto f_{\alpha+1}\\\) in the fast-growing hierarchy:

\\\[\begin{eqnarray}
[+1:f] &= \lambda x.xfx \\\\\\
&= S(\lambda x.xf)I \\\\\\
&= S(SI(Kf))I
\end{eqnarray}\\\]

With just \\\(5\\\) additional combinators, we can "step up" a function once.
This allows us to name some larger numbers.

| Expression | Size | Value |
|--:|:-:|:--|
| \\\([+1:[A]] [2]\\\) | 14 | \\\(256=2^8=4^4\\\) |
| \\\([+1:[A']] [2]\\\) | 16 | \\\(2^{2^6}=2^{2^2\times 2^{2^2}}\\\) |
| \\\([+1:[A]] ([A] [2])\\\) | 17 | \\\(A^4(4) > f_3(4)\\\) |
| \\\([+1:[A']] ([A] [2])\\\) | 19 | \\\(A'^4(4) > f_3(7)\\\) |
| \\\([+1:[+1:[A]]] [2]\\\) | 19 | \\\(A^{256}(256)=A_{+1}(256)=A_{+1}(A^2(2))=A_{+2}(2) > f_3(256)\\\) |
| \\\([+1:[+1:[A']]] [2]\\\) | 21 | \\\(A'^{2^{2^6}}(2^{2^6})=A'_{+1}(2^{2^6})=A'_{+1}(A'^2(2))=A'_{+2}(2) > f_4(2)\\\) |
| \\\([+1:[+1:[A]]] ([A] [2])\\\) | 22 | \\\(A_{+2}(4) > f_4(3)\\\) |

We call also turn our \\\([+1:f]\\\) into a standalone function, which we can then manipulate within SKI.

\\\[\begin{eqnarray}
[+1] &= \lambda f.S(SI(Kf))I \\\\\\
&= S(\lambda f.S(SI(Kf)))(KI) \\\\\\
&= S(S(KS)(\lambda f.SI(Kf)))(KI) \\\\\\
&= S(S(KS)(S(K(SI))(\lambda f.Kf)))(KI) \\\\\\
&= S(S(KS)(S(K(SI))K))(KI)
\end{eqnarray}\\\]

This is unfortunately \\\(11\\\) combinators large.

If we allow ourselves a different order, as it turns out, there's a solution using just \\\(3\\\) combinators: \\\(SSK\\\).

\\\[\begin{eqnarray}
SSKxf &= Sx(Kx)f \\\\\\
&= xfx
\end{eqnarray}\\\]

This can be found by the lambda conversion algorithm:

\\\[\begin{eqnarray}
&= \lambda x.\lambda f.xfx \\\\\\
&= \lambda x.Sx(Kx) \\\\\\
&= SSK
\end{eqnarray}\\\]

Let's call this \\\([+1R]\\\), "R" for "reverse".
This looks to be even better than the \\\([+1:f]\\\) macro, as it uses fewer combinators and is a full separate function.
We can now quite easily shave off some combinators from the previous table.

| Expression | Size | Value |
|--:|:-:|:--|
| \\\([+1R] [2] [A]\\\) | 12 | \\\(256=2^8=4^4\\\) |
| \\\([+1R] [2] [A']\\\) | 14 | \\\(2^{2^6}=2^{2^2\times 2^{2^2}}\\\) |
| \\\([+1R] ([A] [2]) [A]\\\) | 15 | \\\(A^4(4) > f_3(4)\\\) |
| \\\([+1R] ([A] [2]) [A']\\\) | 17 | \\\(A'^4(4) > f_3(7)\\\) |
| \\\([+1R] [2] [+1:[A]]\\\) | 17 | \\\(A^{256}(256)=A_{+1}(256)=A_{+1}(A^2(2))=A_{+2}(2) > f_3(256)\\\) |
| \\\([+1R] [2] [+1:[A']]\\\) | 19 | \\\(A'^{2^{2^6}}(2^{2^6})=A'_{+1}(2^{2^6})=A'_{+1}(A'^2(2))=A'_{+2}(2) > f_4(2)\\\) |
| \\\([+1R] ([A] [2]) [+1:[A]]\\\) | 20 | \\\(A_{+2}(4) > f_4(3)\\\) |

Interestingly, we now have \\\(2\\\) different options for performing \\\(+1\\\) on a bound function, both using \\\(5\\\) additional combinators.
The previously presented one is \\\([+1:f] = S(SI(Kf))I\\\).
An alternate implementation is \\\([+1:f] = S[+1R] (Kf) = S(SSK)(Kf)\\\).
Intrinsically very different looking, but extrinsically equivalent.

We can squeeze these expressions just a little smaller by using the number itself as a fast-growing function instead of a separate function.
Remember, \\\([n] [m] = [m^n]\\\).
We just use \\\(S[+1R]I\\\) as our new growing function and it works, right?
No, it doesn't, since now the exponent is fixed, which makes the function polynomial rather than exponential, and now worse than \\\(f_2\\\).
The extra step we use to step back up negates the apparent savings on combinators used.

</div>

## Iterating to \\\(\omega\\\)
{: #to-omega}

{% include collapser.markdown %}

<div>

We haven't tried yet to build a standalone \\\([+1]\\\) out of our alternate \\\([+1:f]\\\) yet.
Would that reduce the number of combinators?

\\\[\begin{eqnarray}
[+1] &= \lambda f.S(SSK)(Kf) \\\\\\
[+1] &= S(K(S(SSK)))(\lambda f.Kf) \\\\\\
[+1] &= S(K(S(SSK)))K
\end{eqnarray}\\\]

Only \\\(7\\\) combiantors!
Remarkably, by taking a roundabout path to get here, we used fewer combinators.
There may yet be more clever strategies.

This doesn't immediately yield larger numbers.
To see for yourself, try \\\([2] [+1] [A] [2]\\\), which takes \\\(22\\\) combinators to do what we previously did in just \\\(17\\\).
It does become notable when we go up to \\\(\omega\\\).

\\\[\begin{eqnarray}
[+\omega] &= \lambda f.\lambda x.x[+1]fx \\\\\\
&= \lambda f.S(\lambda x.x[+1]f)I \\\\\\
&= \lambda f.S(S(\lambda x.x[+1])(Kf))I \\\\\\
&= \lambda f.S(S(SI(K[+1]))(Kf))I \\\\\\
&= S(\lambda f.S(S(SI(K[+1]))(Kf)))(KI) \\\\\\
&= S(S(KS)(\lambda f.S(SI(K[+1]))(Kf)))(KI) \\\\\\
&= S(S(KS)(S(K(S(SI(K[+1]))))K))(KI)
\end{eqnarray}\\\]

That took \\\(20\\\) combinators.

\\\[\begin{eqnarray}
[+\omega R] &= \lambda x.\lambda f.x[+1]fx \\\\\\
&= \lambda x.S(x[+1])(Kx) \\\\\\
&= S(\lambda x.S(x[+1]))K \\\\\\
&= S(S(KS)(\lambda x.x[+1]))K \\\\\\
&= S(S(KS)(SI(K[+1])))K
\end{eqnarray}\\\]

This takes \\\(15\\\) total combinators.
Much better.
At this size I'm quite sure there's a smaller implementation of this function or a similar function, but I'm not interested in searching.

Hold onto the previous one though, since by binding the function inside, we get \\\([+\omega:f] = S(S(SI(K[+1]))(Kf))I\\\) using only \\\(14\\\) additional combinators.

Starting here, we'll actually be ahead of the fast-growing hierarchy even at \\\(n = 2\\\).
Remember, \\\(A_{+m}\\\) is comparable to \\\(f_{2+m}\\\).
In our hierarchy, \\\(A_{+\omega}(n) = A_n(n) \approx f_{2+n}(n) > f_n(n) = f_\omega(n)\\\).
Even if we use a number as the base function, in which case \\\(n_{+m}\\\) is comparable to \\\(f_{1+m}\\\), we still win starting at \\\(\omega\\\) due to the boost.
As a small useful note for calculation, \\\([m]\_{+1}(n) = n^{m^n}\\\).

For the first value we'll squeeze it even smaller by using a special form.

\\\[\begin{eqnarray}
[B] &= \lambda x.x[+1]xx \\\\\\
&= S(\lambda x.x[+1]x)I \\\\\\
&= S(S(\lambda x.x[+1])I)I \\\\\\
&= S(S(SI(K[+1]))I)I \\\\\\
\end{eqnarray}\\\]

This uses only \\\(14\\\) combinators total but lets us start at the level of \\\(\omega\\\).

The climb gets regular for a while.
Jumps are larger and there isn't much thought about creative strategies.

| Expression | Size | Value |
|--:|:-:|:--|
| \\\([B] [2]\\\) | 20 | \\\(2^{2^{18}}=(2^{2^{2^4+2}}=2^{4\times 2^{2^4}}=[2]\_{+1}(2^4)=[2]\_{+1}^2(2)=[2]\_{+2}(2)\\\) |
| \\\([+1R] [2] [B]\\\) | 23 | \\\(>f_{\omega+1}(2)\\\) |
| \\\([+1R] [2] [+1:[B]]\\\) | 28 | \\\(>f_{\omega+2}(2)\\\) |
| \\\([+1R] [2] [+1:[+1:[B]]]\\\) | 33 | \\\(>f_{\omega+3}(2)\\\) |
| \\\([+\omega:[B]] [2]\\\) | 34 | \\\(>f_{\omega 2}(2)=f_{\omega+2}(2)\\\) |

We can extend the winning pattern as long as we want, and fill in the gaps.

| Expression | Size | Value |
|--:|:-:|:--|
| \\\([+1R] [2] [+\omega N:B]\\\) | \\\(23 + 14 N\\\) | \\\(>f_{\omega (1+N) + 1}(2)\\\) |
| \\\([+1R] ([A] [2]) [+\omega N:B]\\\) | \\\(26 + 14 N\\\) | \\\(>f_{\omega (1+N) + 1}(4)\\\) |
| \\\([+1R] [2] [+\omega N + 1:B]\\\) | \\\(28 + 14 N\\\) | \\\(>f_{\omega (1+N) + 2}(2)\\\) |
| \\\([+1R] ([A] [2]) [+\omega N + 1:B]\\\) | \\\(31 + 14 N\\\) | \\\(>f_{\omega (1+N) + 2}(4)\\\) |
| \\\([+1R] [2] [+\omega N + 2:B]\\\) | \\\(33 + 14 N\\\) | \\\(>f_{\omega (1+N) + 3}(2)\\\) |
| \\\([+1R] ([A] [2]) [+\omega N + 2:B]\\\) | \\\(36 + 14 N\\\) | \\\(>f_{\omega (1+N) + 3}(4)\\\) |

This will do until we can get a significantly larger ordinal.

</div>

## Schema up to \\\(\omega^\omega\\\)
{: #to-omega-omega-schema}

{% include collapser.markdown %}

<div>

I haven't found an implementation of \\\([+\omega]\\\) using fewer than \\\(20\\\) combinators, so we'll continue onward with the one presented earlier.
From here on a schema emerges:

\\\[\begin{eqnarray}
[+\alpha \omega] &= S(S(KS)(S(K(S(SI(K[+\alpha]))))K))(KI) \\\\\\
[+\alpha \omega R] &= S(S(KS)(SI(K[+\alpha])))K \\\\\\
[+\alpha \omega:f] &= S(S(SI(K[+\alpha]))(Kf))I \\\\\\
[\alpha \omega C] &= S(S(SI(K[+\alpha]))I)I
\end{eqnarray}\\\]

When \\\(\alpha = 1\\\), we get \\\([+\omega], [+\omega R], [+\omega:f], [B]\\\) as seen in the previous stage.

We can now map out the next stages up to \\\(\omega^\omega\\\) (but not reaching it).

| Expression | Size | Value |
|--:|:-:|:--|
| \\\([\omega^2 C] [2]\\\) | 33 | \\\(> f_{\omega^2}(2) =f_{\omega 2}(2) =f_{\omega+2}(2)\\\) |
| \\\([+1R] [2] [\omega^2 C]\\\) | 36 | \\\(> f_{\omega^2+1}(2)\\\) |
| \\\([+1R] ([A] [2]) [\omega^2 C]\\\) | 39 | \\\(> f_{\omega^2+1}(4)\\\) |
| \\\([+1R] [2] [+1:[\omega^2 C]]\\\) | 41 | \\\(> f_{\omega^2+2}(2)\\\) |
| \\\([+1R] ([A] [2]) [+1:[\omega^2 C]]\\\) | 44 | \\\(> f_{\omega^2+2}(4)\\\) |
| \\\([+1R] [2] [+2:[\omega^2 C]]\\\) | 46 | \\\(> f_{\omega^2+3}(2)\\\) |
| \\\([+1R] [2] [\omega^3 C]\\\) | 49 | \\\(> f_{\omega^3+1}(2)\\\) |
| \\\([+1R] ([A] [2]) [\omega^3 C]\\\) | 52 | \\\(> f_{\omega^3+1}(4)\\\) |
| \\\([+1R] [2] [+1:[\omega^3 C]]\\\) | 54 | \\\(> f_{\omega^3+2}(2)\\\) |

Already the pattern emerges:

| Expression | Size | Value |
|--:|:-:|:--|
| \\\([+1R] [2] [\omega^N C]\\\) | \\\(10 + 13N\\\) | \\\(> f_{\omega^N+1}(2)\\\) |
| \\\([+1R] ([A] [2]) [\omega^N C]\\\) | \\\(13 + 13N\\\) | \\\(> f_{\omega^N+1}(4)\\\) |
| \\\([+1R] [2] [+1:[\omega^N C]]\\\) | \\\(15 + 13N\\\) | \\\(> f_{\omega^N+2}(2)\\\) |
| \\\([+1R] ([A] [2]) [+1:[\omega^N C]]\\\) | \\\(18 + 13N\\\) | \\\(> f_{\omega^N+2}(4)\\\) |
| \\\([+1R] [2] [+2:[\omega^N C]]\\\) | \\\(20 + 13N\\\) | \\\(> f_{\omega^N+3}(2)\\\) |

</div>

## A new structure to truly reach \\\(\omega^\omega\\\)
{: #to-omega-omega-true}

{% include collapser.markdown %}

<div>

To reach \\\(\omega^\omega\\\), we need to properly create \\\([\times \omega]\\\).

<div style="overflow:auto;">
\\\[\begin{eqnarray}
[\times\omega] &= \lambda [+\alpha].[+\alpha \omega] \\\\\\
&= \lambda f.S(S(KS)(S(K(S(SI(Kf))))K))(KI) \\\\\\
&= S(\lambda f.S(S(KS)(S(K(S(SI(Kf))))K)))(K(KI)) \\\\\\
&= S(S(KS)(\lambda f.S(KS)(S(K(S(SI(Kf))))K)))(K(KI)) \\\\\\
&= S(S(KS)(S(K(S(KS)))(\lambda f.S(K(S(SI(Kf))))K)))(K(KI)) \\\\\\
&= S(S(KS)(S(K(S(KS)))(S(\lambda f.S(K(S(SI(Kf)))))(KK))))(K(KI)) \\\\\\
&= S(S(KS)(S(K(S(KS)))(S(S(KS)(\lambda f.K(S(SI(Kf)))))(KK))))(K(KI)) \\\\\\
&= S(S(KS)(S(K(S(KS)))(S(S(KS)(S(KK)(\lambda f.S(SI(Kf)))))(KK))))(K(KI)) \\\\\\
&= S(S(KS)(S(K(S(KS)))(S(S(KS)(S(KK)(S(KS)(\lambda f.SI(Kf)))))(KK))))(K(KI)) \\\\\\
&= S(S(KS)(S(K(S(KS)))(S(S(KS)(S(KK)(S(KS)(S(K(SI))(\lambda f.Kf)))))(KK))))(K(KI)) \\\\\\
&= S(S(KS)(S(K(S(KS)))(S(S(KS)(S(KK)(S(KS)(S(K(SI))K))))(KK))))(K(KI))
\end{eqnarray}\\\]
</div>

This uses \\\(29\\\) combinators.
I must admit, at this point it's rather annoying to do it by hand, and I don't think I'd have the patience for it at higher ordinals.
After this I use [my script](/assets/combinator/ski_tools.py) to do these simple but tedious tasks for me, which means I won't be showing every step of the way.

Now finally we create our first function with strength \\\(\omega^\omega\\\).

\\\[\begin{eqnarray}
[+\omega^\omega:f] &= \lambda x.x[\times\omega] [+1] f x \\\\\\
&= S(S(S(SI(K[\times\omega]))(K[+1]))(Kf))I
\end{eqnarray}\\\]

This adds \\\(45\\\) combinators.

\\\[\begin{eqnarray}
[+\omega^\omega] &= \lambda f.[+\omega^\omega:f] \\\\\\
&= \lambda f.S(S(S(SI(K[\times\omega]))(K[+1]))(Kf))I \\\\\\
&= S(S(KS)(S(K(S(S(SI(K[\times\omega]))(K[+1]))))K))(KI)
\end{eqnarray}\\\]

This uses \\\(51\\\) combinators.

\\\[\begin{eqnarray}
[+\omega^\omega R] &= \lambda x.\lambda f.x[\times\omega] [+1] f x \\\\\\
&= S(S(KS)(S(SI(K[\times\omega]))(K[+1])))K
\end{eqnarray}\\\]

This uses \\\(46\\\) combinators.

\\\[\begin{eqnarray}
[\omega^\omega C] &= S(S(S(SI(K[\times\omega]))(K[+1]))I)I
\end{eqnarray}\\\]

This uses \\\(45\\\) combinators, and lets us start at \\\(\omega^\omega\\\).

| Expression | Size | Value |
|--:|:-:|:--|
| \\\([+1R] [2] [\omega^\omega C]\\\) | \\\(54\\\) | \\\(> f_{\omega^\omega+1}(2)\\\) |
| \\\([+1R] ([A] [2]) [\omega^\omega C]\\\) | \\\(57\\\) | \\\(> f_{\omega^\omega+1}(4)\\\) |
| \\\([+1R] [2] [+1:[\omega^\omega C]]\\\) | \\\(59\\\) | \\\(> f_{\omega^\omega+2}(2)\\\) |
| \\\([+1R] ([A] [2]) [+1:[\omega^\omega C]]\\\) | \\\(62\\\) | \\\(> f_{\omega^\omega+2}(4)\\\) |
| \\\([+1R] [2] [+2:[\omega^\omega C]]\\\) | \\\(64\\\) | \\\(> f_{\omega^\omega+3}(2)\\\) |
| \\\([+1R] ([A] [2]) [+2:[\omega^\omega C]]\\\) | \\\(67\\\) | \\\(> f_{\omega^\omega+3}(4)\\\) |
| \\\([+1R] [2] [+\omega:[\omega^\omega C]]\\\) | \\\(68\\\) | \\\(> f_{\omega^\omega+\omega+1}(2)\\\) |
| \\\([+1R] ([A] [2]) [+\omega:[\omega^\omega C]]\\\) | \\\(71\\\) | \\\(> f_{\omega^\omega+\omega+1}(4)\\\) |
| \\\([+1R] [2] [+\omega+1:[\omega^\omega C]]\\\) | \\\(73\\\) | \\\(> f_{\omega^\omega+\omega+2}(2)\\\) |
| \\\([+1R] ([A] [2]) [+\omega+1:[\omega^\omega C]]\\\) | \\\(76\\\) | \\\(> f_{\omega^\omega+\omega+2}(4)\\\) |
| \\\([+1R] [2] [+\omega+2:[\omega^\omega C]]\\\) | \\\(78\\\) | \\\(> f_{\omega^\omega+\omega+3}(2)\\\) |
| \\\([+1R] [2] [+\omega^2:[\omega^\omega C]]\\\) | \\\(81\\\) | \\\(> f_{\omega^\omega+\omega^2+1}(2)\\\) |
| \\\([+1R] [2] ([\times\omega] [\omega^\omega C])\\\) | \\\(83\\\) | \\\(> f_{\omega^{\omega+1} +1}(2)\\\) |

</div>

## Reaching \\\(\omega^{\omega^\omega}\\\)
{: #omega-up-3}

{% include collapser.markdown %}

<div>

At this stage, I won't bother taking every individual record anymore.
Let's just see how many combinators we need for the next major ordinal.

Summary table up front:

| Expression | Size | Value |
|--:|:-:|:--|
| \\\([+1R] [2] [\omega^{\omega^\omega} C]\\\) | \\\(115\\\) | \\\(> f_{\omega^{\omega^\omega}+1}(2)\\\) |

<div style="overflow:auto;">
\\\[\begin{eqnarray}
[\times \alpha^\omega] &= \lambda f.\lambda g.\lambda x.x [\times \alpha] f g x \\\\\\
&= S(S(KS)(S(K(S(KS)))(S(S(KS)(S(KK)(S(KS)(S(K(S(SI(K[\times \alpha]))))K))))(KK))))(K(KI))
\end{eqnarray}\\\]
</div>

This adds \\\(31\\\) combinators.

<div style="overflow:auto;">
\\\[\begin{eqnarray}
[D] &= \lambda [\times \alpha].[\times \alpha^\omega] \\\\\\
&= \lambda f.S(S(KS)(S(K(S(KS)))(S(S(KS)(S(KK)(S(KS)(S(K(S(SI(Kf))))K))))(KK))))(K(KI)) \\\\\\
&= S(S(KS)(S(K(S(KS)))(S(K(S(K(S(KS)))))(S(S(KS)(S(K(S(KS)))(S(K(S(KK)))(S(K(S(KS)))(S(S(KS)(S(KK)(S(KS)(S(K(SI))K))))(KK))))))(K(KK))))))(K(K(KI)))
\end{eqnarray}\\\]
</div>

This uses \\\(59\\\) combinators.

\\\[\begin{eqnarray}
[\omega^{\omega^\omega} C] &= \lambda x.x [D] [\times \omega] [+1] x x \\\\\\
&= S(S(S(S(SI(K[D]))(K[\times \omega]))(K[+1]))I)I \\\\\\
\end{eqnarray}\\\]

This uses \\\(106\\\) combinators.

At this point, I want to point out that the constructions have gotten more complex.
When we built \\\([B] = \lambda x.x[+1]xx\\\), that inner expression used \\\(4\\\) terms.
Now we use \\\(6\\\) in the process of building \\\([\omega^{\omega^\omega} C]\\\).
They're also deeper - \\\([\times \alpha^\omega]\\\) was the first time we needed to bind \\\(3\\\) variables at once.

</div>

## Final combinator count reference
{: #combinator-table}

{% include collapser.markdown %}

<div>

This reference table should be useful for recalculating bounds if smaller implementations of functions are discovered.
Macros with bound functions will have their cost stated in terms of those bound functions' size, using the non-standard size operator `#`.
Values are formatted as inline code rather than math to allow easier copying.

| Name | Combinators used |
|--:|:--|
| `2` | `6 = 6` |
| `[A]` | `3 = 3` |
| `[A']` | `5 = 5` |
| `[+1 R]` | `3 = 3` |
| `[+1:f]` | `5 + #f = 2 + #[+1 R] + #f` |
| `[+1]` | `7 = 4 + #[+1R]` |
| `[+a w]` | `13 + #[+a]` |
| `[+a w R]` | `8 + #[+a]` |
| `[+a w:f]` | `7 + #[+a]` |
| `[a w C]` | `7 + #[+a]` |
| `[x w]` | `29 = 29` |
| `[+w^w:f]` | `45 = 9 + #[x w] + #[+1]` |
| `[+w^w]` | `51 = 15 + #[x w] + #[+1]` |
| `[+w^w R]` | `46 = 10 + #[x w] + #[+1]` |
| `[w^w C]` | `45 = 9 + #[x w] + #[+1]` |
| `[x a^w]` | `31 + #[x a]` |
| `[D]` | `59 = 59` |
| `[w^w^w C]` | `106 = 11 + #[D] + #[x w] + #[+1]` |

</div>

## The journey to \\\(\varepsilon_0\\\)
{: #journey-to-e0}

{% include collapser.markdown %}

<div>

### Reaching \\\(\varepsilon_0\\\) is difficult
{: #difficulty-e0}

{% include collapser.markdown %}

<div>

There's more?
Yes, there's more.
We'll now leave behind our simple ladder climbing constructions.

\\\(\varepsilon_0\\\) presents a significant challenge, since the previous constructions used are nowhere near strong enough to reach it.
Prototypical examples of systems reaching \\\(\varepsilon_0\\\) are
[Kirby-Paris hydras](https://googology.wikia.org/wiki/Kirby-Paris_hydra),
[Beklemishev's worms](https://googology.wikia.org/wiki/Beklemishev's_worms),
the [primitive sequence system](https://googology.wikia.org/wiki/Primitive_sequence_number),
[Goodstein sequences](https://googology.wikia.org/wiki/Goodstein_sequence),
and of course the ordinal itself in the fast-growing hierarchy or Hardy hierarchy.
These systems, other than the ordinal one, don't bother directly naming the smaller ordinals and building up - they set out some rules, and they happen to reach the level of \\\(\varepsilon_0\\\).

SKI and its more concrete twin [Unlambda](https://en.wikipedia.org/wiki/Unlambda) are Turing tarpits - encoding these data structures and working with them is notoriously difficult.
With Goodstein sequences, you work with a single number instead, however, the arithmetic and logic is more involved, and it's still not easy.

Nonetheless, I feel that my work would be incomplete here if I did not make any attempt to reach \\\(\varepsilon_0\\\).

I chose to make my attempt using Goodstein sequences, since doing a lot of arithmetic still looks easier than working with data structures.
While that may be my choice here, there is a close correspondence between all of those systems attaining \\\(\varepsilon_0\\\)
(Kirby-Paris hydras and the primitive sequence system are equivalent, even, and Goodstein sequences mirror ordinals up to \\\(\varepsilon_0\\\) with the Hardy hierarchy),
and since they all reach the same ordinal, they should actually be pretty much the same complexity.
The remaining sections here are dedicated to the implementation of Goodstein sequences in SKI.

</div>

### Planning out the program
{: #program-plan}

{% include collapser.markdown %}

<div>

The program is complex enough that it's worth writing it out in full in normal code first.

```py
def bump(a,b,n):
    if n < a:
        return n
    accum = 0
    index = 0
    while n:
        n, m = divmod(n, a)
        accum += b ** bump(a,b,index) * m
        index += 1
    return accum

def goodstein(n,f):
    result = 1 # can be changed
    base = 2
    while n:
        result += 1 # can be changed
        c = f(base)
        n = bump(base, c, n) - 1
        base = c
    return result
```

With \\\(f(x) = x + 1\\\), this implements the original Goodstein sequences.
That's great and all, but this is not in a form that's ready to convert to SKI, since it involves loops.
We'll want to convert all loops to recursion, and additionally not rely on any global namespace, since, of course, no such namespace will exist in SKI.

Also make note of the bits that are marked with "can be changed" - there will be certain expressions we can use there which will make the numbers larger (but not change the overall growth rate of \\\(\varepsilon_0\\\)) and make the SKI expressions shorter.
Remember, the easiest arithmetic operation for us to perform is exponentiation, since that's just direct application of the function.
We need to be careful not to touch anything else, since doing so could destroy the precise rules that allow Goodstein sequences to work.

```py
def _acc(bump, accumulate, index, a, b, n, o):
    m = n - o * a # enter new scope
    r = b ** bump(bump, accumulate, a, b, index) * m # enter new scope
    if o == 0:
        return r
    else:
        return r + accumulate(bump, accumulate, index+1, a, b, o, o // a)

def _bump(bump, accumulate, a, b, n):
    if n < a:
        return n
    else:
        return accumulate(bump, accumulate, 0, a, b, n, n // a)

def _mid(mid, bump, accumulate, f, base, n):
    if n == 0:
        return base
    else:
        c = f(base) # enter new scope
        return mid(mid, bump, accumulate, f, c,
                   bump(bump, accumulate, base, c, n) - 1)

def ski_friendly_goodstein(f, n):
    return _mid(_mid, _bump, _acc, f, 2, n)
```

Looking more manageable now.
We have a lot of argument reordering to play with too.
Note that every time we create a new local variable, this is marked with "enter new scope", since what we'll actually do is put an inner singleton function which takes the arguments so far and the new variable and evaluates the later expression.

</div>

### Arithmetic helpers
{: #arithmetic-helpers}

{% include collapser.markdown %}

<div>

The arithmetic operations used here are successor, predecessor, addition, subtraction, multiplication, division, and exponentiation - the full set of basic operations, pretty much.
I took the techniques from [the Wikipedia article on Church encoding](https://en.wikipedia.org/wiki/Church_encoding), though there may be other ways to implement these operations.

| Operator | Definition | As SKI | Size |
|--:|:-:|:-:|:--|
| `[1]` | `I` | `I` | `1 = 1` |
| `[T]` | `a,b -> a` | `K` | `1 = 1` |
| `[F] = [0]` | `a,b -> b` | `KI` | `2 = 2` |
| `[=0]` | `n -> n (K[F]) [T]` | `S(SI(K(K[F])))(K[T])` | `9 = 6 + #[F] + #[T]` |
| `[>=]` | `n,m -> [=0]([-R]nm)` | `S(K(S(K[=0])))[-R]` | `64 = 4 + #[=0] + #[-R]` |
| `[++]` | `n,f,x -> f(nfx)` | `S(S(KS)K)` | `5 = 5` |
| `[+]` | `m,n -> m[++]n` | `SI(K[++])` | `8 = 3 + #[++]` |
| `[*]` | `m,n,f,x -> m(nf)x` | `S(KS)K` | `4 = 4` |
| `[--]` | `n,f,x -> n(g,h -> h(gf))(Kx)I` | `S(S(KS)(S(K(S(KS)))(S(S(KS)(S(K(S(KS)))(S(K(S(KK)))(S(S(KS)K)(K(S(K(S(K(SI))))(S(K(S(KK)))(S(K(SI))K))))))))(K(KK)))))(K(K(KI)))` | `52 = 52` |
| `[zf]` | `p -> pair (p(KI)) ([++](p(KI)))` | `S(S(KS)(S(K(SI))(S(KK)(SI(K(KI))))))(S(KK)(S(K[++])(SI(K(KI)))))` | `31 = 26 + #[++]` |
| `[zp]` | `pair (KI) (KI)` | `S(SI(K(KI)))(K(KI))` | `9 = 9` |
| `[--]` | `n -> n [zf] [zp] K` | `S(S(SI(K[zf]))(K[zp]))(KK)` | `48 = 8 + #[zf] + #[zp]`
| `[-R]` | `m,n -> m[--]n` | `SI(K[--])` | `51 = 3 + #[--]` |
| `[dR]` | `r,m,n -> [>=]nm([++](rrm(m[--]n)))[0]` | `S(S(KS)(S(K(S(KS)))(S(K(S(S(KS)(S(K(S[>=]))K))))(S(K(S(K(S(K[++])))))(S(S(KS)(S(K(S(KS)))(S(K(S(KK)))(SII))))(K(SI(K[--]))))))))(K(K(K[0])))` | `168 = 49 + #[>=] + #[++] + #[--] + #[0]`
| `[/]` | `n,m -> (r -> rrmn)[dR]` | `S(S(KS)(S(K(S(S(KS)(S(K(S(SII)))K))))(S(KK)K)))(K(K[dR]))` | `191 = 23 + #[dR]` |

Exponentiation doesn't require any special operator so it's not listed here.
We avoid using the actual addition and subtraction operator, since we can usually save a few combinators by writing \\\(m[--]n\\\).

</div>

### Building Goodstein sequences
{: #building-goodstein}

{% include collapser.markdown %}

<div>

At a time like this, I really wish I had an optimizing SKI compiler.
Here I am doing my best to hand optimize it, ignoring numerous other branches in the tree of possibilities which could possibly lead to a more optimized version, just taking the smallest expression I can get for each part and then linking with its dependencies.

I am by no means claiming the final expression I get is optimal.
It is likely easy to squeeze it down smaller even with no new constructions just by inlining and optimizing.
I'm just here to say "it can be done in this many combinators".

Here's the plan before optimizing argument order by hand:

| Operator | Definition | As SKI | Size |
|--:|:-:|:-:|:--|
| `[c2]` | `u,c,i,a,b,n,o,m,r -> [=0]or(cuc([++]i)abo([/]oa)[++]r)` | | |
| `[c1]` | `u,c,i,a,b,n,o,m -> [c2]uciabnom([*](uucabi)m)` | | |
| `[c]` | `u,c,i,a,b,n,o -> [c1]uciabno([*]oa[--]n)` | | |
| `[u]` | `u,c,a,b,n -> [>=]na(cuc[0]abn([/]na))n` | | |
| `[m1]` | `m,u,c,f,b,n,d -> mmucfd([--](uucbdn))` | | |
| `[m]` | `m,u,c,f,b,n -> [=0]nb([m1]mucfbn(fb))` | | |
| `[E1:f]` | `m,n -> mm[u][c]f[2]n` | |
| `[E:f]` | `n -> [E1:f][m]n` | |

Unlike in previous examples, there's now cyclic dependencies.
This forces me to reorder `[u],[c],[c1],[c2]` all in one shot.
Similarly, `[m], [m1]` must be done together.
Here's after reordering the arguments, stripping out some parts, and actually building the expressions.

<div style="overflow:auto;">

| Operator | Definition | As SKI | Size |
|--:|:-:|:-:|:--|
| `[c2]` | `r,a,o,b,i,c,u -> [=0]or(coa([/]oa)b([++]i)cu[++]r)` | `S(S(KS)(S(KK)(S(KS)(S(K(S(KS)))(S(K(S(KK)))(S(K(S(KS)))(S(K(S(KK)))(S(K(S(KS)))(S(K(S(KK)))(S(K(S(KS)))(S(K(S(KK)))(S(K(S[=0]))K))))))))))))(S(K(S(S(KS)(S(K(S(KS)))(S(K(S(K(S(KS)))))(S(K(S(K(S(K(S(KS)))))))(S(K(S(K(S(K(S(K(S(KS)))))))))(S(S(KS)(S(K(S(KS)))(S(K(S(K(S(KS)))))(S(K(S(K(S(K(S(KS)))))))(S(K(S(K(S(K(S(K(S(KS)))))))))(S(S(KS)(S(K(S(KS)))(S(K(S(K(S(KS)))))(S(K(S(K(S(K(S(KS)))))))(S(S(KS)(S(K(S(KS)))(S(K(S(K(S(KS)))))(S(K(S(K(S(KK)))))(S(K(S(K(S(KS)))))(S(S(KS)(S(K(S(KS)))(S(K(S(KK)))(S(K(S(KS)))(S(S(KS)(S(K(S(KS)))(S(K(S(S(KS)(S(K(SI))K))))(S(KK)K))))(S(K(S(KK)))(S(K(S[/]))K)))))))(K(KK))))))))(K(K(K(S(KK)[++])))))))))(K(K(K(KI))))))))))(K(K(K(K(K(K[++]))))))))))))))(S(KK)(S(KK)(S(KK)(S(KK)(S(KK)K))))))` | `481 = 271 + #[=0] + #[/] + 2#[++]` |
| `[c]` | `n,a,o,b,i,c,u->  [c2]([*](uucabi)([*]oa[--]n))aobicu` | `S(S(KS)(S(K(S(KS)))(S(K(S(K(S(KS)))))(S(K(S(K(S(K(S(KS)))))))(S(K(S(K(S(K(S(K(S(KS)))))))))(S(K(S(K(S(K(S(K(S(K(S(KS)))))))))))(S(S(KS)(S(K(S(KS)))(S(K(S(K(S(KS)))))(S(K(S(K(S(K(S(KS)))))))(S(K(S(K(S(K(S(K(S(KS)))))))))(S(K(S(K(S(K(S(K(S(K(S(KS)))))))))))(S(S(KS)(S(K(S(KS)))(S(K(S(K(S(KS)))))(S(K(S(K(S(K(S(KS)))))))(S(K(S(K(S(K(S(K(S(KS)))))))))(S(K(S(K(S(K(S(K(S(K(S(KS)))))))))))(S(S(KS)(S(K(S(KS)))(S(K(S(K(S(KS)))))(S(K(S(K(S(K(S(KS)))))))(S(K(S(K(S(K(S(K(S(KS)))))))))(S(K(S(K(S(K(S(K(S(K(S(KS)))))))))))(S(S(KS)(S(K(S(KS)))(S(K(S(K(S(KS)))))(S(K(S(K(S(K(S(KS)))))))(S(K(S(K(S(K(S(K(S(KS)))))))))(S(K(S(K(S(K(S(K(S(K(S(KS)))))))))))(S(S(KS)(S(K(S(KS)))(S(K(S(K(S(KS)))))(S(K(S(K(S(K(S(KS)))))))(S(K(S(K(S(K(S(K(S(KS)))))))))(S(K(S(K(S(K(S(K(S(K(S(KS)))))))))))(S(K(S(K(S(K(S(K(S(K(S(K(S(K[c2])))))))))))))(S(K(S(S(KS)(S(KK)(S(KS)(S(K(S(KS)))(S(K(S(K(S(KS)))))(S(K(S(K(S(K(S(KS)))))))(S(K(S(K(S(K(S(K(S(K[*])))))))))(S(S(KS)(S(K(S(KS)))(S(K(S(KK)))(S(K(S(KS)))(S(K(S(K(S(KS)))))(S(S(KS)(S(KK)(S(KS)(S(K(S(KS)))(S(K(S(S(KS)(S(K(S(SII)))K))))(S(KK)K))))))(K(S(KK)K))))))))(K(K(S(KK)K)))))))))))))(S(K(S(K(S(KK)))))(S(K(S(K(S(KK)))))(S(K(S(K(S(KK)))))(S(K(S(K(S(KK)))))(S(K(S(S(KS)(S(S(KS)(S(K(S[*]))K))(K(K[--]))))))(S(KK)K))))))))))))))(K(S(KK)(S(KK)(S(KK)(S(KK)K))))))))))))(K(K(S(KK)(S(KK)(S(KK)K))))))))))))(K(K(K(S(KK)(S(KK)K))))))))))))(K(K(K(K(S(KK)K))))))))))))(K(K(K(K(KK))))))))))))(K(K(K(K(K(KI))))))` | `1062 = 525 + #[c2] + 2#[*] + #[--]` |
| `[u]` | `n,a,b,c,u -> [>=]na(cna([/]na)b[0]cu)n` | `S(S(KS)(S(K(S(KS)))(S(K(S(K(S(KS)))))(S(K(S(K(S(K(S(KS)))))))(S(S(KS)(S(K(S(KS)))(S(K(S(KK)))(S(K(S(KS)))(S(K(S(KK)))(S(K(S(KS)))(S(K(S(KK)))[>=])))))))(S(S(KS)(S(K(S(KS)))(S(K(S(K(S(KS)))))(S(S(KS)(S(K(S(KS)))(S(K(S(K(S(KS)))))(S(S(KS)(S(K(S(KS)))(S(K(S(KK)))(S(K(S(KS)))(S(S(KS)(S(K(S(KS)))(S(S(KS)(S(KK)(S(KS)(S(K(SI))K))))(KK))))(S(K(S(KK)))[/]))))))(K(KK))))))(K(K(K(K[0]))))))))(K(K(KI)))))))))(S(KK)(S(KK)(S(KK)K)))` | `419 = 162 + #[>=] + #[/] + #[0]` |
| `[m1]` | `n,u,c,m,d,b,f -> mfb([--](unbdcu))mcu` | `S(S(KS)(S(K(S(KS)))(S(K(S(K(S(KS)))))(S(K(S(K(S(K(S(KS)))))))(S(K(S(K(S(K(S(K(S(KS)))))))))(S(K(S(K(S(K(S(K(S(K(S(KS)))))))))))(S(S(KS)(S(K(S(KS)))(S(K(S(K(S(KS)))))(S(K(S(K(S(K(S(KS)))))))(S(K(S(K(S(K(S(K(S(KS)))))))))(S(K(S(K(S(K(S(K(S(K(S(KS)))))))))))(S(S(KS)(S(K(S(KS)))(S(K(S(K(S(KS)))))(S(K(S(K(S(K(S(KS)))))))(S(K(S(K(S(K(S(K(S(KS)))))))))(S(K(S(K(S(K(S(K(S(K(S(KS)))))))))))(S(K(S(K(S(K(S(S(KS)(S(KK)(S(KS)(S(K(S(KS)))(S(S(KS)(S(KK)S))(KK))))))))))))(S(K(S(K(S(KK)))))(S(K(S(K(S(K(S(K(S(KK)))))))))(S(K(S(K(S(K(S(K(S(K[--])))))))))(S(S(KS)(S(K(S(KS)))(S(K(S(K(S(KS)))))(S(K(S(K(S(K(S(KS)))))))(S(S(KS)(S(K(S(KS)))(S(K(S(KK)))(S(K(S(KS)))(S(K(S(K(S(KS)))))(S(S(KS)(S(K(S(KS)))(S(K(S(KK)))(S(K(S(KS)))(S(K(SI))K)))))(K(KK))))))))(K(K(S(KK)K))))))))(K(S(KK)(S(KK)K))))))))))))))(K(K(K(S(KK)(S(KK)K))))))))))))(K(K(S(KK)(S(KK)(S(KK)K))))))))))))(K(S(KK)(S(KK)(S(KK)(S(KK)K)))))` | `382 = 334 + #[--]` |
| `[m]` | `f,b,n,m,c,u -> [=0]nb([m1]nucm(fb)bf)` | `S(K(S(S(KS)(S(K(S(KS)))(S(K(S(KK)))(S(K(S(KS)))(S(K(S(KK)))(S(K(S(KS)))(S(K(S(KK)))(S(K(S[=0]))K))))))))))(S(S(KS)(S(K(S(KS)))(S(K(S(K(S(KS)))))(S(K(S(K(S(K(S(KS)))))))(S(K(S(K(S(K(S(K(S(KS)))))))))(S(S(KS)(S(K(S(KS)))(S(K(S(K(S(KS)))))(S(K(S(K(S(K(S(KS)))))))(S(K(S(K(S(K(S(K(S(KS)))))))))(S(K(S(K(S(S(KS)(S(K(S(KS)))(S(K(S(K(S(KS)))))(S(S(KS)(S(KK)(S(KS)(S(K(S(KS)))(S(S(KS)(S(KK)(S(KS)[m1])))(KK))))))(K(S(KK)K))))))))))(S(K(S(KK)))(S(K(S(KK)))(S(K(S(KK)))(S(KK)))))))))))(K(S(KK)(S(KK)(S(KK)K))))))))))(S(KK)(S(KK)(S(KK)(S(KK)K)))))` | `597 = 206 + #[=0] + #[m1]` |
| `[E1:f]` | `m,n -> mf[2]nm[c][u]` | `S(S(KS)(S(S(KS)(S(S(KS)(S(SI(Kf))(K[2])))K))(K(K[c]))))(K(K[u]))` | `1509 + #[f] = 22 + #[f] + #[2] + #[c] + #[u]` |
| `[E:f]` | `n -> [E1:f][m]n` | `[E1:f][m]` | `2106 + #[f] = #[E1:f] + #[m]` |

</div>

We've built a variant Goodstein sequence in SKI now, with a little over 2000 combinators.
I'm sure that number can go down, but I'm not interested in doing more work here.
Optimizing and compiling `[E:f]` by hand like this, even with the `ski_tools.py` script to help with the tedious task of binding variables, was already difficult.
Perhaps new work later around SKI compilers would help us get the combinator down and build stronger constructions.

</div>

### New records set with Goodstein sequences
{: #goodstein-records}

{% include collapser.markdown %}

<div>

The awkward thing about the Goodstein function \\\(G\\\) is it grows just slower than \\\(\varepsilon_0\\\) - \\\(G(2\uparrow \uparrow n) \approx f_{\varepsilon_0}(n)\\\).
This applies to \\\([E:A]\\\) as well.

| Expression | Size | Value |
|--:|:-:|:--|
| \\\([+1R] [2] [E:A]\\\) | \\\(2118\\\) | \\\(>f_{\varepsilon_0}(5)\\\) |
| \\\([+1R] ([A] [2]) [E:A]\\\) | \\\(2121\\\) | \\\(>f_{\varepsilon_0+1}(3)\\\) |
| \\\([+1R] ([A] [2]) ([\times \omega] [+\varepsilon_0] [A])\\\) | \\\(2169\\\) | \\\(>f_{\varepsilon_0 \omega+1}(3) = f_{\omega^{\varepsilon_0+1}+1}(3)\\\) |
| \\\([+1R] ([A] [2]) ([2] [\times \omega] [+\varepsilon_0] [A])\\\) | \\\(2175\\\) | \\\(>f_{\varepsilon_0 \omega^2+1}(3) = f_{\omega^{\varepsilon_0+2}+1}(3)\\\) |
| \\\([+1R] ([A] [2]) ([D] [\times \omega] [+\varepsilon_0] [A])\\\) | \\\(2199\\\) | \\\(>f_{\varepsilon_0 \omega^\omega+1}(3) = f_{\omega^{\varepsilon_0+\omega}+1}(3)\\\) |
| \\\([+1R] ([A] [2]) ([2] [D] [\times \omega] [+\varepsilon_0] [A])\\\) | \\\(2205\\\) | \\\(>f_{\varepsilon_0 \omega^{\omega^2}+1}(3) = f_{\omega^{\varepsilon_0+\omega^2}+1}(3)\\\) |

Let's follow what happens here.

In the first run of \\\([E:A]\\\), \\\(n\\\) starts at \\\(2\\\), and the base starts at \\\(2\\\).
The base gets bumped up to \\\(4\\\), so \\\(n\\\) goes to \\\(4\\\), then \\\(n\\\) decrements to \\\(3\\\).
After this \\\(n\\\) only decreases, but the base keeps blowing up - to \\\(A^4(2)\\\), actually.
Finally, that base is returned.

To place the final value after the second \\\([E:A]\\\), we'll want to know what ordinal it starts at.

\\\[\begin{eqnarray}
A^4(2) &= A^3(2^2) \\\\\\
&= A^2(2^{2^2\times 2}) \\\\\\
&= A^2(2^{2^3}) \\\\\\
&= A(2^{2^{2^3}\times 2^3}) \\\\\\
&= A(2^{2^{2^3+3}}) \\\\\\
&= 2^{2^{2^{2^3+3}}\times 2^{2^3+3}} \\\\\\
&= 2^{2^{2^{2^3+3}+2^3+3}} \\\\\\
&= 2^{2^{2^{2^{2^1+1}+2^1+1}+2^{2^1+1}+2^1+1}} \\\\\\
&\to \omega^{\omega^{\omega^{\omega^{\omega+1}+\omega+1}+\omega^{\omega+1}+\omega+1}} \\\\\\
&> \omega \uparrow \uparrow 5 \\\\\\
&= \varepsilon_0[6]
\end{eqnarray}\\\]

We got enough information already to place it between \\\(f_{\varepsilon_0}(5)\\\) and \\\(f_{\varepsilon_0}(6)\\\).
I assure you there is no mistake in the offset there, as Goodstein sequences follow the Hardy hierarchy and \\\(H_{\omega^\alpha}(n) \approx f_\alpha(n)\\\), so we must take off the first \\\(\omega\\\).

At these large ordinals, there's no point taking small steps.
We've already used over \\\(2000\\\) combinators, and it won't take that many more to go higher.

| Operator | Definition | As SKI | Size |
|--:|:-:|:-:|:--|
| `[E1]` | `m,f,n -> mf[2]nm[c][u]` | `S(S(KS)(S(K(S(KS)))(S(S(KS)(S(K(S(KS)))(S(S(KS)(S(K(S(KS)))(SS(K(K[2])))))(S(KK)K))))(K(K(K[c]))))))(K(K(K[u])))` | `1528 = 41 + #[2] + #[c] + #[u]` |
| `[+\varepsilon_0]` | `f,n -> [E1][m]fn` | `[E1][m]` | `2125 = #[E1] + #[m]` |

Using these, I named some more numbers.
It's just giving ideas; I know they're not optimal.

</div>

</div>