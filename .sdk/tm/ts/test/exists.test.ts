
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { Magic8BallSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = Magic8BallSDK.test()
    equal(testsdk instanceof Magic8BallSDK, true,
      'Magic8BallSDK.test() must return a client synchronously')
  })

})
