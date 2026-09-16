"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('BiasedEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when MAGIC8_BALL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('MAGIC8_BALL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.Magic8BallSDK.test();
        const ent = testsdk.Biased();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.MAGIC8_BALL_TEST_LIVE;
        for (const op of ['create', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'biased.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "calculation", "req": true, "short": "Calculation breakdown for sentiment", "type": "`$ARRAY`", "index$": 0 }, { "active": true, "name": "comparative", "req": true, "short": "The comparative sentiment value", "type": "`$NUMBER`", "index$": 1 }, { "active": true, "name": "locale", "req": false, "short": "The language code for response localization", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "lucky", "req": false, "short": "Whether to give a lucky response", "type": "`$BOOLEAN`", "index$": 3 }, { "active": true, "name": "negative", "req": true, "short": "Negative sentiment words", "type": "`$ARRAY`", "index$": 4 }, { "active": true, "name": "positive", "req": true, "short": "Positive sentiment words", "type": "`$ARRAY`", "index$": 5 }, { "active": true, "name": "question", "req": true, "short": "The question to analyze for sentiment", "type": "`$STRING`", "index$": 6 }, { "active": true, "name": "score", "req": true, "short": "The sentiment score", "type": "`$NUMBER`", "index$": 7 }, { "active": true, "name": "tokens", "req": true, "short": "Tokenized words from the question", "type": "`$ARRAY`", "index$": 8 }, { "active": true, "name": "words", "req": true, "short": "Sentiment-bearing words", "type": "`$ARRAY`", "index$": 9 }], "name": "biased", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": {}, "contract": { "id": "POST /api/biased", "json": "{\"operationId\":\"getBiasedFortunePost\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"examples\":{\"default\":{\"value\":{\"locale\":\"fr\",\"lucky\":true,\"question\":\"Will I succeed?\"}}},\"schema\":{\"properties\":{\"locale\":{\"default\":\"en\",\"description\":\"The language code for response localization\",\"enum\":[\"en\",\"es\",\"fr\",\"de\",\"hi\",\"ru\"],\"example\":\"fr\",\"type\":\"string\"},\"lucky\":{\"default\":false,\"description\":\"Whether to give a lucky response\",\"example\":true,\"type\":\"boolean\"},\"question\":{\"description\":\"The question to analyze for sentiment\",\"example\":\"Will I succeed?\",\"type\":\"string\"}},\"required\":[\"question\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"localized\":{\"value\":{\"locale\":\"fr\",\"lucky\":true,\"question\":\"Will I succeed?\",\"reading\":\"Ma réponse est non.\",\"sentiment\":{\"calculation\":[{\"succeed\":2}],\"comparative\":0.6667,\"negative\":[],\"positive\":[\"succeed\"],\"score\":2,\"tokens\":[\"Will\",\"I\",\"succeed?\"],\"words\":[\"succeed\"]}}}},\"schema\":{\"properties\":{\"locale\":{\"description\":\"The language code\",\"example\":\"en\",\"type\":\"string\"},\"lucky\":{\"description\":\"Whether the lucky mode was enabled\",\"example\":false,\"type\":\"boolean\"},\"question\":{\"description\":\"The original question submitted\",\"example\":\"Will I win the lottery?\",\"type\":\"string\"},\"reading\":{\"description\":\"The Magic 8 Ball response based on sentiment\",\"example\":\"My reply is no.\",\"type\":\"string\"},\"sentiment\":{\"description\":\"Sentiment analysis details\",\"properties\":{\"calculation\":{\"description\":\"Calculation breakdown for sentiment\",\"example\":[{\"win\":4}],\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"comparative\":{\"description\":\"The comparative sentiment value\",\"example\":0.8,\"type\":\"number\"},\"negative\":{\"description\":\"Negative sentiment words\",\"example\":[],\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"positive\":{\"description\":\"Positive sentiment words\",\"example\":[\"Win\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"score\":{\"description\":\"The sentiment score\",\"example\":4,\"type\":\"number\"},\"tokens\":{\"description\":\"Tokenized words from the question\",\"example\":[\"Will\",\"I\",\"win\",\"the\",\"lottery?\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"words\":{\"description\":\"Sentiment-bearing words\",\"example\":[\"Win\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"required\":[\"score\",\"comparative\",\"calculation\",\"tokens\",\"words\",\"positive\",\"negative\"],\"type\":\"object\"}},\"required\":[\"reading\",\"question\",\"sentiment\",\"locale\",\"lucky\"],\"type\":\"object\"}}},\"description\":\"Successful response with a biased fortune based on sentiment analysis\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"example\":\"Rate limit exceeded\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"example\":\"You have exceeded the rate limit of 100 requests per minute\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Invalid request body or missing required question parameter\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"example\":\"Rate limit exceeded\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"example\":\"You have exceeded the rate limit of 100 requests per minute\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/api/biased", "segments": [{ "lit": "api" }, { "lit": "biased" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body.sentiment`" }, "index$": 0 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": "en", "kind": "query", "name": "locale", "orig": "locale", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "example": false, "kind": "query", "name": "lucky", "orig": "lucky", "reqd": false, "type": "`$BOOLEAN`", "index$": 1 }, { "active": true, "example": "Will I win the lottery?", "kind": "query", "name": "question", "orig": "question", "reqd": true, "type": "`$STRING`", "index$": 2 }] }, "contract": { "id": "GET /api/biased", "json": "{\"operationId\":\"getBiasedFortuneGet\",\"parameters\":[{\"description\":\"The question to analyze for sentiment\",\"example\":\"Will I win the lottery?\",\"in\":\"query\",\"name\":\"question\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Whether to give a lucky response\",\"in\":\"query\",\"name\":\"lucky\",\"required\":false,\"schema\":{\"default\":false,\"type\":\"boolean\"}},{\"description\":\"The language code for response localization\",\"in\":\"query\",\"name\":\"locale\",\"required\":false,\"schema\":{\"default\":\"en\",\"enum\":[\"en\",\"es\",\"fr\",\"de\",\"hi\",\"ru\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"default\":{\"value\":{\"locale\":\"en\",\"lucky\":false,\"question\":\"Will I win the lottery?\",\"reading\":\"My reply is no.\",\"sentiment\":{\"calculation\":[{\"win\":4}],\"comparative\":0.8,\"negative\":[],\"positive\":[\"Win\"],\"score\":4,\"tokens\":[\"Will\",\"I\",\"win\",\"the\",\"lottery?\"],\"words\":[\"Win\"]}}}},\"schema\":{\"properties\":{\"locale\":{\"description\":\"The language code\",\"example\":\"en\",\"type\":\"string\"},\"lucky\":{\"description\":\"Whether the lucky mode was enabled\",\"example\":false,\"type\":\"boolean\"},\"question\":{\"description\":\"The original question submitted\",\"example\":\"Will I win the lottery?\",\"type\":\"string\"},\"reading\":{\"description\":\"The Magic 8 Ball response based on sentiment\",\"example\":\"My reply is no.\",\"type\":\"string\"},\"sentiment\":{\"description\":\"Sentiment analysis details\",\"properties\":{\"calculation\":{\"description\":\"Calculation breakdown for sentiment\",\"example\":[{\"win\":4}],\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"comparative\":{\"description\":\"The comparative sentiment value\",\"example\":0.8,\"type\":\"number\"},\"negative\":{\"description\":\"Negative sentiment words\",\"example\":[],\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"positive\":{\"description\":\"Positive sentiment words\",\"example\":[\"Win\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"score\":{\"description\":\"The sentiment score\",\"example\":4,\"type\":\"number\"},\"tokens\":{\"description\":\"Tokenized words from the question\",\"example\":[\"Will\",\"I\",\"win\",\"the\",\"lottery?\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"words\":{\"description\":\"Sentiment-bearing words\",\"example\":[\"Win\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"required\":[\"score\",\"comparative\",\"calculation\",\"tokens\",\"words\",\"positive\",\"negative\"],\"type\":\"object\"}},\"required\":[\"reading\",\"question\",\"sentiment\",\"locale\",\"lucky\"],\"type\":\"object\"}}},\"description\":\"Successful response with a biased fortune based on sentiment analysis\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"example\":\"Rate limit exceeded\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"example\":\"You have exceeded the rate limit of 100 requests per minute\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Missing required question parameter\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"example\":\"Rate limit exceeded\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"example\":\"You have exceeded the rate limit of 100 requests per minute\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/api/biased", "segments": [{ "lit": "api" }, { "lit": "biased" }], "select": { "exist": ["locale", "lucky", "question"] }, "transform": { "req": "`reqdata`", "res": "`body.sentiment`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "biased", "name__orig": "biased", "Name": "Biased", "name_": "biased", "name-": "biased", "NAME": "BIASED", "index$": 0 }, { "active": true, "entity": "biased", "key$": "BasicBiasedFlow", "kind": "basic", "name": "BasicBiasedFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "biased_ref01" }, "match": {}, "op": "create", "spec": [], "valid": [], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "biased_ref01", "srcdatavar": "biased_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-biased_ref01" } }], "index$": 1 }] }, 'Biased');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const biased_ref01_ent = client.Biased();
        let biased_ref01_data = setup.data.new.biased['biased_ref01'];
        biased_ref01_data = (await biased_ref01_ent.create(biased_ref01_data)).data();
        (0, node_assert_1.default)(null != biased_ref01_data);
        // LOAD
        const biased_ref01_match_dt0 = {};
        const biased_ref01_data_dt0 = (await biased_ref01_ent.load(biased_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != biased_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/biased/BiasedTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.Magic8BallSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['biased01', 'biased02', 'biased03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'MAGIC8_BALL_TEST_BIASED_ENTID': idmap,
        'MAGIC8_BALL_TEST_LIVE': 'FALSE',
        'MAGIC8_BALL_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['MAGIC8_BALL_TEST_BIASED_ENTID'];
    const live = 'TRUE' === env.MAGIC8_BALL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['MAGIC8_BALL_TEST_BIASED_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.Magic8BallSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=BiasedEntity.test.js.map