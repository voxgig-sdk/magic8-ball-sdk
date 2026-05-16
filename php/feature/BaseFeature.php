<?php
declare(strict_types=1);

// Magic8Ball SDK base feature

class Magic8BallBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(Magic8BallContext $ctx, array $options): void {}
    public function PostConstruct(Magic8BallContext $ctx): void {}
    public function PostConstructEntity(Magic8BallContext $ctx): void {}
    public function SetData(Magic8BallContext $ctx): void {}
    public function GetData(Magic8BallContext $ctx): void {}
    public function GetMatch(Magic8BallContext $ctx): void {}
    public function SetMatch(Magic8BallContext $ctx): void {}
    public function PrePoint(Magic8BallContext $ctx): void {}
    public function PreSpec(Magic8BallContext $ctx): void {}
    public function PreRequest(Magic8BallContext $ctx): void {}
    public function PreResponse(Magic8BallContext $ctx): void {}
    public function PreResult(Magic8BallContext $ctx): void {}
    public function PreDone(Magic8BallContext $ctx): void {}
    public function PreUnexpected(Magic8BallContext $ctx): void {}
}
