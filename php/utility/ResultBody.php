<?php
declare(strict_types=1);

// Magic8Ball SDK utility: result_body

class Magic8BallResultBody
{
    public static function call(Magic8BallContext $ctx): ?Magic8BallResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
