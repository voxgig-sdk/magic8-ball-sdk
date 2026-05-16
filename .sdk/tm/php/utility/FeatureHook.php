<?php
declare(strict_types=1);

// Magic8Ball SDK utility: feature_hook

class Magic8BallFeatureHook
{
    public static function call(Magic8BallContext $ctx, string $name): void
    {
        if (!$ctx->client) {
            return;
        }
        $features = $ctx->client->features ?? null;
        if (!$features) {
            return;
        }
        foreach ($features as $f) {
            if (method_exists($f, $name)) {
                $f->$name($ctx);
            }
        }
    }
}
