# Magic8Ball SDK utility: make_context

from core.context import Magic8BallContext


def make_context_util(ctxmap, basectx):
    return Magic8BallContext(ctxmap, basectx)
