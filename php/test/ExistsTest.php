<?php
declare(strict_types=1);

// Magic8Ball SDK exists test

require_once __DIR__ . '/../magic8ball_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = Magic8BallSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
