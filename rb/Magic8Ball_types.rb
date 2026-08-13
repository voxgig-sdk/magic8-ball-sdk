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
# @!attribute [rw] calculation
#   @return [Array]
#
# @!attribute [rw] comparative
#   @return [Float]
#
# @!attribute [rw] locale
#   @return [String, nil]
#
# @!attribute [rw] lucky
#   @return [Boolean, nil]
#
# @!attribute [rw] negative
#   @return [Array]
#
# @!attribute [rw] positive
#   @return [Array]
#
# @!attribute [rw] question
#   @return [String]
#
# @!attribute [rw] score
#   @return [Float]
#
# @!attribute [rw] tokens
#   @return [Array]
#
# @!attribute [rw] words
#   @return [Array]
Biased = Struct.new(
  :calculation,
  :comparative,
  :locale,
  :lucky,
  :negative,
  :positive,
  :question,
  :score,
  :tokens,
  :words,
  keyword_init: true
)

# Request payload for Biased#load.
#
# @!attribute [rw] calculation
#   @return [Array, nil]
#
# @!attribute [rw] comparative
#   @return [Float, nil]
#
# @!attribute [rw] locale
#   @return [String, nil]
#
# @!attribute [rw] lucky
#   @return [Boolean, nil]
#
# @!attribute [rw] negative
#   @return [Array, nil]
#
# @!attribute [rw] positive
#   @return [Array, nil]
#
# @!attribute [rw] question
#   @return [String, nil]
#
# @!attribute [rw] score
#   @return [Float, nil]
#
# @!attribute [rw] tokens
#   @return [Array, nil]
#
# @!attribute [rw] words
#   @return [Array, nil]
BiasedLoadMatch = Struct.new(
  :calculation,
  :comparative,
  :locale,
  :lucky,
  :negative,
  :positive,
  :question,
  :score,
  :tokens,
  :words,
  keyword_init: true
)

# Request payload for Biased#create.
#
# @!attribute [rw] calculation
#   @return [Array]
#
# @!attribute [rw] comparative
#   @return [Float]
#
# @!attribute [rw] locale
#   @return [String, nil]
#
# @!attribute [rw] lucky
#   @return [Boolean, nil]
#
# @!attribute [rw] negative
#   @return [Array]
#
# @!attribute [rw] positive
#   @return [Array]
#
# @!attribute [rw] question
#   @return [String]
#
# @!attribute [rw] score
#   @return [Float]
#
# @!attribute [rw] tokens
#   @return [Array]
#
# @!attribute [rw] words
#   @return [Array]
BiasedCreateData = Struct.new(
  :calculation,
  :comparative,
  :locale,
  :lucky,
  :negative,
  :positive,
  :question,
  :score,
  :tokens,
  :words,
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

# Request payload for Category#list.
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
#   @return [String, nil]
CategoryFortuneLoadMatch = Struct.new(
  :category,
  keyword_init: true
)

# RandomFortune entity data model.
class RandomFortune
end

