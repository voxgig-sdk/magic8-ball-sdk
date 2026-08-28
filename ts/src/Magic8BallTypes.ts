// Typed models for the Magic8Ball SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Biased {
  calculation: any[]
  comparative: number
  locale?: string
  lucky?: boolean
  negative: any[]
  positive: any[]
  question: string
  score: number
  tokens: any[]
  words: any[]
}

export interface BiasedLoadMatch {
  locale?: string
  lucky?: boolean
  question: string
}

export interface BiasedCreateData {
  calculation: any[]
  comparative: number
  locale?: string
  lucky?: boolean
  negative: any[]
  positive: any[]
  question: string
  score: number
  tokens: any[]
  words: any[]
}

export interface Category {
  locale: string
  negative: any[]
  neutral: any[]
  positive: any[]
}

export interface CategoryListMatch {
  locale?: string
}

export interface CategoryFortune {
  category: string
  locale: string
  reading: string
}

export interface CategoryFortuneLoadMatch {
  category: string
  locale?: string
}

export interface RandomFortune {
}

