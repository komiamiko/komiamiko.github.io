"""
Little library meant for use in an interactive shell,
which speeds up work in SKI and other combinator calculi.
"""

rules = {
    'I': (lambda x:x),
    'K': (lambda x,y:x),
    'S': (lambda x,y,z:x(z)(y(z)))
    }

class expr(object):
    """
    Represents a combinator expression.
    The head is the first combinator, and always exists.
    This is stored as just the string symbol.
    Later expressions are stored in a list.
    This class may be nested as needed.
    """
    def __init__(self, head, calls=None):
        # store head
        self.head = head
        # convert calls
        if calls is None:calls = ()
        if not isinstance(calls, tuple):calls = tuple(calls)
        # store calls
        self.calls = calls
        # compute stats
        involves = {head}
        size = 1
        for iexpr in calls:
            involves |= iexpr.involves
            size += iexpr.size
        # store stats
        self.involves = involves
        self.size = size
        # store hash
        self._hash = hash((self.head, self.calls))
    def __eq__(self, other):
        return hasattr(other, '_hash') and self._hash == other._hash
    def __hash__(self):
        return self._hash
    def __len__(self):
        return self.size
    def __call__(self, *others):
        return expr(self.head, self.calls + others)
    def __repr__(self):
        return 'expr(' + repr(self.head) + \
               ((', ' + repr(self.calls)) if self.calls else '') + ')'
    def __str__(self):
        bits = [self.head]
        for iexpr in self.calls:
            use_brackets = len(iexpr) > 1
            if use_brackets:
                bits.append('(')
            bits.append(str(iexpr))
            if use_brackets:
                bits.append(')')
        return ''.join(bits)
    def reduce(self, outer=True):
        """
        Recursively reduce until no more reduction is possible.
        Warning: may continue infinitely for certain expressions.
        """
        import inspect
        current = self
        while True:
            # try applying rule at this head
            if current.head in rules:
                rule_func = rules[current.head]
                num_params = len(inspect.signature(rule_func).parameters)
                if len(current.calls) >= num_params:
                    tail = current.calls[num_params:]
                    current = rule_func(*current.calls[:num_params])
                    current = expr(current.head, current.calls + tail)
                    continue
            # try applying rule recursively at each call
            for index, iexpr in enumerate(current.calls):
                mod_iexpr = iexpr.reduce(outer=False)
                if mod_iexpr is not None:
                    current = expr(current.head, current.calls[:index] + (mod_iexpr,) + current.calls[index+1:])
                    continue
            # no reduction possible, stop here
            break
        if current == self:
            return current if outer else None
        return current
    def bind(self, *symbols):
        """
        Bind a previously free variable and produce a new expression.
        Basic optimizations are done along the way,
        but there is no guarantee of absolute optimality in any sense.
        """
        if len(symbols) != 1:
            current = self
            for symbol in symbols:
                current = current.bind(symbol)
            return current
        symbol = symbols[0]
        dot = expr(symbol)
        # degenerate case: lambda x.x -> I
        if self == dot:
            return I
        # degenerate case: lambda x.y -> Ky
        if symbol not in self.involves:
            return K(self)
        # it is guaranteed to have size >= 2
        # separate last and everything else
        rem = expr(self.head, self.calls[:-1])
        last = self.calls[-1]
        # optimized case: lambda x.yx -> y
        if symbol not in rem.involves and last == dot:
            return rem
        # general algorithm using recursion
        return S(rem.bind(symbol))(last.bind(symbol))
    def subs(self, match, repl):
        """
        Substitute all occurrences of the sub-expression
        match with repl.
        Will not recurse within a sub-expression where replacement
        has already been performed.
        """
        raise NotImplementedError()
    @staticmethod
    def parse(it):
        """
        Parse from string or iterator.
        """
        if isinstance(it, str):it = iter(it)
        stack = [[]]
        for c in it:
            if c == '(':
                stack.append([])
            elif c == ')':
                if len(stack) <= 1:
                    raise ValueError('Unmatched right bracket in expression')
                part = stack.pop()
                ex = expr(part[0].head, part[0].calls + tuple(part[1:]))
                stack[-1].append(ex)
            else:
                stack[-1].append(expr(c))
        if len(stack) > 1:
            raise ValueError('Unmatched left bracket in expression')
        part = stack.pop()
        ex = expr(part[0].head, part[0].calls + tuple(part[1:]))
        return ex

S = expr('S')
K = expr('K')
I = expr('I')
