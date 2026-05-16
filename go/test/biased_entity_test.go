package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/magic8-ball-sdk"
	"github.com/voxgig-sdk/magic8-ball-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestBiasedEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Biased(nil)
		if ent == nil {
			t.Fatal("expected non-nil BiasedEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := biasedBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "biased." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set MAGIC_BALL_TEST_BIASED_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		biasedRef01Ent := client.Biased(nil)
		biasedRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "biased"}, setup.data), "biased_ref01"))

		biasedRef01DataResult, err := biasedRef01Ent.Create(biasedRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		biasedRef01Data = core.ToMapAny(biasedRef01DataResult)
		if biasedRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

		// LOAD
		biasedRef01MatchDt0 := map[string]any{}
		biasedRef01DataDt0Loaded, err := biasedRef01Ent.Load(biasedRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if biasedRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func biasedBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "biased", "BiasedTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read biased test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse biased test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"biased01", "biased02", "biased03"},
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
	entidEnvRaw := os.Getenv("MAGIC_BALL_TEST_BIASED_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"MAGIC_BALL_TEST_BIASED_ENTID": idmap,
		"MAGIC_BALL_TEST_LIVE":      "FALSE",
		"MAGIC_BALL_TEST_EXPLAIN":   "FALSE",
		"MAGIC_BALL_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["MAGIC_BALL_TEST_BIASED_ENTID"])
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
