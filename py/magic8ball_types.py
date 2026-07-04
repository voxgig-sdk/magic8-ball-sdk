# Typed models for the Magic8Ball SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Biased:
    locale: str
    lucky: bool
    question: str
    reading: str
    sentiment: dict


@dataclass
class BiasedLoadMatch:
    locale: Optional[str] = None
    lucky: Optional[bool] = None
    question: Optional[str] = None
    reading: Optional[str] = None
    sentiment: Optional[dict] = None


@dataclass
class BiasedCreateData:
    locale: Optional[str] = None
    lucky: Optional[bool] = None
    question: Optional[str] = None
    reading: Optional[str] = None
    sentiment: Optional[dict] = None


@dataclass
class Category:
    locale: str
    negative: list
    neutral: list
    positive: list


@dataclass
class CategoryListMatch:
    locale: Optional[str] = None
    negative: Optional[list] = None
    neutral: Optional[list] = None
    positive: Optional[list] = None


@dataclass
class CategoryFortune:
    category: str
    locale: str
    reading: str


@dataclass
class CategoryFortuneLoadMatch:
    category: str


@dataclass
class RandomFortune:
    pass

