-- Typed models for the Magic8Ball SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Biased
---@field locale string
---@field lucky boolean
---@field question string
---@field reading string
---@field sentiment table

---@class BiasedLoadMatch
---@field locale? string
---@field lucky? boolean
---@field question? string
---@field reading? string
---@field sentiment? table

---@class BiasedCreateData
---@field locale string
---@field lucky boolean
---@field question string
---@field reading string
---@field sentiment table

---@class Category
---@field locale string
---@field negative table
---@field neutral table
---@field positive table

---@class CategoryListMatch
---@field locale? string
---@field negative? table
---@field neutral? table
---@field positive? table

---@class CategoryFortune
---@field category string
---@field locale string
---@field reading string

---@class CategoryFortuneLoadMatch
---@field category string

---@class RandomFortune

local M = {}

return M
