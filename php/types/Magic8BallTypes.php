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
    public array $calculation;
    public float $comparative;
    public ?string $locale = null;
    public ?bool $lucky = null;
    public array $negative;
    public array $positive;
    public string $question;
    public float $score;
    public array $tokens;
    public array $words;
}

/** Request payload for Biased#load. */
class BiasedLoadMatch
{
    public ?string $locale = null;
    public ?bool $lucky = null;
    public string $question;
}

/** Request payload for Biased#create. */
class BiasedCreateData
{
    public array $calculation;
    public float $comparative;
    public ?string $locale = null;
    public ?bool $lucky = null;
    public array $negative;
    public array $positive;
    public string $question;
    public float $score;
    public array $tokens;
    public array $words;
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
    public ?string $locale = null;
}

/** RandomFortune entity data model. */
class RandomFortune
{
}

