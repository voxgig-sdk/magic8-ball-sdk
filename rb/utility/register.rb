# Magic8Ball SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

Magic8BallUtility.registrar = ->(u) {
  u.clean = Magic8BallUtilities::Clean
  u.done = Magic8BallUtilities::Done
  u.make_error = Magic8BallUtilities::MakeError
  u.feature_add = Magic8BallUtilities::FeatureAdd
  u.feature_hook = Magic8BallUtilities::FeatureHook
  u.feature_init = Magic8BallUtilities::FeatureInit
  u.fetcher = Magic8BallUtilities::Fetcher
  u.make_fetch_def = Magic8BallUtilities::MakeFetchDef
  u.make_context = Magic8BallUtilities::MakeContext
  u.make_options = Magic8BallUtilities::MakeOptions
  u.make_request = Magic8BallUtilities::MakeRequest
  u.make_response = Magic8BallUtilities::MakeResponse
  u.make_result = Magic8BallUtilities::MakeResult
  u.make_point = Magic8BallUtilities::MakePoint
  u.make_spec = Magic8BallUtilities::MakeSpec
  u.make_url = Magic8BallUtilities::MakeUrl
  u.param = Magic8BallUtilities::Param
  u.prepare_auth = Magic8BallUtilities::PrepareAuth
  u.prepare_body = Magic8BallUtilities::PrepareBody
  u.prepare_headers = Magic8BallUtilities::PrepareHeaders
  u.prepare_method = Magic8BallUtilities::PrepareMethod
  u.prepare_params = Magic8BallUtilities::PrepareParams
  u.prepare_path = Magic8BallUtilities::PreparePath
  u.prepare_query = Magic8BallUtilities::PrepareQuery
  u.result_basic = Magic8BallUtilities::ResultBasic
  u.result_body = Magic8BallUtilities::ResultBody
  u.result_headers = Magic8BallUtilities::ResultHeaders
  u.transform_request = Magic8BallUtilities::TransformRequest
  u.transform_response = Magic8BallUtilities::TransformResponse
}
