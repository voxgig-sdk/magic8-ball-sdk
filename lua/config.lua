-- Magic8Ball SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Magic8Ball",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
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
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "comparative",
            ["req"] = true,
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "locale",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "lucky",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "negative",
            ["req"] = true,
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "positive",
            ["req"] = true,
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "question",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "score",
            ["req"] = true,
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "tokens",
            ["req"] = true,
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "words",
            ["req"] = true,
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
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "negative",
            ["req"] = true,
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "neutral",
            ["req"] = true,
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "positive",
            ["req"] = true,
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
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "reading",
            ["req"] = true,
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
