
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'Magic8Ball',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
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
          "type": "`$ARRAY`"
        },
        {
          "name": "comparative",
          "req": true,
          "type": "`$NUMBER`"
        },
        {
          "name": "locale",
          "type": "`$STRING`"
        },
        {
          "name": "lucky",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "negative",
          "req": true,
          "type": "`$ARRAY`"
        },
        {
          "name": "positive",
          "req": true,
          "type": "`$ARRAY`"
        },
        {
          "name": "question",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "score",
          "req": true,
          "type": "`$NUMBER`"
        },
        {
          "name": "tokens",
          "req": true,
          "type": "`$ARRAY`"
        },
        {
          "name": "words",
          "req": true,
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
              "parts": [
                "api",
                "biased"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.sentiment`"
              }
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
              "parts": [
                "api",
                "biased"
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
              }
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
          "type": "`$STRING`"
        },
        {
          "name": "negative",
          "req": true,
          "type": "`$ARRAY`"
        },
        {
          "name": "neutral",
          "req": true,
          "type": "`$ARRAY`"
        },
        {
          "name": "positive",
          "req": true,
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
              "parts": [
                "api",
                "categories"
              ],
              "select": {
                "exist": [
                  "locale"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
          "type": "`$STRING`"
        },
        {
          "name": "reading",
          "req": true,
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
              "parts": [
                "api",
                "{category}"
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
              }
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
              "parts": [
                "api"
              ],
              "select": {
                "exist": [
                  "locale"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
  config
}

