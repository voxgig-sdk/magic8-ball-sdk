# ProjectName SDK exists test

import pytest
from magic8ball_sdk import Magic8BallSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = Magic8BallSDK.test(None, None)
        assert testsdk is not None
