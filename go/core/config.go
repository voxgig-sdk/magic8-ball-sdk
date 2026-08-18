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
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
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
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "comparative",
						"req": true,
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "locale",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "lucky",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "negative",
						"req": true,
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "positive",
						"req": true,
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "question",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "score",
						"req": true,
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "tokens",
						"req": true,
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "words",
						"req": true,
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
								"parts": []any{
									"api",
									"biased",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.sentiment`",
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
								"parts": []any{
									"api",
									"biased",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "negative",
						"req": true,
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "neutral",
						"req": true,
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "positive",
						"req": true,
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
								"parts": []any{
									"api",
									"categories",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "reading",
						"req": true,
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
								"parts": []any{
									"api",
									"{category}",
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
								"parts": []any{
									"api",
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
