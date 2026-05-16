<?php
declare(strict_types=1);

// Magic8Ball SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class Magic8BallFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new Magic8BallBaseFeature();
            case "test":
                return new Magic8BallTestFeature();
            default:
                return new Magic8BallBaseFeature();
        }
    }
}
