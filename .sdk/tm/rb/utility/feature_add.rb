# Magic8Ball SDK utility: feature_add
module Magic8BallUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
