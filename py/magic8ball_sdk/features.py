# Magic8Ball SDK feature factory

from magic8ball_sdk.feature.base_feature import Magic8BallBaseFeature
from magic8ball_sdk.feature.test_feature import Magic8BallTestFeature


_FEATURES = {
    "base": lambda: Magic8BallBaseFeature(),
    "test": lambda: Magic8BallTestFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
