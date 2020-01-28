---
layout: post
title: "A Case For 3-Way Comparison"
date: 2020-01-28 04:00:00
categories: programming design
---

{::options parse_block_html="true" /}

# An issue with exponential runtime
{: #introduction-issue}

{% include collapser.markdown %}

<div>

I can't be working on every project at once,
and today I turned my attention to
[my ordinal library](https://github.com/komiamiko/doodads/tree/master/transfinite).
For over a month, no meaningful progress on the library was made,
and I had left it off with a massive performance issue.
I've tracked down the source and resolved it now,
so I get to talk about the issue.

Here is a Python program that manually compares 2 sequences by lexicographic order.

```py
def less_than_lexicographic(A, B):
  for x, y in zip(A, B):
    if x < y:return True
    if x > y:return False
  return len(A) < len(B)
```

It is a slightly contrived example, but bear with it for now.
It looks quite innocent, doesn't it?
What could possibly go wrong?

Notice that it is possible that `x` will be compared to `y` twice - first in the line with `x < y` and then in `x > y`.
This will happen quite often, actually.
If `x` and `y` are primitive types, we will be done here, and all is good.
If `x` and `y` are themselves sequences, now the work will be doubled at every level.
Usually this is acceptable, but when we work with deeply nested sequences, it will be a problem.

See, if the cost doubles at every level of depth,
then the runtime will be *O(2^N)*, or worse.
Exponential runtime is rather undesirable here.

</div>

# What is a 3-way comparison?
{: #introduction-3-way-definition}

{% include collapser.markdown %}

<div>

The confusingly named "3-way comparison" means a kind of comparison
which can return 1 of 3 results: "less than", "equal to", or "greater than".
It reflects the trichotomy of total orders,
as only 1 of those 3 can be true for a given pair.
It has nothing to do with comparing 3 values at once, which its name might suggest.

As typically implemented, it is assigned to
the "spaceship operator" `<=>` (C++20),
a special keyword like `cmp` (Perl),
or a conventionally named method like `compareTo` (Java).

It returns
a negative number (conventionally -1) to signal that the left value is less than the right value,
0 to signal that the left value is equal to the right value,
and a positive number (conventionally 1) to signal that the left value is greater than the right value.

One way to remember this is that `x <=> y` will match the sign of `x - y`.
It's okay that not every type can actually be subtracted;
just knowing what it does for numbers is good enough.

Alternatively, you can remember that `x @ y` is equivalent to `(x <=> y) @ 0`,
where `@` should be replaced by any of `==`, `!=`, `<`, `<=`, `>`, or `>=`.

</div>

# How 3-way comparisons improve performance
{: #comparison-performance}

{% include collapser.markdown %}

<div>

Let us revisit our lexicographic comparison example from earlier.
This time instead of implementing just `<`, we will implement `<=>`.
Note that Python does not actually have a `<=>` operator,
so this is only to demonstrate the concept.

```py
def compare_lexicographic(A, B):
  for x, y in zip(A, B):
    part = x <=> y
    if part != 0:
      return part
  return len(A) <=> len(B)
```

Now `x` and `y` will only be compared once,
so we avoid the exponentially bad performance issue.

Note this does not mean the runtime will be *O(1^N) = O(1)*.
Instead it will be *O(N)*.
You can verify this makes sense intuitively,
or you can consult the [Master Theorem](https://en.wikipedia.org/wiki/Master_theorem_%28analysis_of_algorithms%29).

As it turns out, this kind of multiple comparison issue is exactly
what caused my ordinal library's comparisons to become so slow,
and moving away from regular comparisons toward 3-way comparisons
is what fixed it all.

</div>

# Interoperability of regular comparison and 3-way comparison
{: #comparison-interoperability}

{% include collapser.markdown %}

<div>

Before I go on to present why you might want or not want 3-way comparison,
I will briefly go over how to go between them.

Assuming 3-way comparison is already implemented,
is is already possible to extract necessary information for each of the 6 regular comparison operators,
for example, `x <= y` can be implemented as `(x <=> y) <= 0`.

If all regular comparison operators are already implemented, 2 of them will provide sufficient information to distinguish all cases.
Actually, if the types are the same, 1 may be enough.
For example, using only `<`, `x <=> y` would evaluate to `0` when `x < y` is false and `y < x` is also false.

Both systems provide the same amount of information,
so there is no loss of capability in your program regardless of which you choose.

</div>

# Reasons for and against using 3-way comparison
{: #comparison-reasons-for-against}

{% include collapser.markdown %}

<div>

The primary reason against 3-way comparison is that it is confusing.
It takes more thought to use and, unlike the regular comparison operators
which most people are familiar with, the 3-way comparison is something foreign that needs to be learned.
The confusion makes it harder to write code and makes it much more likely there will be mistakes.

I admit, I got confused by it too, and it took a long time for me to become accustomed with it.
Helping programmers write good error-free code is certainly a valuable benefit.
It's a good reason to use regular comparisons, and about the only one that I would acknowledge.

One might say that regular comparisons are standalone,
while the 3-way comparison cannot do everything without help from the regular comparisons at the end.
Well, it doesn't matter, because their usage isn't mutually exclusive.
3-way comparisons supplement regular comparisons.

One might argue that 3-way comparisons are more complex to implement and more costly to invoke.
About the implementation complexity - implementing the 3-way comparison is not harder than implementing both equality and the "less than" operator.
As for cost, 3-way comparisons are usually only marginally more expensive than a fused equality and "less than" check,
and a decent optimizing compiler will strip away any inlined dead code and make the remaining code run faster.
One might argue that an optimizing compiler can also optimize the regular comparison operators,
but that involves more "smart" high level optimizations involving assumptions that optimizing compilers typically cannot make.
The 3-way comparison already offers better asymptotic bounds,
and can get better with just the dumber optimizations.

One can also argue 3-way comparisons force programmers to define total orderings even where it doesn't make sense.
Though, nobody is forcing you to implement the 3-way comparison or a total ordering, so this will not be an issue.
Alternatively, another signal value or enum could be used to indicate the values are not comparable,
though we would lose the nice mathematical properties of the 3-way comparison as typically implemented,
with a negative, zero, or positive result.

In defense of the 3-way comparison, it costs little extra to implement and has better performance guarantees.
I believe these benefits make it worth using, even if it is more confusing.
I argue that it should be seen as a default,
not just as a style guideline for individual programmers,
but as a global design pattern,
that when the application presents a choice to use 3-way comparisons you should choose the 3-way comparison,
and programming languages should do their part to encourage this good practice.

</div>

# Adoption of the 3-way comparison
{: #adoption-by-languages}

{% include collapser.markdown %}

<div>

Python used to have 3-way comparison as the default, but after
[PEP 207](https://www.python.org/dev/peps/pep-0207/),
3-way comparison has been replaced with "rich comparisons".
I do find the new capabilities useful and using comparison keys is certainly nice,
but I would have preferred they keep the 3-way comparison and the API that was built around it.

C++ has 3-way comparison as a language feature
[as of C++20](https://en.cppreference.com/w/cpp/language/operator_comparison),
and its "spaceship operator" `<=>` is considered the new "primary" comparison operator,
from which the "secondary" operators like `<` will automatically be derived.

Java has had 3-way comparison for quite some time,
[provided by the Comparable interface](https://docs.oracle.com/javase/10/docs/api/java/lang/Comparable.html)
and [the Comparator class](https://docs.oracle.com/javase/10/docs/api/java/util/Comparator.html),
and it's been the standard way of comparing objects.
It's a bit ugly in code but it works to get people to use it.
As a nice bonus, the regular API always accepts comparators instead, so you can use custom orderings in place of whatever the class normally defines.

Rust's `cmp` and `partial_cmp` use 3-way comparisons,
as a quick look at its
[Ordering enum](https://doc.rust-lang.org/std/cmp/enum.Ordering.html)
would show.
Using an enum instead of numeric results fits Rust's design well.

At the time of writing,
[Wikipedia's list of languages with the spaceship operator](https://en.wikipedia.org/wiki/Three-way_comparison#"Spaceship_operator")
also includes Perl, Ruby, Groovy, and PHP,
though I have not read their respective documentation to be more knowledgeable for those languages.

I've now presented all the relevant information and my opinion, so I'm done here.
Enjoy your day.

</div>
