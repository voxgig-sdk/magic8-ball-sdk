

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"category":{"a":true,"h":"Category","n":"category","r":true,"sh":"The category of the response","t":"`$STRING`","key$":"category","index$":0},"locale":{"a":true,"h":"Locale","n":"locale","op":{"load":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"The language code","t":"`$STRING`","key$":"locale","index$":1},"reading":{"a":true,"h":"Reading","n":"reading","r":true,"sh":"The Magic 8 Ball response from the specified category","t":"`$STRING`","key$":"reading","index$":2}},"name":"category_fortune","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/{category}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"category","or":"category","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":"en","k":"query","n":"locale","or":"locale","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/{category}","q":{"exist":["category","locale"]},"r":{},"s":[{"lit":"api"},{"var":"category"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /api","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"en","k":"query","n":"locale","or":"locale","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api","q":{"exist":["locale"]},"r":{},"s":[{"lit":"api"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"category_fortune","name__orig":"category_fortune","Name":"CategoryFortune","name_":"category_fortune","name-":"category-fortune","NAME":"CATEGORY_FORTUNE","index$":2}, {"active":true,"entity":"category_fortune","key$":"BasicCategoryFortuneFlow","kind":"basic","name":"BasicCategoryFortuneFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"category_fortune_ref01","srcdatavar":"category_fortune_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-category_fortune_ref01"}}],"index$":0}]}, 'CategoryFortune', {"GET /api/{category}":{"protocol":"http","operationId":"getSpecificCategory","responses":{"200":{"description":"Successful response with a fortune from the specified category","content":{"application/json":{"schema":{"type":"object","properties":{"reading":{"type":"string","description":"The Magic 8 Ball response from the specified category","example":"It is Certain.","key$":"reading"},"category":{"type":"string","description":"The category of the response","enum":["positive","negative","neutral"],"example":"positive","key$":"category"},"locale":{"type":"string","description":"The language code","example":"en","key$":"locale"}},"required":["reading","category","locale"],"x-ref":"#/components/schemas/CategoryFortuneResponse","index$":0},"examples":{"positive":{"value":{"reading":"It is Certain.","category":"positive","locale":"en"}},"negative":{"value":{"reading":"Don't count on it.","category":"negative","locale":"en"}}}}}},"400":{"description":"Invalid category specified","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message","example":"Rate limit exceeded"},"message":{"type":"string","description":"Detailed error description","example":"You have exceeded the rate limit of 100 requests per minute"}},"x-ref":"#/components/schemas/Error"}}}},"429":{"description":"Rate limit exceeded","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message","example":"Rate limit exceeded"},"message":{"type":"string","description":"Detailed error description","example":"You have exceeded the rate limit of 100 requests per minute"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"category","in":"path","description":"The category of response","required":true,"schema":{"type":"string","enum":["positive","negative","neutral"]},"index$":0},{"name":"locale","in":"query","description":"The language code for response localization","required":false,"schema":{"type":"string","enum":["en","es","fr","de","hi","ru"],"default":"en"},"index$":1}],"securitySource":"unspecified"},"GET /api":{"protocol":"http","operationId":"getRandomFortune","responses":{"200":{"description":"Successful response with a random fortune","content":{"application/json":{"schema":{"type":"object","properties":{"reading":{"description":"The Magic 8 Ball response","example":"Outlook good","key$":"reading","type":"string"},"locale":{"description":"The language code (only included for non-default locale)","example":"en","key$":"locale","type":"string"}},"required":["reading"],"x-ref":"#/components/schemas/RandomFortuneResponse","index$":0},"examples":{"default":{"value":{"reading":"Outlook good"}},"localized":{"value":{"reading":"Las perspectivas son buenas","locale":"es"}}}}}},"429":{"description":"Rate limit exceeded (100 requests per minute per IP)","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message","example":"Rate limit exceeded"},"message":{"type":"string","description":"Detailed error description","example":"You have exceeded the rate limit of 100 requests per minute"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"locale","in":"query","description":"The language code for response localization","required":false,"schema":{"type":"string","enum":["en","es","fr","de","hi","ru"],"default":"en"},"index$":0}],"securitySource":"unspecified"}})
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
    ['category_fortune01','category_fortune02','category_fortune03'],
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
  
