# Magic8Ball SDK

Ask a yes/no question and get a mystical Magic 8-Ball fortune in return

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Magic 8-Ball API

The Magic 8-Ball API is a small, free fortune-telling service hosted at [eightballapi.com](https://eightballapi.com). It mimics the classic Magic 8-Ball toy, returning random or sentiment-aware yes/no/maybe-style readings to questions you send it.

What you get from the API:

- A random Magic 8-Ball reading from `GET /api`
- A sentiment-biased reading via `POST /api/biased`, which analyses the wording of your `question` and chooses a fortune that matches its tone (positive, negative or neutral)
- All available fortunes grouped by category from `GET /api/categories`
- Optional `locale` parameter for non-English readings (for example `locale=fr`)
- Optional `lucky` flag on the biased endpoint

Responses are JSON and include the `reading`, the original `question`, a `sentiment` breakdown (score, comparative value, tokens, word categorisation), `locale` and `lucky` fields. No authentication is required and CORS / rate-limit details are not explicitly published.

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

## 30-second quickstart

### TypeScript

```ts
import { Magic8BallSDK } from 'magic8-ball'

const client = new Magic8BallSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

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
| **Biased** | Sentiment-aware fortune endpoint that picks a reading based on the tone of the submitted question, served from `POST /api/biased`. | `/api/biased` |
| **Category** | Grouping of all possible Magic 8-Ball responses by sentiment category (positive, negative, neutral), exposed via `GET /api/categories`. | `/api/categories` |
| **CategoryFortune** | An individual fortune string belonging to one of the sentiment categories returned by `GET /api/categories`. | `/api/{category}` |
| **RandomFortune** | A single random Magic 8-Ball reading with no question analysis, returned by `GET /api`. | `` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from magic8ball_sdk import Magic8BallSDK

client = Magic8BallSDK({})


# Load a specific biased
biased, err = client.Biased(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'magic8ball_sdk.php';

$client = new Magic8BallSDK([]);


// Load a specific biased
[$biased, $err] = $client->Biased(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/magic8-ball-sdk/go"

client := sdk.NewMagic8BallSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "Magic8Ball_sdk"

client = Magic8BallSDK.new({})


# Load a specific biased
biased, err = client.Biased(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("magic8-ball_sdk")

local client = sdk.new({})


-- Load a specific biased
local biased, err = client:Biased(nil):load(
  { id = "example_id" }, nil
)
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
client = Magic8BallSDK.test(None, None)
result, err = client.Biased(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = Magic8BallSDK::test(null, null);
[$result, $err] = $client->Biased(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Biased(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = Magic8BallSDK.test(nil, nil)
result, err = client.Biased(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Biased(nil):load(
  { id = "test01" }, nil
)
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

## Using the Magic 8-Ball API

- Upstream: [https://eightballapi.com](https://eightballapi.com)

- Free to use for everyone, with no authentication required
- No API key needed to call any endpoint
- Operated by the maintainers of eightballapi.com; please use responsibly
- Rate limits are not publicly documented

---

Generated from the Magic 8-Ball API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
