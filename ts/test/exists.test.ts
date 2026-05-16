
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { Magic8BallSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await Magic8BallSDK.test()
    equal(null !== testsdk, true)
  })

})
