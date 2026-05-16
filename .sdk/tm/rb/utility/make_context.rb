# Magic8Ball SDK utility: make_context
require_relative '../core/context'
module Magic8BallUtilities
  MakeContext = ->(ctxmap, basectx) {
    Magic8BallContext.new(ctxmap, basectx)
  }
end
