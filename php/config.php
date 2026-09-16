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
                "slug" => "magic8-ball",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
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
              'short' => 'Calculation breakdown for sentiment',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'comparative',
              'req' => true,
              'short' => 'The comparative sentiment value',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'locale',
              'short' => 'The language code for response localization',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'lucky',
              'short' => 'Whether to give a lucky response',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'negative',
              'req' => true,
              'short' => 'Negative sentiment words',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'positive',
              'req' => true,
              'short' => 'Positive sentiment words',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'question',
              'req' => true,
              'short' => 'The question to analyze for sentiment',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'score',
              'req' => true,
              'short' => 'The sentiment score',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'tokens',
              'req' => true,
              'short' => 'Tokenized words from the question',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'words',
              'req' => true,
              'short' => 'Sentiment-bearing words',
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
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'biased',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.sentiment`',
                  ],
                  'parts' => [
                    'api',
                    'biased',
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
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'biased',
                    ],
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
                  'parts' => [
                    'api',
                    'biased',
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
              'short' => 'The language code',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'negative',
              'req' => true,
              'short' => 'List of negative responses',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'neutral',
              'req' => true,
              'short' => 'List of neutral responses',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'positive',
              'req' => true,
              'short' => 'List of positive responses',
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
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'categories',
                    ],
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
                  'parts' => [
                    'api',
                    'categories',
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
              'short' => 'The category of the response',
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
              'short' => 'The language code',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'reading',
              'req' => true,
              'short' => 'The Magic 8 Ball response from the specified category',
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
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'var' => 'category',
                    ],
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
                  'parts' => [
                    'api',
                    '{category}',
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
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
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
                  'parts' => [
                    'api',
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
