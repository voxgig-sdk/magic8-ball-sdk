// Typed models for the Magic8Ball SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Biased is the typed data model for the biased entity.
type Biased struct {
	Locale string `json:"locale"`
	Lucky bool `json:"lucky"`
	Question string `json:"question"`
	Reading string `json:"reading"`
	Sentiment map[string]any `json:"sentiment"`
}

// BiasedLoadMatch is the typed request payload for Biased.LoadTyped.
type BiasedLoadMatch struct {
	Locale *string `json:"locale,omitempty"`
	Lucky *bool `json:"lucky,omitempty"`
	Question *string `json:"question,omitempty"`
	Reading *string `json:"reading,omitempty"`
	Sentiment *map[string]any `json:"sentiment,omitempty"`
}

// BiasedCreateData is the typed request payload for Biased.CreateTyped.
type BiasedCreateData struct {
	Locale string `json:"locale"`
	Lucky bool `json:"lucky"`
	Question string `json:"question"`
	Reading string `json:"reading"`
	Sentiment map[string]any `json:"sentiment"`
}

// Category is the typed data model for the category entity.
type Category struct {
	Locale string `json:"locale"`
	Negative []any `json:"negative"`
	Neutral []any `json:"neutral"`
	Positive []any `json:"positive"`
}

// CategoryListMatch is the typed request payload for Category.ListTyped.
type CategoryListMatch struct {
	Locale *string `json:"locale,omitempty"`
	Negative *[]any `json:"negative,omitempty"`
	Neutral *[]any `json:"neutral,omitempty"`
	Positive *[]any `json:"positive,omitempty"`
}

// CategoryFortune is the typed data model for the category_fortune entity.
type CategoryFortune struct {
	Category string `json:"category"`
	Locale string `json:"locale"`
	Reading string `json:"reading"`
}

// CategoryFortuneLoadMatch is the typed request payload for CategoryFortune.LoadTyped.
type CategoryFortuneLoadMatch struct {
	Category *string `json:"category,omitempty"`
}

// RandomFortune is the typed data model for the random_fortune entity.
type RandomFortune struct {
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
