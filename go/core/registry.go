package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewBiasedEntityFunc func(client *Magic8BallSDK, entopts map[string]any) Magic8BallEntity

var NewCategoryEntityFunc func(client *Magic8BallSDK, entopts map[string]any) Magic8BallEntity

var NewCategoryFortuneEntityFunc func(client *Magic8BallSDK, entopts map[string]any) Magic8BallEntity

var NewRandomFortuneEntityFunc func(client *Magic8BallSDK, entopts map[string]any) Magic8BallEntity

