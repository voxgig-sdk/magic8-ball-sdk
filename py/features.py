# Magic8Ball SDK feature factory

from feature.base_feature import Magic8BallBaseFeature
from feature.test_feature import Magic8BallTestFeature


def _make_feature(name):
    features = {
        "base": lambda: Magic8BallBaseFeature(),
        "test": lambda: Magic8BallTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
