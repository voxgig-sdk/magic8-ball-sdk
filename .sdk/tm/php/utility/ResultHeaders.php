<?php
declare(strict_types=1);

// Magic8Ball SDK utility: result_headers

class Magic8BallResultHeaders
{
    public static function call(Magic8BallContext $ctx): ?Magic8BallResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
