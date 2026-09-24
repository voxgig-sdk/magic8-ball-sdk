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
(0, node_test_1.describe)('CategoryFortuneEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when MAGIC8_BALL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('MAGIC8_BALL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.Magic8BallSDK.test();
        const ent = testsdk.CategoryFortune();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.MAGIC8_BALL_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'category_fortune.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "category": { "a": true, "h": "Category", "n": "category", "r": true, "sh": "The category of the response", "t": "`$STRING`", "key$": "category", "index$": 0 }, "locale": { "a": true, "h": "Locale", "n": "locale", "op": { "load": { "req": false, "type": "`$STRING`" } }, "r": true, "sh": "The language code", "t": "`$STRING`", "key$": "locale", "index$": 1 }, "reading": { "a": true, "h": "Reading", "n": "reading", "r": true, "sh": "The Magic 8 Ball response from the specified category", "t": "`$STRING`", "key$": "reading", "index$": 2 } }, "name": "category_fortune", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/{category}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "category", "or": "category", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": "en", "k": "query", "n": "locale", "or": "locale", "r": false, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/{category}", "q": { "exist": ["category", "locale"] }, "r": {}, "s": [{ "lit": "api" }, { "var": "category" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /api", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "en", "k": "query", "n": "locale", "or": "locale", "r": false, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api", "q": { "exist": ["locale"] }, "r": {}, "s": [{ "lit": "api" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "category_fortune", "name__orig": "category_fortune", "Name": "CategoryFortune", "name_": "category_fortune", "name-": "category-fortune", "NAME": "CATEGORY_FORTUNE", "index$": 2 }, { "active": true, "entity": "category_fortune", "key$": "BasicCategoryFortuneFlow", "kind": "basic", "name": "BasicCategoryFortuneFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "category_fortune_ref01", "srcdatavar": "category_fortune_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-category_fortune_ref01" } }], "index$": 0 }] }, 'CategoryFortune', { "GET /api/{category}": { "protocol": "http", "operationId": "getSpecificCategory", "responses": { "200": { "description": "Successful response with a fortune from the specified category", "content": { "application/json": { "schema": { "type": "object", "properties": { "reading": { "type": "string", "description": "The Magic 8 Ball response from the specified category", "example": "It is Certain.", "key$": "reading" }, "category": { "type": "string", "description": "The category of the response", "enum": ["positive", "negative", "neutral"], "example": "positive", "key$": "category" }, "locale": { "type": "string", "description": "The language code", "example": "en", "key$": "locale" } }, "required": ["reading", "category", "locale"], "x-ref": "#/components/schemas/CategoryFortuneResponse", "index$": 0 }, "examples": { "positive": { "value": { "reading": "It is Certain.", "category": "positive", "locale": "en" } }, "negative": { "value": { "reading": "Don't count on it.", "category": "negative", "locale": "en" } } } } } }, "400": { "description": "Invalid category specified", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message", "example": "Rate limit exceeded" }, "message": { "type": "string", "description": "Detailed error description", "example": "You have exceeded the rate limit of 100 requests per minute" } }, "x-ref": "#/components/schemas/Error" } } } }, "429": { "description": "Rate limit exceeded", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message", "example": "Rate limit exceeded" }, "message": { "type": "string", "description": "Detailed error description", "example": "You have exceeded the rate limit of 100 requests per minute" } }, "x-ref": "#/components/schemas/Error" } } } } }, "parameters": [{ "name": "category", "in": "path", "description": "The category of response", "required": true, "schema": { "type": "string", "enum": ["positive", "negative", "neutral"] }, "index$": 0 }, { "name": "locale", "in": "query", "description": "The language code for response localization", "required": false, "schema": { "type": "string", "enum": ["en", "es", "fr", "de", "hi", "ru"], "default": "en" }, "index$": 1 }], "securitySource": "unspecified" }, "GET /api": { "protocol": "http", "operationId": "getRandomFortune", "responses": { "200": { "description": "Successful response with a random fortune", "content": { "application/json": { "schema": { "type": "object", "properties": { "reading": { "description": "The Magic 8 Ball response", "example": "Outlook good", "key$": "reading", "type": "string" }, "locale": { "description": "The language code (only included for non-default locale)", "example": "en", "key$": "locale", "type": "string" } }, "required": ["reading"], "x-ref": "#/components/schemas/RandomFortuneResponse", "index$": 0 }, "examples": { "default": { "value": { "reading": "Outlook good" } }, "localized": { "value": { "reading": "Las perspectivas son buenas", "locale": "es" } } } } } }, "429": { "description": "Rate limit exceeded (100 requests per minute per IP)", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message", "example": "Rate limit exceeded" }, "message": { "type": "string", "description": "Detailed error description", "example": "You have exceeded the rate limit of 100 requests per minute" } }, "x-ref": "#/components/schemas/Error" } } } } }, "parameters": [{ "name": "locale", "in": "query", "description": "The language code for response localization", "required": false, "schema": { "type": "string", "enum": ["en", "es", "fr", "de", "hi", "ru"], "default": "en" }, "index$": 0 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let category_fortune_ref01_data = Object.values(setup.data.existing.category_fortune)[0];
        // LOAD: skipped — no entity id field and load requires path params.
        // Entity-var is declared here so later flow steps still compile.
        const category_fortune_ref01_ent = client.CategoryFortune();
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/category_fortune/CategoryFortuneTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.Magic8BallSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['category_fortune01', 'category_fortune02', 'category_fortune03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'MAGIC8_BALL_TEST_CATEGORY_FORTUNE_ENTID': idmap,
        'MAGIC8_BALL_TEST_LIVE': 'FALSE',
        'MAGIC8_BALL_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['MAGIC8_BALL_TEST_CATEGORY_FORTUNE_ENTID'];
    const live = 'TRUE' === env.MAGIC8_BALL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['MAGIC8_BALL_TEST_CATEGORY_FORTUNE_ENTID'];
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
//# sourceMappingURL=CategoryFortuneEntity.test.js.map