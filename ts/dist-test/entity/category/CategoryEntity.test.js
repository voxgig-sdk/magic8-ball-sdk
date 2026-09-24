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
(0, node_test_1.describe)('CategoryEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when MAGIC8_BALL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('MAGIC8_BALL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.Magic8BallSDK.test();
        const ent = testsdk.Category();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.MAGIC8_BALL_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'category.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "locale": { "a": true, "h": "Locale", "n": "locale", "r": true, "sh": "The language code", "t": "`$STRING`", "key$": "locale", "index$": 0 }, "negative": { "a": true, "h": "Negative", "n": "negative", "r": true, "sh": "List of negative responses", "t": "`$ARRAY`", "key$": "negative", "index$": 1 }, "neutral": { "a": true, "h": "Neutral", "n": "neutral", "r": true, "sh": "List of neutral responses", "t": "`$ARRAY`", "key$": "neutral", "index$": 2 }, "positive": { "a": true, "h": "Positive", "n": "positive", "r": true, "sh": "List of positive responses", "t": "`$ARRAY`", "key$": "positive", "index$": 3 } }, "name": "category", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/categories", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "en", "k": "query", "n": "locale", "or": "locale", "r": false, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/categories", "q": { "exist": ["locale"] }, "r": {}, "s": [{ "lit": "api" }, { "lit": "categories" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "category", "name__orig": "category", "Name": "Category", "name_": "category", "name-": "category", "NAME": "CATEGORY", "index$": 1 }, { "active": true, "entity": "category", "key$": "BasicCategoryFlow", "kind": "basic", "name": "BasicCategoryFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "category_ref01" } }], "index$": 0 }] }, 'Category', { "GET /api/categories": { "protocol": "http", "operationId": "getCategories", "responses": { "200": { "description": "Successful response with categorized fortunes", "content": { "application/json": { "schema": { "type": "object", "properties": { "positive": { "description": "List of positive responses", "example": ["It is Certain.", "It is decidedly so."], "items": { "type": "string" }, "key$": "positive", "type": "array" }, "neutral": { "description": "List of neutral responses", "example": ["Reply hazy, try again.", "Ask again later."], "items": { "type": "string" }, "key$": "neutral", "type": "array" }, "negative": { "description": "List of negative responses", "example": ["Don't count on it.", "My reply is no."], "items": { "type": "string" }, "key$": "negative", "type": "array" }, "locale": { "description": "The language code", "example": "en", "key$": "locale", "type": "string" } }, "required": ["positive", "neutral", "negative", "locale"], "x-ref": "#/components/schemas/CategoriesResponse", "index$": 0 }, "examples": { "default": { "value": { "positive": ["It is Certain.", "It is decidedly so."], "neutral": ["Reply hazy, try again.", "Ask again later."], "negative": ["Don't count on it.", "My reply is no."], "locale": "en" } } } } } }, "429": { "description": "Rate limit exceeded", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message", "example": "Rate limit exceeded" }, "message": { "type": "string", "description": "Detailed error description", "example": "You have exceeded the rate limit of 100 requests per minute" } }, "x-ref": "#/components/schemas/Error" } } } } }, "parameters": [{ "name": "locale", "in": "query", "description": "The language code for response localization", "required": false, "schema": { "type": "string", "enum": ["en", "es", "fr", "de", "hi", "ru"], "default": "en" }, "index$": 0 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let category_ref01_data = Object.values(setup.data.existing.category)[0];
        // LIST
        const category_ref01_ent = client.Category();
        const category_ref01_match = {};
        const category_ref01_list = (await category_ref01_ent.list(category_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/category/CategoryTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.Magic8BallSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['category01', 'category02', 'category03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'MAGIC8_BALL_TEST_CATEGORY_ENTID': idmap,
        'MAGIC8_BALL_TEST_LIVE': 'FALSE',
        'MAGIC8_BALL_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['MAGIC8_BALL_TEST_CATEGORY_ENTID'];
    const live = 'TRUE' === env.MAGIC8_BALL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['MAGIC8_BALL_TEST_CATEGORY_ENTID'];
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
//# sourceMappingURL=CategoryEntity.test.js.map