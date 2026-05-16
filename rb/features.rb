# Magic8Ball SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module Magic8BallFeatures
  def self.make_feature(name)
    case name
    when "base"
      Magic8BallBaseFeature.new
    when "test"
      Magic8BallTestFeature.new
    else
      Magic8BallBaseFeature.new
    end
  end
end
