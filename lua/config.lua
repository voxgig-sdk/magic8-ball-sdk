-- Magic8Ball SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Magic8Ball",
      slug = "magic8-ball",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://eightballapi.com",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["biased"] = {},
        ["category"] = {},
        ["category_fortune"] = {},
      },
    },
    entity = {
      ["biased"] = {
        ["fields"] = {
          {
            ["name"] = "calculation",
            ["title"] = "Calculation",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
            ["short"] = "Calculation breakdown for sentiment",
          },
          {
            ["name"] = "comparative",
            ["title"] = "Comparative",
            ["type"] = "`$NUMBER`",
            ["req"] = true,
            ["short"] = "The comparative sentiment value",
          },
          {
            ["name"] = "locale",
            ["title"] = "Locale",
            ["type"] = "`$STRING`",
            ["short"] = "The language code for response localization",
          },
          {
            ["name"] = "lucky",
            ["title"] = "Lucky",
            ["type"] = "`$BOOLEAN`",
            ["short"] = "Whether to give a lucky response",
          },
          {
            ["name"] = "negative",
            ["title"] = "Negative",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
            ["short"] = "Negative sentiment words",
          },
          {
            ["name"] = "positive",
            ["title"] = "Positive",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
            ["short"] = "Positive sentiment words",
          },
          {
            ["name"] = "question",
            ["title"] = "Question",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "The question to analyze for sentiment",
          },
          {
            ["name"] = "score",
            ["title"] = "Score",
            ["type"] = "`$NUMBER`",
            ["req"] = true,
            ["short"] = "The sentiment score",
          },
          {
            ["name"] = "tokens",
            ["title"] = "Tokens",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
            ["short"] = "Tokenized words from the question",
          },
          {
            ["name"] = "words",
            ["title"] = "Words",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
            ["short"] = "Sentiment-bearing words",
          },
        },
        ["name"] = "biased",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/api/biased",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "biased",
                  },
                },
                ["parts"] = {
                  "api",
                  "biased",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.sentiment`",
                },
                ["args"] = {},
                ["select"] = {},
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/biased",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "biased",
                  },
                },
                ["parts"] = {
                  "api",
                  "biased",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.sentiment`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "locale",
                      ["orig"] = "locale",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "en",
                    },
                    {
                      ["name"] = "lucky",
                      ["orig"] = "lucky",
                      ["type"] = "`$BOOLEAN`",
                      ["kind"] = "query",
                      ["example"] = false,
                    },
                    {
                      ["name"] = "question",
                      ["orig"] = "question",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = "Will I win the lottery?",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "locale",
                    "lucky",
                    "question",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["category"] = {
        ["fields"] = {
          {
            ["name"] = "locale",
            ["title"] = "Locale",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "The language code",
          },
          {
            ["name"] = "negative",
            ["title"] = "Negative",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
            ["short"] = "List of negative responses",
          },
          {
            ["name"] = "neutral",
            ["title"] = "Neutral",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
            ["short"] = "List of neutral responses",
          },
          {
            ["name"] = "positive",
            ["title"] = "Positive",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
            ["short"] = "List of positive responses",
          },
        },
        ["name"] = "category",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/categories",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "categories",
                  },
                },
                ["parts"] = {
                  "api",
                  "categories",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "locale",
                      ["orig"] = "locale",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "en",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "locale",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["category_fortune"] = {
        ["fields"] = {
          {
            ["name"] = "category",
            ["title"] = "Category",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "The category of the response",
          },
          {
            ["name"] = "locale",
            ["title"] = "Locale",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["op"] = {
              ["load"] = {
                ["type"] = "`$STRING`",
              },
            },
            ["short"] = "The language code",
          },
          {
            ["name"] = "reading",
            ["title"] = "Reading",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "The Magic 8 Ball response from the specified category",
          },
        },
        ["name"] = "category_fortune",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/{category}",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["var"] = "category",
                  },
                },
                ["parts"] = {
                  "api",
                  "{category}",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "category",
                      ["orig"] = "category",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "locale",
                      ["orig"] = "locale",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "en",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "category",
                    "locale",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                },
                ["parts"] = {
                  "api",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "locale",
                      ["orig"] = "locale",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "en",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "locale",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
