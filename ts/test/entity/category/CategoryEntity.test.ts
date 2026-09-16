

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


describe('CategoryEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MAGIC8_BALL_TEST_LIVE=TRUE.
  afterEach(liveDelay('MAGIC8_BALL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = Magic8BallSDK.test()
    const ent = testsdk.Category()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.MAGIC8_BALL_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'category.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"locale","req":true,"short":"The language code","type":"`$STRING`","index$":0},{"active":true,"name":"negative","req":true,"short":"List of negative responses","type":"`$ARRAY`","index$":1},{"active":true,"name":"neutral","req":true,"short":"List of neutral responses","type":"`$ARRAY`","index$":2},{"active":true,"name":"positive","req":true,"short":"List of positive responses","type":"`$ARRAY`","index$":3}],"name":"category","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":"en","kind":"query","name":"locale","orig":"locale","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /api/categories","json":"{\"operationId\":\"getCategories\",\"parameters\":[{\"description\":\"The language code for response localization\",\"in\":\"query\",\"name\":\"locale\",\"required\":false,\"schema\":{\"default\":\"en\",\"enum\":[\"en\",\"es\",\"fr\",\"de\",\"hi\",\"ru\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"default\":{\"value\":{\"locale\":\"en\",\"negative\":[\"Don't count on it.\",\"My reply is no.\"],\"neutral\":[\"Reply hazy, try again.\",\"Ask again later.\"],\"positive\":[\"It is Certain.\",\"It is decidedly so.\"]}}},\"schema\":{\"properties\":{\"locale\":{\"description\":\"The language code\",\"example\":\"en\",\"type\":\"string\"},\"negative\":{\"description\":\"List of negative responses\",\"example\":[\"Don't count on it.\",\"My reply is no.\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"neutral\":{\"description\":\"List of neutral responses\",\"example\":[\"Reply hazy, try again.\",\"Ask again later.\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"positive\":{\"description\":\"List of positive responses\",\"example\":[\"It is Certain.\",\"It is decidedly so.\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"required\":[\"positive\",\"neutral\",\"negative\",\"locale\"],\"type\":\"object\"}}},\"description\":\"Successful response with categorized fortunes\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"example\":\"Rate limit exceeded\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"example\":\"You have exceeded the rate limit of 100 requests per minute\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/categories","segments":[{"lit":"api"},{"lit":"categories"}],"select":{"exist":["locale"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"category","name__orig":"category","Name":"Category","name_":"category","name-":"category","NAME":"CATEGORY","index$":1}, {"active":true,"entity":"category","key$":"BasicCategoryFlow","kind":"basic","name":"BasicCategoryFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"category_ref01"}}],"index$":0}]}, 'Category')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let category_ref01_data = Object.values(setup.data.existing.category)[0] as any

    // LIST
    const category_ref01_ent = client.Category()
    const category_ref01_match: any = {}

    const category_ref01_list = (await category_ref01_ent.list(category_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/category/CategoryTestData.json')

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
    ['category01','category02','category03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MAGIC8_BALL_TEST_CATEGORY_ENTID': idmap,
    'MAGIC8_BALL_TEST_LIVE': 'FALSE',
    'MAGIC8_BALL_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['MAGIC8_BALL_TEST_CATEGORY_ENTID']

  const live = 'TRUE' === env.MAGIC8_BALL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MAGIC8_BALL_TEST_CATEGORY_ENTID']
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
  
