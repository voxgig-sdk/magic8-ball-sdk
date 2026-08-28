# Magic8Ball PHP SDK Reference

Complete API reference for the Magic8Ball PHP SDK.


## Magic8BallSDK

### Constructor

```php
require_once __DIR__ . '/magic8ball_sdk.php';

$client = new Magic8BallSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Magic8BallSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = Magic8BallSDK::test();
```


### Instance Methods

#### `Biased($data = null)`

Create a new `BiasedEntity` instance. Pass `null` for no initial data.

#### `Category($data = null)`

Create a new `CategoryEntity` instance. Pass `null` for no initial data.

#### `CategoryFortune($data = null)`

Create a new `CategoryFortuneEntity` instance. Pass `null` for no initial data.

#### `RandomFortune($data = null)`

Create a new `RandomFortuneEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): Magic8BallUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## BiasedEntity

```php
$biased = $client->Biased();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `calculation` | `array` | Yes | Calculation breakdown for sentiment |
| `comparative` | `float` | Yes | The comparative sentiment value |
| `locale` | `string` | No | The language code for response localization |
| `lucky` | `bool` | No | Whether to give a lucky response |
| `negative` | `array` | Yes | Negative sentiment words |
| `positive` | `array` | Yes | Positive sentiment words |
| `question` | `string` | Yes | The question to analyze for sentiment |
| `score` | `float` | Yes | The sentiment score |
| `tokens` | `array` | Yes | Tokenized words from the question |
| `words` | `array` | Yes | Sentiment-bearing words |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Biased()->create([
  "calculation" => null, // array
  "comparative" => null, // float
  "negative" => null, // array
  "positive" => null, // array
  "question" => null, // string
  "score" => null, // float
  "tokens" => null, // array
  "words" => null, // array
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Biased()->load(["question" => "question"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BiasedEntity`

Create a new `BiasedEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CategoryEntity

```php
$category = $client->Category();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `locale` | `string` | Yes | The language code |
| `negative` | `array` | Yes | List of negative responses |
| `neutral` | `array` | Yes | List of neutral responses |
| `positive` | `array` | Yes | List of positive responses |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Category()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CategoryEntity`

Create a new `CategoryEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CategoryFortuneEntity

```php
$category_fortune = $client->CategoryFortune();
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

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->CategoryFortune()->load(["category" => "category"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CategoryFortuneEntity`

Create a new `CategoryFortuneEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## RandomFortuneEntity

```php
$random_fortune = $client->RandomFortune();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): RandomFortuneEntity`

Create a new `RandomFortuneEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new Magic8BallSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
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

