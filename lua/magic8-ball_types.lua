-- Typed models for the Magic8Ball SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Biased
---@field calculation table
---@field comparative number
---@field locale? string
---@field lucky? boolean
---@field negative table
---@field positive table
---@field question string
---@field score number
---@field tokens table
---@field words table

---@class BiasedLoadMatch
---@field locale? string
---@field lucky? boolean
---@field question string

---@class BiasedCreateData
---@field calculation table
---@field comparative number
---@field locale? string
---@field lucky? boolean
---@field negative table
---@field positive table
---@field question string
---@field score number
---@field tokens table
---@field words table

---@class Category
---@field locale string
---@field negative table
---@field neutral table
---@field positive table

---@class CategoryListMatch
---@field locale? string

---@class CategoryFortune
---@field category string
---@field locale string
---@field reading string

---@class CategoryFortuneLoadMatch
---@field category string
---@field locale? string

---@class RandomFortune

local M = {}

return M
