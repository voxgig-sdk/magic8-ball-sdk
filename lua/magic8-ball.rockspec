package = "voxgig-sdk-magic8-ball"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/magic8-ball-sdk.git"
}
description = {
  summary = "Magic8Ball SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["magic8-ball_sdk"] = "magic8-ball_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
