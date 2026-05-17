package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/magic8-ball-sdk/go"
	"github.com/voxgig-sdk/magic8-ball-sdk/go/core"

	vs "github.com/voxgig-sdk/magic8-ball-sdk/go/utility/struct"
)

func TestCategoryFortuneEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.CategoryFortune(nil)
		if ent == nil {
			t.Fatal("expected non-nil CategoryFortuneEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := category_fortuneBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "category_fortune." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set MAGIC_BALL_TEST_CATEGORY_FORTUNE_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		categoryFortuneRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.category_fortune", setup.data)))
		var categoryFortuneRef01Data map[string]any
		if len(categoryFortuneRef01DataRaw) > 0 {
			categoryFortuneRef01Data = core.ToMapAny(categoryFortuneRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = categoryFortuneRef01Data

		// LOAD
		categoryFortuneRef01Ent := client.CategoryFortune(nil)
		categoryFortuneRef01MatchDt0 := map[string]any{}
		categoryFortuneRef01DataDt0Loaded, err := categoryFortuneRef01Ent.Load(categoryFortuneRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if categoryFortuneRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func category_fortuneBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "category_fortune", "CategoryFortuneTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read category_fortune test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse category_fortune test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"category_fortune01", "category_fortune02", "category_fortune03", "api01", "api02", "api03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("MAGIC_BALL_TEST_CATEGORY_FORTUNE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"MAGIC_BALL_TEST_CATEGORY_FORTUNE_ENTID": idmap,
		"MAGIC_BALL_TEST_LIVE":      "FALSE",
		"MAGIC_BALL_TEST_EXPLAIN":   "FALSE",
		"MAGIC_BALL_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["MAGIC_BALL_TEST_CATEGORY_FORTUNE_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["MAGIC_BALL_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["MAGIC_BALL_APIKEY"],
			},
			extra,
		})
		client = sdk.NewMagic8BallSDK(core.ToMapAny(mergedOpts))
	}

	live := env["MAGIC_BALL_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["MAGIC_BALL_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
