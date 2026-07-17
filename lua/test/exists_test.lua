-- Magic8Ball SDK exists test

local sdk = require("magic8-ball_sdk")

describe("Magic8BallSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
