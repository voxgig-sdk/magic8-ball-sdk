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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "calculation": { "a": true, "h": "Calculation", "n": "calculation", "r": true, "sh": "Calculation breakdown for sentiment", "t": "`$ARRAY`", "key$": "calculation", "index$": 0 }, "comparative": { "a": true, "h": "Comparative", "n": "comparative", "r": true, "sh": "The comparative sentiment value", "t": "`$NUMBER`", "key$": "comparative", "index$": 1 }, "locale": { "a": true, "h": "Locale", "n": "locale", "r": false, "sh": "The language code for response localization", "t": "`$STRING`", "key$": "locale", "index$": 2 }, "lucky": { "a": true, "h": "Lucky", "n": "lucky", "r": false, "sh": "Whether to give a lucky response", "t": "`$BOOLEAN`", "key$": "lucky", "index$": 3 }, "negative": { "a": true, "h": "Negative", "n": "negative", "r": true, "sh": "Negative sentiment words", "t": "`$ARRAY`", "key$": "negative", "index$": 4 }, "positive": { "a": true, "h": "Positive", "n": "positive", "r": true, "sh": "Positive sentiment words", "t": "`$ARRAY`", "key$": "positive", "index$": 5 }, "question": { "a": true, "h": "Question", "n": "question", "r": true, "sh": "The question to analyze for sentiment", "t": "`$STRING`", "key$": "question", "index$": 6 }, "score": { "a": true, "h": "Score", "n": "score", "r": true, "sh": "The sentiment score", "t": "`$NUMBER`", "key$": "score", "index$": 7 }, "tokens": { "a": true, "h": "Tokens", "n": "tokens", "r": true, "sh": "Tokenized words from the question", "t": "`$ARRAY`", "key$": "tokens", "index$": 8 }, "words": { "a": true, "h": "Words", "n": "words", "r": true, "sh": "Sentiment-bearing words", "t": "`$ARRAY`", "key$": "words", "index$": 9 } }, "name": "biased", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /api/biased", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/api/biased", "q": {}, "r": {}, "s": [{ "lit": "api" }, { "lit": "biased" }], "t": { "req": "`reqdata`", "res": "`body.sentiment`" }, "index$": 0 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/biased", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "en", "k": "query", "n": "locale", "or": "locale", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": false, "k": "query", "n": "lucky", "or": "lucky", "r": false, "t": "`$BOOLEAN`", "index$": 1 }, { "a": true, "ex": "Will I win the lottery?", "k": "query", "n": "question", "or": "question", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/api/biased", "q": { "exist": ["locale", "lucky", "question"] }, "r": {}, "s": [{ "lit": "api" }, { "lit": "biased" }], "t": { "req": "`reqdata`", "res": "`body.sentiment`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "biased", "name__orig": "biased", "Name": "Biased", "name_": "biased", "name-": "biased", "NAME": "BIASED", "index$": 0 }, { "active": true, "entity": "biased", "key$": "BasicBiasedFlow", "kind": "basic", "name": "BasicBiasedFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "biased_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "biased_ref01", "srcdatavar": "biased_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-biased_ref01" } }], "index$": 1 }] }, 'Biased', { "POST /api/biased": { "protocol": "http", "operationId": "getBiasedFortunePost", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "question": { "type": "string", "description": "The question to analyze for sentiment", "example": "Will I succeed?", "key$": "question" }, "lucky": { "type": "boolean", "description": "Whether to give a lucky response", "default": false, "example": true, "key$": "lucky" }, "locale": { "type": "string", "description": "The language code for response localization", "enum": ["en", "es", "fr", "de", "hi", "ru"], "default": "en", "example": "fr", "key$": "locale" } }, "required": ["question"], "x-ref": "#/components/schemas/BiasedFortuneRequest", "index$": 1 }, "examples": { "default": { "value": { "question": "Will I succeed?", "lucky": true, "locale": "fr" } } } } } }, "responses": { "200": { "description": "Successful response with a biased fortune based on sentiment analysis", "content": { "application/json": { "schema": { "type": "object", "properties": { "reading": { "description": "The Magic 8 Ball response based on sentiment", "example": "My reply is no.", "key$": "reading", "type": "string" }, "question": { "description": "The original question submitted", "example": "Will I win the lottery?", "key$": "question", "type": "string" }, "sentiment": { "description": "Sentiment analysis details", "key$": "sentiment", "properties": { "calculation": { "description": "Calculation breakdown for sentiment", "example": [{ "win": 4 }], "items": { "type": "object" }, "type": "array", "key$": "calculation" }, "comparative": { "description": "The comparative sentiment value", "example": 0.8, "type": "number", "key$": "comparative" }, "negative": { "description": "Negative sentiment words", "example": [], "items": { "type": "string" }, "type": "array", "key$": "negative" }, "positive": { "description": "Positive sentiment words", "example": ["Win"], "items": { "type": "string" }, "type": "array", "key$": "positive" }, "score": { "description": "The sentiment score", "example": 4, "type": "number", "key$": "score" }, "tokens": { "description": "Tokenized words from the question", "example": ["Will", "I", "win", "the", "lottery?"], "items": { "type": "string" }, "type": "array", "key$": "tokens" }, "words": { "description": "Sentiment-bearing words", "example": ["Win"], "items": { "type": "string" }, "type": "array", "key$": "words" } }, "required": ["score", "comparative", "calculation", "tokens", "words", "positive", "negative"], "type": "object", "index$": 0 }, "locale": { "description": "The language code", "example": "en", "key$": "locale", "type": "string" }, "lucky": { "description": "Whether the lucky mode was enabled", "example": false, "key$": "lucky", "type": "boolean" } }, "required": ["reading", "question", "sentiment", "locale", "lucky"], "x-ref": "#/components/schemas/BiasedFortuneResponse" }, "examples": { "localized": { "value": { "reading": "Ma réponse est non.", "question": "Will I succeed?", "sentiment": { "score": 2, "comparative": 0.6667, "calculation": [{ "succeed": 2 }], "tokens": ["Will", "I", "succeed?"], "words": ["succeed"], "positive": ["succeed"], "negative": [] }, "locale": "fr", "lucky": true } } } } } }, "400": { "description": "Invalid request body or missing required question parameter", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message", "example": "Rate limit exceeded" }, "message": { "type": "string", "description": "Detailed error description", "example": "You have exceeded the rate limit of 100 requests per minute" } }, "x-ref": "#/components/schemas/Error" } } } }, "429": { "description": "Rate limit exceeded", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message", "example": "Rate limit exceeded" }, "message": { "type": "string", "description": "Detailed error description", "example": "You have exceeded the rate limit of 100 requests per minute" } }, "x-ref": "#/components/schemas/Error" } } } } }, "parameters": [], "securitySource": "unspecified" }, "GET /api/biased": { "protocol": "http", "operationId": "getBiasedFortuneGet", "responses": { "200": { "description": "Successful response with a biased fortune based on sentiment analysis", "content": { "application/json": { "schema": { "type": "object", "properties": { "reading": { "description": "The Magic 8 Ball response based on sentiment", "example": "My reply is no.", "key$": "reading", "type": "string" }, "question": { "description": "The original question submitted", "example": "Will I win the lottery?", "key$": "question", "type": "string" }, "sentiment": { "description": "Sentiment analysis details", "key$": "sentiment", "properties": { "calculation": { "description": "Calculation breakdown for sentiment", "example": [{ "win": 4 }], "items": { "type": "object" }, "type": "array", "key$": "calculation" }, "comparative": { "description": "The comparative sentiment value", "example": 0.8, "type": "number", "key$": "comparative" }, "negative": { "description": "Negative sentiment words", "example": [], "items": { "type": "string" }, "type": "array", "key$": "negative" }, "positive": { "description": "Positive sentiment words", "example": ["Win"], "items": { "type": "string" }, "type": "array", "key$": "positive" }, "score": { "description": "The sentiment score", "example": 4, "type": "number", "key$": "score" }, "tokens": { "description": "Tokenized words from the question", "example": ["Will", "I", "win", "the", "lottery?"], "items": { "type": "string" }, "type": "array", "key$": "tokens" }, "words": { "description": "Sentiment-bearing words", "example": ["Win"], "items": { "type": "string" }, "type": "array", "key$": "words" } }, "required": ["score", "comparative", "calculation", "tokens", "words", "positive", "negative"], "type": "object", "index$": 0 }, "locale": { "description": "The language code", "example": "en", "key$": "locale", "type": "string" }, "lucky": { "description": "Whether the lucky mode was enabled", "example": false, "key$": "lucky", "type": "boolean" } }, "required": ["reading", "question", "sentiment", "locale", "lucky"], "x-ref": "#/components/schemas/BiasedFortuneResponse" }, "examples": { "default": { "value": { "reading": "My reply is no.", "question": "Will I win the lottery?", "sentiment": { "score": 4, "comparative": 0.8, "calculation": [{ "win": 4 }], "tokens": ["Will", "I", "win", "the", "lottery?"], "words": ["Win"], "positive": ["Win"], "negative": [] }, "locale": "en", "lucky": false } } } } } }, "400": { "description": "Missing required question parameter", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message", "example": "Rate limit exceeded" }, "message": { "type": "string", "description": "Detailed error description", "example": "You have exceeded the rate limit of 100 requests per minute" } }, "x-ref": "#/components/schemas/Error" } } } }, "429": { "description": "Rate limit exceeded", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message", "example": "Rate limit exceeded" }, "message": { "type": "string", "description": "Detailed error description", "example": "You have exceeded the rate limit of 100 requests per minute" } }, "x-ref": "#/components/schemas/Error" } } } } }, "parameters": [{ "name": "question", "in": "query", "description": "The question to analyze for sentiment", "required": true, "schema": { "type": "string" }, "example": "Will I win the lottery?", "index$": 0 }, { "name": "lucky", "in": "query", "description": "Whether to give a lucky response", "required": false, "schema": { "type": "boolean", "default": false }, "index$": 1 }, { "name": "locale", "in": "query", "description": "The language code for response localization", "required": false, "schema": { "type": "string", "enum": ["en", "es", "fr", "de", "hi", "ru"], "default": "en" }, "index$": 2 }], "securitySource": "unspecified" } });
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