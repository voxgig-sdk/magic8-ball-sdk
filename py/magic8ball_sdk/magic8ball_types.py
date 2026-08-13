# Typed models for the Magic8Ball SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class BiasedRequired(TypedDict):
    calculation: list
    comparative: float
    negative: list
    positive: list
    question: str
    score: float
    tokens: list
    words: list


class Biased(BiasedRequired, total=False):
    locale: str
    lucky: bool


class BiasedLoadMatch(TypedDict, total=False):
    calculation: list
    comparative: float
    locale: str
    lucky: bool
    negative: list
    positive: list
    question: str
    score: float
    tokens: list
    words: list


class BiasedCreateDataRequired(TypedDict):
    calculation: list
    comparative: float
    negative: list
    positive: list
    question: str
    score: float
    tokens: list
    words: list


class BiasedCreateData(BiasedCreateDataRequired, total=False):
    locale: str
    lucky: bool


class Category(TypedDict):
    locale: str
    negative: list
    neutral: list
    positive: list


class CategoryListMatch(TypedDict, total=False):
    locale: str
    negative: list
    neutral: list
    positive: list


class CategoryFortune(TypedDict):
    category: str
    locale: str
    reading: str


class CategoryFortuneLoadMatch(TypedDict, total=False):
    category: str


class RandomFortune(TypedDict):
    pass
