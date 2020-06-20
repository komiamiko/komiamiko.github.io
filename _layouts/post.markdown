---
layout: default
---

<div class="post">

  <header class="post-header">
    <h1 class="post-title"><span style="font-size:120%;">{{ page.title }}</span></h1>
    <p class="post-meta">Posted {{ page.date | date: "%Y-%m-%d" }}{% if page.author %} by {{ page.author }}{% endif %}{% if page.meta %} • {{ page.meta }}{% endif %}</p>
  </header>

  <article class="post-content">
    {{ content }}
  </article>

</div>
