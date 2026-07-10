# Magic8Ball Golang SDK Reference

Complete API reference for the Magic8Ball Golang SDK.


## Magic8BallSDK

### Constructor

```go
func NewMagic8BallSDK(options map[string]any) *Magic8BallSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *Magic8BallSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *Magic8BallSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Biased(data map[string]any) Magic8BallEntity`

Create a new `Biased` entity instance. Pass `nil` for no initial data.

#### `Category(data map[string]any) Magic8BallEntity`

Create a new `Category` entity instance. Pass `nil` for no initial data.

#### `CategoryFortune(data map[string]any) Magic8BallEntity`

Create a new `CategoryFortune` entity instance. Pass `nil` for no initial data.

#### `RandomFortune(data map[string]any) Magic8BallEntity`

Create a new `RandomFortune` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## BiasedEntity

```go
biased := client.Biased(nil)
fmt.Println(biased.GetName()) // "biased"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `locale` | `string` | Yes |  |
| `lucky` | `bool` | Yes |  |
| `question` | `string` | Yes |  |
| `reading` | `string` | Yes |  |
| `sentiment` | `map[string]any` | Yes |  |

### Field Usage by Operation

| Field | load | create |
| --- | --- | --- |
| `locale` | - | Yes |
| `lucky` | - | Yes |
| `question` | - | - |
| `reading` | - | - |
| `sentiment` | - | - |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Biased(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Biased(nil).Create(map[string]any{
    "locale": "example_locale",
    "lucky": true,
    "question": "example_question",
    "reading": "example_reading",
    "sentiment": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BiasedEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CategoryEntity

```go
category := client.Category(nil)
fmt.Println(category.GetName()) // "category"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `locale` | `string` | Yes |  |
| `negative` | `[]any` | Yes |  |
| `neutral` | `[]any` | Yes |  |
| `positive` | `[]any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Category(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CategoryEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CategoryFortuneEntity

```go
categoryFortune := client.CategoryFortune(nil)
fmt.Println(categoryFortune.GetName()) // "category_fortune"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `category` | `string` | Yes |  |
| `locale` | `string` | Yes |  |
| `reading` | `string` | Yes |  |

### Field Usage by Operation

| Field | load |
| --- | --- |
| `category` | - |
| `locale` | Yes |
| `reading` | - |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.CategoryFortune(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CategoryFortuneEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## RandomFortuneEntity

```go
randomFortune := client.RandomFortune(nil)
fmt.Println(randomFortune.GetName()) // "random_fortune"
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `RandomFortuneEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewMagic8BallSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

