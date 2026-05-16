
import { Magic8BallSDK } from '../Magic8BallSDK'

import { Utility } from './Utility'

import type {
  Operation,
  Spec,
  Response,
  Result,
} from '../types'

import {
  Context
} from '../types'


function makeContext(ctxmap: Record<string, any>, basectx?: Context): any {
  const ctx = new Context(ctxmap, basectx)
  return ctx
}



export {
  makeContext,
}
