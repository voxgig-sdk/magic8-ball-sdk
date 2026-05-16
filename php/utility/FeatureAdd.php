<?php
declare(strict_types=1);

// Magic8Ball SDK utility: feature_add

class Magic8BallFeatureAdd
{
    public static function call(Magic8BallContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
