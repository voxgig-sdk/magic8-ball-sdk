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
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
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
			},
		},
		"entity": map[string]any{
			"biased": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "calculation",
						"title": "Calculation",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Calculation breakdown for sentiment",
					},
					map[string]any{
						"name": "comparative",
						"title": "Comparative",
						"type": "`$NUMBER`",
						"req": true,
						"short": "The comparative sentiment value",
					},
					map[string]any{
						"name": "locale",
						"title": "Locale",
						"type": "`$STRING`",
						"short": "The language code for response localization",
					},
					map[string]any{
						"name": "lucky",
						"title": "Lucky",
						"type": "`$BOOLEAN`",
						"short": "Whether to give a lucky response",
					},
					map[string]any{
						"name": "negative",
						"title": "Negative",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Negative sentiment words",
					},
					map[string]any{
						"name": "positive",
						"title": "Positive",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Positive sentiment words",
					},
					map[string]any{
						"name": "question",
						"title": "Question",
						"type": "`$STRING`",
						"req": true,
						"short": "The question to analyze for sentiment",
					},
					map[string]any{
						"name": "score",
						"title": "Score",
						"type": "`$NUMBER`",
						"req": true,
						"short": "The sentiment score",
					},
					map[string]any{
						"name": "tokens",
						"title": "Tokens",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Tokenized words from the question",
					},
					map[string]any{
						"name": "words",
						"title": "Words",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Sentiment-bearing words",
					},
				},
				"name": "biased",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"api",
									"biased",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.sentiment`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"api",
									"biased",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.sentiment`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "locale",
											"orig": "locale",
											"type": "`$STRING`",
											"kind": "query",
											"example": "en",
										},
										map[string]any{
											"name": "lucky",
											"orig": "lucky",
											"type": "`$BOOLEAN`",
											"kind": "query",
											"example": false,
										},
										map[string]any{
											"name": "question",
											"orig": "question",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "Will I win the lottery?",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"locale",
										"lucky",
										"question",
									},
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
						"title": "Locale",
						"type": "`$STRING`",
						"req": true,
						"short": "The language code",
					},
					map[string]any{
						"name": "negative",
						"title": "Negative",
						"type": "`$ARRAY`",
						"req": true,
						"short": "List of negative responses",
					},
					map[string]any{
						"name": "neutral",
						"title": "Neutral",
						"type": "`$ARRAY`",
						"req": true,
						"short": "List of neutral responses",
					},
					map[string]any{
						"name": "positive",
						"title": "Positive",
						"type": "`$ARRAY`",
						"req": true,
						"short": "List of positive responses",
					},
				},
				"name": "category",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"api",
									"categories",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "locale",
											"orig": "locale",
											"type": "`$STRING`",
											"kind": "query",
											"example": "en",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"locale",
									},
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
						"title": "Category",
						"type": "`$STRING`",
						"req": true,
						"short": "The category of the response",
					},
					map[string]any{
						"name": "locale",
						"title": "Locale",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"load": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "The language code",
					},
					map[string]any{
						"name": "reading",
						"title": "Reading",
						"type": "`$STRING`",
						"req": true,
						"short": "The Magic 8 Ball response from the specified category",
					},
				},
				"name": "category_fortune",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"api",
									"{category}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "category",
											"orig": "category",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "locale",
											"orig": "locale",
											"type": "`$STRING`",
											"kind": "query",
											"example": "en",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"category",
										"locale",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
								},
								"parts": []any{
									"api",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "locale",
											"orig": "locale",
											"type": "`$STRING`",
											"kind": "query",
											"example": "en",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"locale",
									},
								},
							},
						},
					},
				},
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
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
