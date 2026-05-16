
import { Context } from './Context'


class Magic8BallError extends Error {

  isMagic8BallError = true

  sdk = 'Magic8Ball'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  Magic8BallError
}

