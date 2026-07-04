# frozen_string_literal: true

# Typed models for the Magic8Ball SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Biased entity data model.
#
# @!attribute [rw] locale
#   @return [String]
#
# @!attribute [rw] lucky
#   @return [Boolean]
#
# @!attribute [rw] question
#   @return [String]
#
# @!attribute [rw] reading
#   @return [String]
#
# @!attribute [rw] sentiment
#   @return [Hash]
Biased = Struct.new(
  :locale,
  :lucky,
  :question,
  :reading,
  :sentiment,
  keyword_init: true
)

# Match filter for Biased#load (any subset of Biased fields).
#
# @!attribute [rw] locale
#   @return [String, nil]
#
# @!attribute [rw] lucky
#   @return [Boolean, nil]
#
# @!attribute [rw] question
#   @return [String, nil]
#
# @!attribute [rw] reading
#   @return [String, nil]
#
# @!attribute [rw] sentiment
#   @return [Hash, nil]
BiasedLoadMatch = Struct.new(
  :locale,
  :lucky,
  :question,
  :reading,
  :sentiment,
  keyword_init: true
)

# Match filter for Biased#create (any subset of Biased fields).
#
# @!attribute [rw] locale
#   @return [String, nil]
#
# @!attribute [rw] lucky
#   @return [Boolean, nil]
#
# @!attribute [rw] question
#   @return [String, nil]
#
# @!attribute [rw] reading
#   @return [String, nil]
#
# @!attribute [rw] sentiment
#   @return [Hash, nil]
BiasedCreateData = Struct.new(
  :locale,
  :lucky,
  :question,
  :reading,
  :sentiment,
  keyword_init: true
)

# Category entity data model.
#
# @!attribute [rw] locale
#   @return [String]
#
# @!attribute [rw] negative
#   @return [Array]
#
# @!attribute [rw] neutral
#   @return [Array]
#
# @!attribute [rw] positive
#   @return [Array]
Category = Struct.new(
  :locale,
  :negative,
  :neutral,
  :positive,
  keyword_init: true
)

# Match filter for Category#list (any subset of Category fields).
#
# @!attribute [rw] locale
#   @return [String, nil]
#
# @!attribute [rw] negative
#   @return [Array, nil]
#
# @!attribute [rw] neutral
#   @return [Array, nil]
#
# @!attribute [rw] positive
#   @return [Array, nil]
CategoryListMatch = Struct.new(
  :locale,
  :negative,
  :neutral,
  :positive,
  keyword_init: true
)

# CategoryFortune entity data model.
#
# @!attribute [rw] category
#   @return [String]
#
# @!attribute [rw] locale
#   @return [String]
#
# @!attribute [rw] reading
#   @return [String]
CategoryFortune = Struct.new(
  :category,
  :locale,
  :reading,
  keyword_init: true
)

# Request payload for CategoryFortune#load.
#
# @!attribute [rw] category
#   @return [String]
CategoryFortuneLoadMatch = Struct.new(
  :category,
  keyword_init: true
)

# RandomFortune entity data model.
class RandomFortune
end

