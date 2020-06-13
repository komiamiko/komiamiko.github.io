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
For example, starting with \\\(SSS(SI)S\\\), here is a the order of steps until it is maximally beta-reduced:

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

The commonly named \\\(\Xi\\\), for whatever reason, is \\\(\Xi_1\\\).

I only analyze \\\(\Xi_0\\\), but keep in mind since \\\(\Xi_1(n) \ge \Xi_0(n)\\\), these lower bounds are valid as well for \\\(\Xi_1\\\), they just aren't particularly strong bounds for \\\(\Xi_1\\\).

</div>

# Summary of results
{: #summary}

{% include collapser.markdown %}

<div>

Here are the existing bounds my methods were unable to beat:

You can read all my rough work and explanations below, but if you just want the best numbers I could get, here's the table:

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

Also, when we eventually get to creating the \\\(\Xi_0\\\) lower bounds, we can fill in gaps by doing ex. \\\([n]KK, [n](SK)K, [n](S(SK))K, \cdots\\\).
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

This uses \\\(29\\\) combinators.
I must admit, at this point it's rather annoying to do it by hand, and I don't think I'd have the patience for it at higher ordinals.
After this I use [my script](LINK TODO) to do these simple but tedious tasks for me.

Now finally we create our first function with strength \\\(\omega^\omega\\\).

\\\[\begin{eqnarray}
[+\omega^\omega] &= \lambda f.\lambda x.x \\\\\\
\end{eqnarray}\\\]

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

</div>

</div>