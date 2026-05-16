<?php
declare(strict_types=1);

// Magic8Ball SDK utility: prepare_headers

class Magic8BallPrepareHeaders
{
    public static function call(Magic8BallContext $ctx): array
    {
        $options = $ctx->client->options_map();
        $headers = \Voxgig\Struct\Struct::getprop($options, 'headers');
        if (!$headers) {
            return [];
        }
        $out = \Voxgig\Struct\Struct::clone($headers);
        return is_array($out) ? $out : [];
    }
}
