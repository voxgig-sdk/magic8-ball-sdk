package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Magic8Ball",
			"slug": "magic8-ball",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://eightballapi.com",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"biased": map[string]any{},
				"category": map[string]any{},
				"category_fortune": map[string]any{},
				"random_fortune": map[string]any{},
			},
		},
		"entity": map[string]any{
			"biased": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "calculation",
						"req": true,
						"short": "Calculation breakdown for sentiment",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "comparative",
						"req": true,
						"short": "The comparative sentiment value",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "locale",
						"short": "The language code for response localization",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "lucky",
						"short": "Whether to give a lucky response",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "negative",
						"req": true,
						"short": "Negative sentiment words",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "positive",
						"req": true,
						"short": "Positive sentiment words",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "question",
						"req": true,
						"short": "The question to analyze for sentiment",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "score",
						"req": true,
						"short": "The sentiment score",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "tokens",
						"req": true,
						"short": "Tokenized words from the question",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "words",
						"req": true,
						"short": "Sentiment-bearing words",
						"type": "`$ARRAY`",
					},
				},
				"name": "biased",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/api/biased",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "biased",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.sentiment`",
								},
								"parts": []any{
									"api",
									"biased",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "en",
											"kind": "query",
											"name": "locale",
											"orig": "locale",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": false,
											"kind": "query",
											"name": "lucky",
											"orig": "lucky",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"example": "Will I win the lottery?",
											"kind": "query",
											"name": "question",
											"orig": "question",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/biased",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "biased",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"locale",
										"lucky",
										"question",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.sentiment`",
								},
								"parts": []any{
									"api",
									"biased",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"category": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "locale",
						"req": true,
						"short": "The language code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "negative",
						"req": true,
						"short": "List of negative responses",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "neutral",
						"req": true,
						"short": "List of neutral responses",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "positive",
						"req": true,
						"short": "List of positive responses",
						"type": "`$ARRAY`",
					},
				},
				"name": "category",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "en",
											"kind": "query",
											"name": "locale",
											"orig": "locale",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/categories",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "categories",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"locale",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"categories",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"category_fortune": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "category",
						"req": true,
						"short": "The category of the response",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "locale",
						"op": map[string]any{
							"load": map[string]any{
								"type": "`$STRING`",
							},
						},
						"req": true,
						"short": "The language code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "reading",
						"req": true,
						"short": "The Magic 8 Ball response from the specified category",
						"type": "`$STRING`",
					},
				},
				"name": "category_fortune",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "category",
											"orig": "category",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"example": "en",
											"kind": "query",
											"name": "locale",
											"orig": "locale",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/{category}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"var": "category",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"category",
										"locale",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"{category}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "en",
											"kind": "query",
											"name": "locale",
											"orig": "locale",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"locale",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"api",
						},
					},
				},
			},
			"random_fortune": map[string]any{
				"fields": []any{},
				"name": "random_fortune",
				"op": map[string]any{},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
