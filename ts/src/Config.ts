
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Magic8Ball',
        slug: "magic8-ball",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://eightballapi.com",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      biased: {
      },

      category: {
      },

      category_fortune: {
      },

      random_fortune: {
      },

    }
  }


  entity = {
    "biased": {
      "fields": [
        {
          "name": "calculation",
          "req": true,
          "short": "Calculation breakdown for sentiment",
          "type": "`$ARRAY`"
        },
        {
          "name": "comparative",
          "req": true,
          "short": "The comparative sentiment value",
          "type": "`$NUMBER`"
        },
        {
          "name": "locale",
          "short": "The language code for response localization",
          "type": "`$STRING`"
        },
        {
          "name": "lucky",
          "short": "Whether to give a lucky response",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "negative",
          "req": true,
          "short": "Negative sentiment words",
          "type": "`$ARRAY`"
        },
        {
          "name": "positive",
          "req": true,
          "short": "Positive sentiment words",
          "type": "`$ARRAY`"
        },
        {
          "name": "question",
          "req": true,
          "short": "The question to analyze for sentiment",
          "type": "`$STRING`"
        },
        {
          "name": "score",
          "req": true,
          "short": "The sentiment score",
          "type": "`$NUMBER`"
        },
        {
          "name": "tokens",
          "req": true,
          "short": "Tokenized words from the question",
          "type": "`$ARRAY`"
        },
        {
          "name": "words",
          "req": true,
          "short": "Sentiment-bearing words",
          "type": "`$ARRAY`"
        }
      ],
      "name": "biased",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/api/biased",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "biased"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.sentiment`"
              },
              "parts": [
                "api",
                "biased"
              ]
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": "en",
                    "kind": "query",
                    "name": "locale",
                    "orig": "locale",
                    "type": "`$STRING`"
                  },
                  {
                    "example": false,
                    "kind": "query",
                    "name": "lucky",
                    "orig": "lucky",
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "example": "Will I win the lottery?",
                    "kind": "query",
                    "name": "question",
                    "orig": "question",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/biased",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "biased"
                }
              ],
              "select": {
                "exist": [
                  "locale",
                  "lucky",
                  "question"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.sentiment`"
              },
              "parts": [
                "api",
                "biased"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "category": {
      "fields": [
        {
          "name": "locale",
          "req": true,
          "short": "The language code",
          "type": "`$STRING`"
        },
        {
          "name": "negative",
          "req": true,
          "short": "List of negative responses",
          "type": "`$ARRAY`"
        },
        {
          "name": "neutral",
          "req": true,
          "short": "List of neutral responses",
          "type": "`$ARRAY`"
        },
        {
          "name": "positive",
          "req": true,
          "short": "List of positive responses",
          "type": "`$ARRAY`"
        }
      ],
      "name": "category",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": "en",
                    "kind": "query",
                    "name": "locale",
                    "orig": "locale",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/categories",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "categories"
                }
              ],
              "select": {
                "exist": [
                  "locale"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "api",
                "categories"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "category_fortune": {
      "fields": [
        {
          "name": "category",
          "req": true,
          "short": "The category of the response",
          "type": "`$STRING`"
        },
        {
          "name": "locale",
          "op": {
            "load": {
              "type": "`$STRING`"
            }
          },
          "req": true,
          "short": "The language code",
          "type": "`$STRING`"
        },
        {
          "name": "reading",
          "req": true,
          "short": "The Magic 8 Ball response from the specified category",
          "type": "`$STRING`"
        }
      ],
      "name": "category_fortune",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "category",
                    "orig": "category",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "example": "en",
                    "kind": "query",
                    "name": "locale",
                    "orig": "locale",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/{category}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "var": "category"
                }
              ],
              "select": {
                "exist": [
                  "category",
                  "locale"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "api",
                "{category}"
              ]
            },
            {
              "args": {
                "query": [
                  {
                    "example": "en",
                    "kind": "query",
                    "name": "locale",
                    "orig": "locale",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api",
              "segments": [
                {
                  "lit": "api"
                }
              ],
              "select": {
                "exist": [
                  "locale"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "api"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "api"
          ]
        ]
      }
    },
    "random_fortune": {
      "fields": [],
      "name": "random_fortune",
      "op": {},
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

