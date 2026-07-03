# Magic8Ball SDK

Magic 8-Ball API client, generated from the OpenAPI spec.

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## Try it

**TypeScript**
```bash
npm install magic8-ball
```

**Python**
```bash
pip install magic8-ball-sdk
```

**PHP**
```bash
composer require voxgig/magic8-ball-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/magic8-ball-sdk/go
```

**Ruby**
```bash
gem install magic8-ball-sdk
```

**Lua**
```bash
luarocks install magic8-ball-sdk
```

## Quickstart

### TypeScript

```ts
import { Magic8BallSDK } from 'magic8-ball'

const client = new Magic8BallSDK({
  apikey: process.env.MAGIC8-BALL_APIKEY,
})

// Load biased data
const biased = await client.Biased().load({})
console.log(biased.data)
```

See the [TypeScript README](ts/README.md) for the full guide.

## Surfaces

| Surface | Path |
| --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | `go-cli/` |
| **MCP server** | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o magic8-ball-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "magic8-ball": {
      "command": "/abs/path/to/magic8-ball-mcp"
    }
  }
}
```

## Entities

The API exposes 4 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Biased** |  | `/api/biased` |
| **Category** |  | `/api/categories` |
| **CategoryFortune** |  | `/api/{category}` |
| **RandomFortune** |  | `` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
import os
from magic8ball_sdk import Magic8BallSDK

client = Magic8BallSDK({
    "apikey": os.environ.get("MAGIC8-BALL_APIKEY"),
})


# Load a specific biased
biased, err = client.Biased().load({"id": "example_id"})
print(biased)
```

### PHP

```php
<?php
require_once 'magic8ball_sdk.php';

$client = new Magic8BallSDK([
    "apikey" => getenv("MAGIC8-BALL_APIKEY"),
]);


// Load a specific biased
[$biased, $err] = $client->Biased()->load(["id" => "example_id"]);
print_r($biased);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/magic8-ball-sdk/go"

client := sdk.NewMagic8BallSDK(map[string]any{
    "apikey": os.Getenv("MAGIC8-BALL_APIKEY"),
})

// Load biased data
biased, err := client.Biased(nil).Load(map[string]any{}, nil)
fmt.Println(biased)
```

### Ruby

```ruby
require_relative "Magic8Ball_sdk"

client = Magic8BallSDK.new({
  "apikey" => ENV["MAGIC8-BALL_APIKEY"],
})


# Load a specific biased
biased, err = client.Biased().load({ "id" => "example_id" })
puts biased
```

### Lua

```lua
local sdk = require("magic8-ball_sdk")

local client = sdk.new({
  apikey = os.getenv("MAGIC8-BALL_APIKEY"),
})


-- Load a specific biased
local biased, err = client:Biased():load({ id = "example_id" })
print(biased)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = Magic8BallSDK.test()
const result = await client.Biased().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = Magic8BallSDK.test()
result, err = client.Biased().load({"id": "test01"})
```

### PHP

```php
$client = Magic8BallSDK::test();
[$result, $err] = $client->Biased()->load(["id" => "test01"]);
```

### Golang

```go
client := sdk.Test()
result, err := client.Biased(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = Magic8BallSDK.test
result, err = client.Biased().load({ "id" => "test01" })
```

### Lua

```lua
local client = sdk.test()
local result, err = client:Biased():load({ id = "test01" })
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

---

Generated from the Magic 8-Ball API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
