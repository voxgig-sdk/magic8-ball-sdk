<?php
declare(strict_types=1);

// Magic8Ball SDK utility: prepare_body

class Magic8BallPrepareBody
{
    public static function call(Magic8BallContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
