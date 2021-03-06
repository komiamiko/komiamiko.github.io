"""
Small script meant for use in an interactive shell,
which does the evolution of Amiko hydras.

Copyright (c) 2020 Komi Amiko

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
"""

class counter(object):
    def __init__(self, n):
        self.n = n
    def __call__(self):
        n = self.n
        self.n = n + 1
        return n

hydra_lt_cache = set()

def hydra_cmp(a, b):
    """
    Compare hydras.
    This method is based on Buchholz hydras,
    which I already explained can't be correct.
    It works fine for small hydras though.
    """
    global hydra_lt_cache
    if a is b:return 0
    if a is None:return -1
    if b is None:return 1
    if a._hash == b._hash:return 0
    if (a._hash, b._hash) in hydra_lt_cache:return -1
    if (b._hash, a._hash) in hydra_lt_cache:return 1
    def icmp(a, b):
        label_cmp = hydra_cmp(a.label, b.label)
        if label_cmp != 0:return label_cmp
        for ac, bc in zip(a.children, b.children):
            child_cmp = hydra_cmp(ac, bc)
            if child_cmp != 0:return child_cmp
        if len(a.children) < len(b.children):return -1
        if len(a.children) > len(b.children):return 1
        return 0
    cmp_result = icmp(a, b)
    if cmp_result < 0:
        hydra_lt_cache.add((a._hash, b._hash))
    if cmp_result > 0:
        hydra_lt_cache.add((b._hash, a._hash))
    return cmp_result

class hydra(object):
    def __init__(self, children=(), label=None):
        self.children = tuple(children)
        self.label = label
        self.init_size()
        self.init_hash()
    def init_hash(self):
        u = hash(self.children)
        v = hash(self.label)
        h0 = hash((1, u, v))
        h1 = hash((v, 1, u))
        self._hash = (h0, h1)
    def init_size(self):
        self._size = (len(self.label) if self.label is not None else 0) + \
                     sum(map(len, self.children)) + \
                     1
    def __str__(self, replace_ordinals=False):
        global small_ordinals_map
        istr = lambda ih:ih.__str__(replace_ordinals=replace_ordinals)
        if replace_ordinals and self in small_ordinals_map:
            return small_ordinals_map[self]
        label_str = '*' if self.label is None else istr(self.label)
        child_str = ''.join(map(istr, self.children))
        return '('+label_str+':'+child_str+')'
    def __repr__(self):
        return 'hydra('+repr(self.children)+','+repr(self.label)+')'
    def __hash__(self):
        return hash(self._hash)
    def __len__(self):
        return self._size
    def __eq__(self, other):
        return hydra_cmp(self, other) == 0
    def __ne__(self, other):
        return hydra_cmp(self, other) != 0
    def __lt__(self, other):
        return hydra_cmp(self, other) < 0
    def __le__(self, other):
        return hydra_cmp(self, other) <= 0
    def __gt__(self, other):
        return hydra_cmp(self, other) > 0
    def __ge__(self, other):
        return hydra_cmp(self, other) >= 0
    def is_valid(self, is_root=True):
        if self.label is None:
            return is_root
        else:
            if not is_valid(self.label):
                return False
        return all(is_valid(c, is_root=False) for c in self.children)

ZERO = hydra() # (*:)
ONE = hydra((hydra(label=ZERO),))
OMEGA = hydra((hydra((hydra(label=ZERO),), label=ZERO),))

small_ordinals_map = {
    ZERO: '0',
    ONE: '1',
    OMEGA: 'w'}

def reduce_outer(a, nf, skip_nz=False):
    """
    S function. Pass nf as a function which generates the next N.
    """
    b = a.children[-1]
    c = b.label
    if c == ZERO or skip_nz: # rule 1
        line = [a, b]
        d = b
        while d.children and (d.children[-1].label == ZERO or skip_nz):
            d = d.children[-1]
            line.append(d)
            skip_nz = d.label != ZERO
        if not d.children: # rule 1.1
            e = line[-2]
            e = hydra(e.children[:-1], e.label)
            if len(line) == 2:
                return e
            f = line[-3]
            n = nf()
            f = hydra(f.children[:-1] + (e,)*(n+1), f.label)
            for g in line[:-3][::-1]:
                f = hydra(g.children[:-1] + (f,), g.label)
            return f
        else: # rule 1.2
            z = lambda y:hydra(tuple(x for x in y.children if x != ZERO), y.label)
            for i, e in list(enumerate(line[:-1]))[::-1]:
                if z(e) < z(d):break
                if e.label > ZERO:
                    e = hydra(e.children[-1:], e.label)
                    break
                i -= 1
            if i < 0:
                i = 0
                e = hydra(e.children[-1:], e.label)
            dp = hydra(d.children)
            ep = reduce_outer(dp, nf)
            ep = hydra(tuple(c for c in ep.children if c.label != ZERO) + \
                       tuple(c for c in e.children if c.label == ZERO), d.label)
            transforms = []
            def repl(w):
                def irepl(v):
                    return hydra(w.children[:-1] + (v,), w.label)
                return irepl
            w = ep
            for _ in range(len(line) - 1 - i):
                transforms.append(repl(w))
                w = w.children[-1]
            f = hydra((), ZERO)
            n = nf()
            for _ in range(n):
                for t in transforms[::-1]:
                    f = t(f)
            for w in line[:-1][::-1]:
                f = hydra(w.children[:-1] + (f,), w.label)
            return f
    else: # rule 2
        line = [a, b]
        d = b
        while d.children and d.children[-1].label != ZERO:
            d = d.children[-1]
            line.append(d)
        if d.children: # rule 2.1
            return reduce_outer(a, nf, skip_nz=True)
        else: # rule 2.2
            e = d.label
            for i, f in list(enumerate(line[:-1]))[::-1]:
                if f.label < d.label:break
            g = f.label
            h = reduce_outer(e, nf)
            fp = hydra(f.children, h)
            transforms = []
            def repl(w):
                def irepl(v):
                    return hydra(w.children[:-1] + (v,), w.label)
                return irepl
            w = fp
            for _ in range(len(line) - 1 - i):
                transforms.append(repl(w))
                w = w.children[-1]
            n = nf()
            j = hydra((), ZERO)
            for _ in range(n):
                for t in transforms[::-1]:
                    j = t(j)
            for w in line[:-1][::-1]:
                j = hydra(w.children[:-1] + (j,), w.label)
            return j

def parse_hydra(stream):
    """
    Parse a single hydra from a character stream.
    """
    global ZERO, ONE
    c = next(stream)
    if c != '(':raise ValueError('hydra must start with (')
    stack = [[]]
    while True:
        c = next(stream)
        if c == ':':
            pass
        elif c == '*':
            stack[-1].append(None)
        elif c == '0':
            stack[-1].append(ZERO)
        elif c == '1':
            stack[-1].append(ONE)
        elif c == 'w':
            stack[-1].append(OMEGA)
        elif c == '(':
            stack.append([])
        elif c == ')':
            bits = stack.pop()
            h = hydra(tuple(bits[1:]), bits[0])
            if not stack:return h
            stack[-1].append(h)

def pprint_hydra(h):
    """
    Stringify hydras prettified.
    """
    if h is None:return '*'
    if h == ZERO:return '(*:)'
    import textwrap
    s_label = pprint_hydra(h.label)
    s_children = '\n'.join(pprint_hydra(c) for c in h.children).split('\n')
    result = '(' + s_label + '\n:'
    if s_children:
        result += s_children[0] + '\n' + \
                  textwrap.indent('\n'.join(s_children[1:]+['']), ' ') + ')'
    else:
        result += ')'
    return result

def main():
    """
    Main function, where you get to watch hydras evolve.
    """
    yes_set = {'y','yes','1','true'}
    print('Enable long output of hydras? (Y/N)')
    use_pprint_hydra = input().lower() in yes_set
    print('Replace known small hydras with their ordinals?')
    replace_ordinals = input().lower() in yes_set
    print('Do a single step by entering `N A` ex.\n3 (*:((*:):)((*:):))\n')
    s = input()
    while s:
        n, h = s.split()
        n = int(n)
        nf = counter(n)
        h = parse_hydra(iter(h))
        h = reduce_outer(h, nf)
        n = nf.n
        print(n)
        if use_pprint_hydra:
            print(pprint_hydra(h))
        else:
            print(h.__str__(replace_ordinals))
        s = input()

if __name__ == '__main__':
    main()
