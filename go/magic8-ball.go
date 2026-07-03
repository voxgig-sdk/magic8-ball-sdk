package voxgigmagic8ballsdk

import (
	"github.com/voxgig-sdk/magic8-ball-sdk/go/core"
	"github.com/voxgig-sdk/magic8-ball-sdk/go/entity"
	"github.com/voxgig-sdk/magic8-ball-sdk/go/feature"
	_ "github.com/voxgig-sdk/magic8-ball-sdk/go/utility"
)

// Type aliases preserve external API.
type Magic8BallSDK = core.Magic8BallSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type Magic8BallEntity = core.Magic8BallEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type Magic8BallError = core.Magic8BallError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewBiasedEntityFunc = func(client *core.Magic8BallSDK, entopts map[string]any) core.Magic8BallEntity {
		return entity.NewBiasedEntity(client, entopts)
	}
	core.NewCategoryEntityFunc = func(client *core.Magic8BallSDK, entopts map[string]any) core.Magic8BallEntity {
		return entity.NewCategoryEntity(client, entopts)
	}
	core.NewCategoryFortuneEntityFunc = func(client *core.Magic8BallSDK, entopts map[string]any) core.Magic8BallEntity {
		return entity.NewCategoryFortuneEntity(client, entopts)
	}
	core.NewRandomFortuneEntityFunc = func(client *core.Magic8BallSDK, entopts map[string]any) core.Magic8BallEntity {
		return entity.NewRandomFortuneEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewMagic8BallSDK = core.NewMagic8BallSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewMagic8BallSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *Magic8BallSDK  { return NewMagic8BallSDK(nil) }
func Test() *Magic8BallSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
