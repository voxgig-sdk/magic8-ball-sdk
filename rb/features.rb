# Magic8Ball SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module Magic8BallFeatures
  def self.make_feature(name)
    case name
    when "base"
      Magic8BallBaseFeature.new
    when "ratelimit"
      Magic8BallRatelimitFeature.new
    when "retry"
      Magic8BallRetryFeature.new
    when "test"
      Magic8BallTestFeature.new
    when "timeout"
      Magic8BallTimeoutFeature.new
    else
      Magic8BallBaseFeature.new
    end
  end
end
