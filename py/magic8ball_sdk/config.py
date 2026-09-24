# Magic8Ball SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Magic8Ball",
            "slug": "magic8-ball",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://eightballapi.com",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "biased": {},
                "category": {},
                "category_fortune": {},
            },
        },
        "entity": {
      "biased": {
        "fields": [
          {
            "name": "calculation",
            "title": "Calculation",
            "type": "`$ARRAY`",
            "req": True,
            "short": "Calculation breakdown for sentiment",
          },
          {
            "name": "comparative",
            "title": "Comparative",
            "type": "`$NUMBER`",
            "req": True,
            "short": "The comparative sentiment value",
          },
          {
            "name": "locale",
            "title": "Locale",
            "type": "`$STRING`",
            "short": "The language code for response localization",
          },
          {
            "name": "lucky",
            "title": "Lucky",
            "type": "`$BOOLEAN`",
            "short": "Whether to give a lucky response",
          },
          {
            "name": "negative",
            "title": "Negative",
            "type": "`$ARRAY`",
            "req": True,
            "short": "Negative sentiment words",
          },
          {
            "name": "positive",
            "title": "Positive",
            "type": "`$ARRAY`",
            "req": True,
            "short": "Positive sentiment words",
          },
          {
            "name": "question",
            "title": "Question",
            "type": "`$STRING`",
            "req": True,
            "short": "The question to analyze for sentiment",
          },
          {
            "name": "score",
            "title": "Score",
            "type": "`$NUMBER`",
            "req": True,
            "short": "The sentiment score",
          },
          {
            "name": "tokens",
            "title": "Tokens",
            "type": "`$ARRAY`",
            "req": True,
            "short": "Tokenized words from the question",
          },
          {
            "name": "words",
            "title": "Words",
            "type": "`$ARRAY`",
            "req": True,
            "short": "Sentiment-bearing words",
          },
        ],
        "name": "biased",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/api/biased",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "biased",
                  },
                ],
                "parts": [
                  "api",
                  "biased",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.sentiment`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/biased",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "biased",
                  },
                ],
                "parts": [
                  "api",
                  "biased",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.sentiment`",
                },
                "args": {
                  "query": [
                    {
                      "name": "locale",
                      "orig": "locale",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "en",
                    },
                    {
                      "name": "lucky",
                      "orig": "lucky",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                      "example": False,
                    },
                    {
                      "name": "question",
                      "orig": "question",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "Will I win the lottery?",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "locale",
                    "lucky",
                    "question",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "category": {
        "fields": [
          {
            "name": "locale",
            "title": "Locale",
            "type": "`$STRING`",
            "req": True,
            "short": "The language code",
          },
          {
            "name": "negative",
            "title": "Negative",
            "type": "`$ARRAY`",
            "req": True,
            "short": "List of negative responses",
          },
          {
            "name": "neutral",
            "title": "Neutral",
            "type": "`$ARRAY`",
            "req": True,
            "short": "List of neutral responses",
          },
          {
            "name": "positive",
            "title": "Positive",
            "type": "`$ARRAY`",
            "req": True,
            "short": "List of positive responses",
          },
        ],
        "name": "category",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/categories",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "categories",
                  },
                ],
                "parts": [
                  "api",
                  "categories",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "locale",
                      "orig": "locale",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "en",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "locale",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "category_fortune": {
        "fields": [
          {
            "name": "category",
            "title": "Category",
            "type": "`$STRING`",
            "req": True,
            "short": "The category of the response",
          },
          {
            "name": "locale",
            "title": "Locale",
            "type": "`$STRING`",
            "req": True,
            "op": {
              "load": {
                "type": "`$STRING`",
              },
            },
            "short": "The language code",
          },
          {
            "name": "reading",
            "title": "Reading",
            "type": "`$STRING`",
            "req": True,
            "short": "The Magic 8 Ball response from the specified category",
          },
        ],
        "name": "category_fortune",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/{category}",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "var": "category",
                  },
                ],
                "parts": [
                  "api",
                  "{category}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "category",
                      "orig": "category",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "locale",
                      "orig": "locale",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "en",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "category",
                    "locale",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api",
                "segments": [
                  {
                    "lit": "api",
                  },
                ],
                "parts": [
                  "api",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "locale",
                      "orig": "locale",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "en",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "locale",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
