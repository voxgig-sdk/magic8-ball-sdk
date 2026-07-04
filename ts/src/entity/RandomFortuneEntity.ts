
import { inspect } from 'node:util'

import { Magic8BallEntityBase } from '../Magic8BallEntityBase'

import type {
  Magic8BallSDK,
} from '../Magic8BallSDK'


import type {
  Operation,
  Context,
  Control,
} from '../types'

import type {
  RandomFortune,
} from '../Magic8BallTypes'

// TODO: needs Entity superclass
class RandomFortuneEntity extends Magic8BallEntityBase<RandomFortune> {

  constructor(client: Magic8BallSDK, entopts: any) {
    super(client, entopts)
    this.name = 'random_fortune'
    this.name_ = 'random_fortune'
    this.Name = 'RandomFortune'
  }


  make(this: RandomFortuneEntity) {
    return new RandomFortuneEntity(this._client, this.entopts())
  }







}


export {
  RandomFortuneEntity
}
