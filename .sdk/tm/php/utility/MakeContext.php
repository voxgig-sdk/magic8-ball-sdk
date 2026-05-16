<?php
declare(strict_types=1);

// Magic8Ball SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class Magic8BallMakeContext
{
    public static function call(array $ctxmap, ?Magic8BallContext $basectx): Magic8BallContext
    {
        return new Magic8BallContext($ctxmap, $basectx);
    }
}
