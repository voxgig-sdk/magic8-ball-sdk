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
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
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
        ["random_fortune"] = {},
      },
    },
    entity = {
      ["biased"] = {
        ["fields"] = {
          {
            ["name"] = "calculation",
            ["req"] = true,
            ["short"] = "Calculation breakdown for sentiment",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "comparative",
            ["req"] = true,
            ["short"] = "The comparative sentiment value",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "locale",
            ["short"] = "The language code for response localization",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "lucky",
            ["short"] = "Whether to give a lucky response",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "negative",
            ["req"] = true,
            ["short"] = "Negative sentiment words",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "positive",
            ["req"] = true,
            ["short"] = "Positive sentiment words",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "question",
            ["req"] = true,
            ["short"] = "The question to analyze for sentiment",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "score",
            ["req"] = true,
            ["short"] = "The sentiment score",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "tokens",
            ["req"] = true,
            ["short"] = "Tokenized words from the question",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "words",
            ["req"] = true,
            ["short"] = "Sentiment-bearing words",
            ["type"] = "`$ARRAY`",
          },
        },
        ["name"] = "biased",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/api/biased",
                ["parts"] = {
                  "api",
                  "biased",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.sentiment`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = "en",
                      ["kind"] = "query",
                      ["name"] = "locale",
                      ["orig"] = "locale",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = false,
                      ["kind"] = "query",
                      ["name"] = "lucky",
                      ["orig"] = "lucky",
                      ["type"] = "`$BOOLEAN`",
                    },
                    {
                      ["example"] = "Will I win the lottery?",
                      ["kind"] = "query",
                      ["name"] = "question",
                      ["orig"] = "question",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/biased",
                ["parts"] = {
                  "api",
                  "biased",
                },
                ["select"] = {
                  ["exist"] = {
                    "locale",
                    "lucky",
                    "question",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.sentiment`",
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
            ["req"] = true,
            ["short"] = "The language code",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "negative",
            ["req"] = true,
            ["short"] = "List of negative responses",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "neutral",
            ["req"] = true,
            ["short"] = "List of neutral responses",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "positive",
            ["req"] = true,
            ["short"] = "List of positive responses",
            ["type"] = "`$ARRAY`",
          },
        },
        ["name"] = "category",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = "en",
                      ["kind"] = "query",
                      ["name"] = "locale",
                      ["orig"] = "locale",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/categories",
                ["parts"] = {
                  "api",
                  "categories",
                },
                ["select"] = {
                  ["exist"] = {
                    "locale",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
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
            ["req"] = true,
            ["short"] = "The category of the response",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "locale",
            ["op"] = {
              ["load"] = {
                ["type"] = "`$STRING`",
              },
            },
            ["req"] = true,
            ["short"] = "The language code",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "reading",
            ["req"] = true,
            ["short"] = "The Magic 8 Ball response from the specified category",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "category_fortune",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "category",
                      ["orig"] = "category",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
                      ["example"] = "en",
                      ["kind"] = "query",
                      ["name"] = "locale",
                      ["orig"] = "locale",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/{category}",
                ["parts"] = {
                  "api",
                  "{category}",
                },
                ["select"] = {
                  ["exist"] = {
                    "category",
                    "locale",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = "en",
                      ["kind"] = "query",
                      ["name"] = "locale",
                      ["orig"] = "locale",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api",
                ["parts"] = {
                  "api",
                },
                ["select"] = {
                  ["exist"] = {
                    "locale",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "api",
            },
          },
        },
      },
      ["random_fortune"] = {
        ["fields"] = {},
        ["name"] = "random_fortune",
        ["op"] = {},
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
