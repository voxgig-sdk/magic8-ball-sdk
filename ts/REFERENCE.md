# Magic8Ball TypeScript SDK Reference

Complete API reference for the Magic8Ball TypeScript SDK.


## Magic8BallSDK

### Constructor

```ts
new Magic8BallSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Magic8BallSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = Magic8BallSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `Magic8BallSDK` instance in test mode.


### Instance Methods

#### `Biased(data?: object)`

Create a new `Biased` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BiasedEntity` instance.

#### `Category(data?: object)`

Create a new `Category` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CategoryEntity` instance.

#### `CategoryFortune(data?: object)`

Create a new `CategoryFortune` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CategoryFortuneEntity` instance.

#### `RandomFortune(data?: object)`

Create a new `RandomFortune` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RandomFortuneEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `Magic8BallSDK.test()`.

**Returns:** `Magic8BallSDK` instance in test mode.


---

## BiasedEntity

```ts
const biased = client.Biased()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `calculation` | `any[]` | Yes | Calculation breakdown for sentiment |
| `comparative` | `number` | Yes | The comparative sentiment value |
| `locale` | `string` | No | The language code for response localization |
| `lucky` | `boolean` | No | Whether to give a lucky response |
| `negative` | `any[]` | Yes | Negative sentiment words |
| `positive` | `any[]` | Yes | Positive sentiment words |
| `question` | `string` | Yes | The question to analyze for sentiment |
| `score` | `number` | Yes | The sentiment score |
| `tokens` | `any[]` | Yes | Tokenized words from the question |
| `words` | `any[]` | Yes | Sentiment-bearing words |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Biased().create({
  calculation: [],
  comparative: 1,
  negative: [],
  positive: [],
  question: 'example_question',
  score: 1,
  tokens: [],
  words: [],
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Biased().load({ question: 'question' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BiasedEntity` instance with the same client and
options.

#### `client()`

Return the parent `Magic8BallSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CategoryEntity

```ts
const category = client.Category()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `locale` | `string` | Yes | The language code |
| `negative` | `any[]` | Yes | List of negative responses |
| `neutral` | `any[]` | Yes | List of neutral responses |
| `positive` | `any[]` | Yes | List of positive responses |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Category().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CategoryEntity` instance with the same client and
options.

#### `client()`

Return the parent `Magic8BallSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CategoryFortuneEntity

```ts
const category_fortune = client.CategoryFortune()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `category` | `string` | Yes | The category of the response |
| `locale` | `string` | Yes | The language code |
| `reading` | `string` | Yes | The Magic 8 Ball response from the specified category |

### Field Usage by Operation

| Field | load |
| --- | --- |
| `category` | - |
| `locale` | Yes |
| `reading` | - |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.CategoryFortune().load({ category: 'category' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CategoryFortuneEntity` instance with the same client and
options.

#### `client()`

Return the parent `Magic8BallSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RandomFortuneEntity

```ts
const random_fortune = client.RandomFortune()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RandomFortuneEntity` instance with the same client and
options.

#### `client()`

Return the parent `Magic8BallSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new Magic8BallSDK({
  feature: {
    test: { active: true },
  }
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

