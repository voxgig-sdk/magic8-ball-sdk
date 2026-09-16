

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { Magic8BallSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('CategoryFortuneEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MAGIC8_BALL_TEST_LIVE=TRUE.
  afterEach(liveDelay('MAGIC8_BALL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = Magic8BallSDK.test()
    const ent = testsdk.CategoryFortune()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.MAGIC8_BALL_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'category_fortune.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"category","req":true,"short":"The category of the response","type":"`$STRING`","index$":0},{"active":true,"name":"locale","op":{"load":{"req":false,"type":"`$STRING`"}},"req":true,"short":"The language code","type":"`$STRING`","index$":1},{"active":true,"name":"reading","req":true,"short":"The Magic 8 Ball response from the specified category","type":"`$STRING`","index$":2}],"name":"category_fortune","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"category","orig":"category","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"example":"en","kind":"query","name":"locale","orig":"locale","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /api/{category}","json":"{\"operationId\":\"getSpecificCategory\",\"parameters\":[{\"description\":\"The category of response\",\"in\":\"path\",\"name\":\"category\",\"required\":true,\"schema\":{\"enum\":[\"positive\",\"negative\",\"neutral\"],\"type\":\"string\"}},{\"description\":\"The language code for response localization\",\"in\":\"query\",\"name\":\"locale\",\"required\":false,\"schema\":{\"default\":\"en\",\"enum\":[\"en\",\"es\",\"fr\",\"de\",\"hi\",\"ru\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"negative\":{\"value\":{\"category\":\"negative\",\"locale\":\"en\",\"reading\":\"Don't count on it.\"}},\"positive\":{\"value\":{\"category\":\"positive\",\"locale\":\"en\",\"reading\":\"It is Certain.\"}}},\"schema\":{\"properties\":{\"category\":{\"description\":\"The category of the response\",\"enum\":[\"positive\",\"negative\",\"neutral\"],\"example\":\"positive\",\"type\":\"string\"},\"locale\":{\"description\":\"The language code\",\"example\":\"en\",\"type\":\"string\"},\"reading\":{\"description\":\"The Magic 8 Ball response from the specified category\",\"example\":\"It is Certain.\",\"type\":\"string\"}},\"required\":[\"reading\",\"category\",\"locale\"],\"type\":\"object\"}}},\"description\":\"Successful response with a fortune from the specified category\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"example\":\"Rate limit exceeded\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"example\":\"You have exceeded the rate limit of 100 requests per minute\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Invalid category specified\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"example\":\"Rate limit exceeded\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"example\":\"You have exceeded the rate limit of 100 requests per minute\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/{category}","segments":[{"lit":"api"},{"var":"category"}],"select":{"exist":["category","locale"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"query":[{"active":true,"example":"en","kind":"query","name":"locale","orig":"locale","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /api","json":"{\"operationId\":\"getRandomFortune\",\"parameters\":[{\"description\":\"The language code for response localization\",\"in\":\"query\",\"name\":\"locale\",\"required\":false,\"schema\":{\"default\":\"en\",\"enum\":[\"en\",\"es\",\"fr\",\"de\",\"hi\",\"ru\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"default\":{\"value\":{\"reading\":\"Outlook good\"}},\"localized\":{\"value\":{\"locale\":\"es\",\"reading\":\"Las perspectivas son buenas\"}}},\"schema\":{\"properties\":{\"locale\":{\"description\":\"The language code (only included for non-default locale)\",\"example\":\"en\",\"type\":\"string\"},\"reading\":{\"description\":\"The Magic 8 Ball response\",\"example\":\"Outlook good\",\"type\":\"string\"}},\"required\":[\"reading\"],\"type\":\"object\"}}},\"description\":\"Successful response with a random fortune\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"example\":\"Rate limit exceeded\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"example\":\"You have exceeded the rate limit of 100 requests per minute\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded (100 requests per minute per IP)\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api","segments":[{"lit":"api"}],"select":{"exist":["locale"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[["api"]]},"key$":"category_fortune","name__orig":"category_fortune","Name":"CategoryFortune","name_":"category_fortune","name-":"category-fortune","NAME":"CATEGORY_FORTUNE","index$":2}, {"active":true,"entity":"category_fortune","key$":"BasicCategoryFortuneFlow","kind":"basic","name":"BasicCategoryFortuneFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"category_fortune_ref01","srcdatavar":"category_fortune_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-category_fortune_ref01"}}],"index$":0}]}, 'CategoryFortune')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let category_fortune_ref01_data = Object.values(setup.data.existing.category_fortune)[0] as any

    // LOAD: skipped — no entity id field and load requires path params.
    // Entity-var is declared here so later flow steps still compile.
    const category_fortune_ref01_ent = client.CategoryFortune()


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/category_fortune/CategoryFortuneTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = Magic8BallSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['category_fortune01','category_fortune02','category_fortune03','api01','api02','api03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MAGIC8_BALL_TEST_CATEGORY_FORTUNE_ENTID': idmap,
    'MAGIC8_BALL_TEST_LIVE': 'FALSE',
    'MAGIC8_BALL_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['MAGIC8_BALL_TEST_CATEGORY_FORTUNE_ENTID']

  const live = 'TRUE' === env.MAGIC8_BALL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MAGIC8_BALL_TEST_CATEGORY_FORTUNE_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new Magic8BallSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.MAGIC8_BALL_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
