<?php
declare(strict_types=1);

// Magic8Ball SDK configuration

class Magic8BallConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Magic8Ball",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://eightballapi.com",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "biased" => [],
                    "category" => [],
                    "category_fortune" => [],
                    "random_fortune" => [],
                ],
            ],
            "entity" => [
        'biased' => [
          'fields' => [
            [
              'name' => 'calculation',
              'req' => true,
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'comparative',
              'req' => true,
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'locale',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'lucky',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'negative',
              'req' => true,
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'positive',
              'req' => true,
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'question',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'score',
              'req' => true,
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'tokens',
              'req' => true,
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'words',
              'req' => true,
              'type' => '`$ARRAY`',
            ],
          ],
          'name' => 'biased',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/api/biased',
                  'parts' => [
                    'api',
                    'biased',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.sentiment`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'en',
                        'kind' => 'query',
                        'name' => 'locale',
                        'orig' => 'locale',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => false,
                        'kind' => 'query',
                        'name' => 'lucky',
                        'orig' => 'lucky',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'example' => 'Will I win the lottery?',
                        'kind' => 'query',
                        'name' => 'question',
                        'orig' => 'question',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/biased',
                  'parts' => [
                    'api',
                    'biased',
                  ],
                  'select' => [
                    'exist' => [
                      'locale',
                      'lucky',
                      'question',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.sentiment`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'category' => [
          'fields' => [
            [
              'name' => 'locale',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'negative',
              'req' => true,
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'neutral',
              'req' => true,
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'positive',
              'req' => true,
              'type' => '`$ARRAY`',
            ],
          ],
          'name' => 'category',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'en',
                        'kind' => 'query',
                        'name' => 'locale',
                        'orig' => 'locale',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/categories',
                  'parts' => [
                    'api',
                    'categories',
                  ],
                  'select' => [
                    'exist' => [
                      'locale',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'category_fortune' => [
          'fields' => [
            [
              'name' => 'category',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'locale',
              'op' => [
                'load' => [
                  'type' => '`$STRING`',
                ],
              ],
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'reading',
              'req' => true,
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'category_fortune',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'category',
                        'orig' => 'category',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'example' => 'en',
                        'kind' => 'query',
                        'name' => 'locale',
                        'orig' => 'locale',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/{category}',
                  'parts' => [
                    'api',
                    '{category}',
                  ],
                  'select' => [
                    'exist' => [
                      'category',
                      'locale',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'en',
                        'kind' => 'query',
                        'name' => 'locale',
                        'orig' => 'locale',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api',
                  'parts' => [
                    'api',
                  ],
                  'select' => [
                    'exist' => [
                      'locale',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'api',
              ],
            ],
          ],
        ],
        'random_fortune' => [
          'fields' => [],
          'name' => 'random_fortune',
          'op' => [],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return Magic8BallFeatures::make_feature($name);
    }
}
