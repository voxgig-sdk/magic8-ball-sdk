<?php
declare(strict_types=1);

// Typed models for the Magic8Ball SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Biased entity data model. */
class Biased
{
    public string $locale;
    public bool $lucky;
    public string $question;
    public string $reading;
    public array $sentiment;
}

/** Request payload for Biased#load. */
class BiasedLoadMatch
{
    public ?string $locale = null;
    public ?bool $lucky = null;
    public ?string $question = null;
    public ?string $reading = null;
    public ?array $sentiment = null;
}

/** Request payload for Biased#create. */
class BiasedCreateData
{
    public string $locale;
    public bool $lucky;
    public string $question;
    public string $reading;
    public array $sentiment;
}

/** Category entity data model. */
class Category
{
    public string $locale;
    public array $negative;
    public array $neutral;
    public array $positive;
}

/** Request payload for Category#list. */
class CategoryListMatch
{
    public ?string $locale = null;
    public ?array $negative = null;
    public ?array $neutral = null;
    public ?array $positive = null;
}

/** CategoryFortune entity data model. */
class CategoryFortune
{
    public string $category;
    public string $locale;
    public string $reading;
}

/** Request payload for CategoryFortune#load. */
class CategoryFortuneLoadMatch
{
    public string $category;
}

/** RandomFortune entity data model. */
class RandomFortune
{
}

