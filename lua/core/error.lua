-- Magic8Ball SDK error

local Magic8BallError = {}
Magic8BallError.__index = Magic8BallError


function Magic8BallError.new(code, msg, ctx)
  local self = setmetatable({}, Magic8BallError)
  self.is_sdk_error = true
  self.sdk = "Magic8Ball"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function Magic8BallError:error()
  return self.msg
end


function Magic8BallError:__tostring()
  return self.msg
end


return Magic8BallError
