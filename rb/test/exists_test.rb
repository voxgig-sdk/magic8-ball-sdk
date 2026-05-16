# Magic8Ball SDK exists test

require "minitest/autorun"
require_relative "../Magic8Ball_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = Magic8BallSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
