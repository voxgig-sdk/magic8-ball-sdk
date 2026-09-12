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
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
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
                "random_fortune": {},
            },
        },
        "entity": {
      "biased": {
        "fields": [
          {
            "name": "calculation",
            "req": True,
            "short": "Calculation breakdown for sentiment",
            "type": "`$ARRAY`",
          },
          {
            "name": "comparative",
            "req": True,
            "short": "The comparative sentiment value",
            "type": "`$NUMBER`",
          },
          {
            "name": "locale",
            "short": "The language code for response localization",
            "type": "`$STRING`",
          },
          {
            "name": "lucky",
            "short": "Whether to give a lucky response",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "negative",
            "req": True,
            "short": "Negative sentiment words",
            "type": "`$ARRAY`",
          },
          {
            "name": "positive",
            "req": True,
            "short": "Positive sentiment words",
            "type": "`$ARRAY`",
          },
          {
            "name": "question",
            "req": True,
            "short": "The question to analyze for sentiment",
            "type": "`$STRING`",
          },
          {
            "name": "score",
            "req": True,
            "short": "The sentiment score",
            "type": "`$NUMBER`",
          },
          {
            "name": "tokens",
            "req": True,
            "short": "Tokenized words from the question",
            "type": "`$ARRAY`",
          },
          {
            "name": "words",
            "req": True,
            "short": "Sentiment-bearing words",
            "type": "`$ARRAY`",
          },
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
                    "lit": "api",
                  },
                  {
                    "lit": "biased",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.sentiment`",
                },
                "parts": [
                  "api",
                  "biased",
                ],
              },
            ],
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
                      "type": "`$STRING`",
                    },
                    {
                      "example": False,
                      "kind": "query",
                      "name": "lucky",
                      "orig": "lucky",
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "example": "Will I win the lottery?",
                      "kind": "query",
                      "name": "question",
                      "orig": "question",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
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
                "select": {
                  "exist": [
                    "locale",
                    "lucky",
                    "question",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.sentiment`",
                },
                "parts": [
                  "api",
                  "biased",
                ],
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
            "req": True,
            "short": "The language code",
            "type": "`$STRING`",
          },
          {
            "name": "negative",
            "req": True,
            "short": "List of negative responses",
            "type": "`$ARRAY`",
          },
          {
            "name": "neutral",
            "req": True,
            "short": "List of neutral responses",
            "type": "`$ARRAY`",
          },
          {
            "name": "positive",
            "req": True,
            "short": "List of positive responses",
            "type": "`$ARRAY`",
          },
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
                      "type": "`$STRING`",
                    },
                  ],
                },
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
                "select": {
                  "exist": [
                    "locale",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "categories",
                ],
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
            "req": True,
            "short": "The category of the response",
            "type": "`$STRING`",
          },
          {
            "name": "locale",
            "op": {
              "load": {
                "type": "`$STRING`",
              },
            },
            "req": True,
            "short": "The language code",
            "type": "`$STRING`",
          },
          {
            "name": "reading",
            "req": True,
            "short": "The Magic 8 Ball response from the specified category",
            "type": "`$STRING`",
          },
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "example": "en",
                      "kind": "query",
                      "name": "locale",
                      "orig": "locale",
                      "type": "`$STRING`",
                    },
                  ],
                },
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
                "select": {
                  "exist": [
                    "category",
                    "locale",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "{category}",
                ],
              },
              {
                "args": {
                  "query": [
                    {
                      "example": "en",
                      "kind": "query",
                      "name": "locale",
                      "orig": "locale",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api",
                "segments": [
                  {
                    "lit": "api",
                  },
                ],
                "select": {
                  "exist": [
                    "locale",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "api",
            ],
          ],
        },
      },
      "random_fortune": {
        "fields": [],
        "name": "random_fortune",
        "op": {},
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
