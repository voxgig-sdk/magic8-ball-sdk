# Magic8Ball SDK utility: prepare_body
module Magic8BallUtilities
  PrepareBody = ->(ctx) {
    ctx.op.input == "data" ? ctx.utility.transform_request.call(ctx) : nil
  }
end
