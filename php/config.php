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
                ],
            ],
            "entity" => [
        'biased' => [
          'fields' => [
            [
              'name' => 'calculation',
              'title' => 'Calculation',
              'type' => '`$ARRAY`',
              'req' => true,
              'short' => 'Calculation breakdown for sentiment',
            ],
            [
              'name' => 'comparative',
              'title' => 'Comparative',
              'type' => '`$NUMBER`',
              'req' => true,
              'short' => 'The comparative sentiment value',
            ],
            [
              'name' => 'locale',
              'title' => 'Locale',
              'type' => '`$STRING`',
              'short' => 'The language code for response localization',
            ],
            [
              'name' => 'lucky',
              'title' => 'Lucky',
              'type' => '`$BOOLEAN`',
              'short' => 'Whether to give a lucky response',
            ],
            [
              'name' => 'negative',
              'title' => 'Negative',
              'type' => '`$ARRAY`',
              'req' => true,
              'short' => 'Negative sentiment words',
            ],
            [
              'name' => 'positive',
              'title' => 'Positive',
              'type' => '`$ARRAY`',
              'req' => true,
              'short' => 'Positive sentiment words',
            ],
            [
              'name' => 'question',
              'title' => 'Question',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'The question to analyze for sentiment',
            ],
            [
              'name' => 'score',
              'title' => 'Score',
              'type' => '`$NUMBER`',
              'req' => true,
              'short' => 'The sentiment score',
            ],
            [
              'name' => 'tokens',
              'title' => 'Tokens',
              'type' => '`$ARRAY`',
              'req' => true,
              'short' => 'Tokenized words from the question',
            ],
            [
              'name' => 'words',
              'title' => 'Words',
              'type' => '`$ARRAY`',
              'req' => true,
              'short' => 'Sentiment-bearing words',
            ],
          ],
          'name' => 'biased',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
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
                  'parts' => [
                    'api',
                    'biased',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.sentiment`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
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
                  'parts' => [
                    'api',
                    'biased',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.sentiment`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'locale',
                        'orig' => 'locale',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'en',
                      ],
                      [
                        'name' => 'lucky',
                        'orig' => 'lucky',
                        'type' => '`$BOOLEAN`',
                        'kind' => 'query',
                        'example' => false,
                      ],
                      [
                        'name' => 'question',
                        'orig' => 'question',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => 'Will I win the lottery?',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'locale',
                      'lucky',
                      'question',
                    ],
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
              'title' => 'Locale',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'The language code',
            ],
            [
              'name' => 'negative',
              'title' => 'Negative',
              'type' => '`$ARRAY`',
              'req' => true,
              'short' => 'List of negative responses',
            ],
            [
              'name' => 'neutral',
              'title' => 'Neutral',
              'type' => '`$ARRAY`',
              'req' => true,
              'short' => 'List of neutral responses',
            ],
            [
              'name' => 'positive',
              'title' => 'Positive',
              'type' => '`$ARRAY`',
              'req' => true,
              'short' => 'List of positive responses',
            ],
          ],
          'name' => 'category',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
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
                  'parts' => [
                    'api',
                    'categories',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'locale',
                        'orig' => 'locale',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'en',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'locale',
                    ],
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
              'title' => 'Category',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'The category of the response',
            ],
            [
              'name' => 'locale',
              'title' => 'Locale',
              'type' => '`$STRING`',
              'req' => true,
              'op' => [
                'load' => [
                  'type' => '`$STRING`',
                ],
              ],
              'short' => 'The language code',
            ],
            [
              'name' => 'reading',
              'title' => 'Reading',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'The Magic 8 Ball response from the specified category',
            ],
          ],
          'name' => 'category_fortune',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
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
                  'parts' => [
                    'api',
                    '{category}',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'category',
                        'orig' => 'category',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                    'query' => [
                      [
                        'name' => 'locale',
                        'orig' => 'locale',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'en',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'category',
                      'locale',
                    ],
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                  ],
                  'parts' => [
                    'api',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'locale',
                        'orig' => 'locale',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'en',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'locale',
                    ],
                  ],
                ],
              ],
            ],
          ],
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
