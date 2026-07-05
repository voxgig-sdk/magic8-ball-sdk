# Magic8Ball Ruby SDK Reference

Complete API reference for the Magic8Ball Ruby SDK.


## Magic8BallSDK

### Constructor

```ruby
require_relative 'Magic8Ball_sdk'

client = Magic8BallSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Magic8BallSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = Magic8BallSDK.test
```


### Instance Methods

#### `Biased(data = nil)`

Create a new `Biased` entity instance. Pass `nil` for no initial data.

#### `Category(data = nil)`

Create a new `Category` entity instance. Pass `nil` for no initial data.

#### `CategoryFortune(data = nil)`

Create a new `CategoryFortune` entity instance. Pass `nil` for no initial data.

#### `RandomFortune(data = nil)`

Create a new `RandomFortune` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## BiasedEntity

```ruby
biased = client.Biased
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `locale` | `String` | Yes |  |
| `lucky` | `Boolean` | Yes |  |
| `question` | `String` | Yes |  |
| `reading` | `String` | Yes |  |
| `sentiment` | `Hash` | Yes |  |

### Field Usage by Operation

| Field | load | create |
| --- | --- | --- |
| `locale` | - | Yes |
| `lucky` | - | Yes |
| `question` | - | - |
| `reading` | - | - |
| `sentiment` | - | - |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Biased.create({
  "locale" => "example", # String
  "lucky" => true, # Boolean
  "question" => "example", # String
  "reading" => "example", # String
  "sentiment" => {}, # Hash
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Biased.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BiasedEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CategoryEntity

```ruby
category = client.Category
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `locale` | `String` | Yes |  |
| `negative` | `Array` | Yes |  |
| `neutral` | `Array` | Yes |  |
| `positive` | `Array` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Category.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CategoryEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CategoryFortuneEntity

```ruby
category_fortune = client.CategoryFortune
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `category` | `String` | Yes |  |
| `locale` | `String` | Yes |  |
| `reading` | `String` | Yes |  |

### Field Usage by Operation

| Field | load |
| --- | --- |
| `category` | - |
| `locale` | Yes |
| `reading` | - |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.CategoryFortune.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CategoryFortuneEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## RandomFortuneEntity

```ruby
random_fortune = client.RandomFortune
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `RandomFortuneEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = Magic8BallSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

