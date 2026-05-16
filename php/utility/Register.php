<?php
declare(strict_types=1);

// Magic8Ball SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

Magic8BallUtility::setRegistrar(function (Magic8BallUtility $u): void {
    $u->clean = [Magic8BallClean::class, 'call'];
    $u->done = [Magic8BallDone::class, 'call'];
    $u->make_error = [Magic8BallMakeError::class, 'call'];
    $u->feature_add = [Magic8BallFeatureAdd::class, 'call'];
    $u->feature_hook = [Magic8BallFeatureHook::class, 'call'];
    $u->feature_init = [Magic8BallFeatureInit::class, 'call'];
    $u->fetcher = [Magic8BallFetcher::class, 'call'];
    $u->make_fetch_def = [Magic8BallMakeFetchDef::class, 'call'];
    $u->make_context = [Magic8BallMakeContext::class, 'call'];
    $u->make_options = [Magic8BallMakeOptions::class, 'call'];
    $u->make_request = [Magic8BallMakeRequest::class, 'call'];
    $u->make_response = [Magic8BallMakeResponse::class, 'call'];
    $u->make_result = [Magic8BallMakeResult::class, 'call'];
    $u->make_point = [Magic8BallMakePoint::class, 'call'];
    $u->make_spec = [Magic8BallMakeSpec::class, 'call'];
    $u->make_url = [Magic8BallMakeUrl::class, 'call'];
    $u->param = [Magic8BallParam::class, 'call'];
    $u->prepare_auth = [Magic8BallPrepareAuth::class, 'call'];
    $u->prepare_body = [Magic8BallPrepareBody::class, 'call'];
    $u->prepare_headers = [Magic8BallPrepareHeaders::class, 'call'];
    $u->prepare_method = [Magic8BallPrepareMethod::class, 'call'];
    $u->prepare_params = [Magic8BallPrepareParams::class, 'call'];
    $u->prepare_path = [Magic8BallPreparePath::class, 'call'];
    $u->prepare_query = [Magic8BallPrepareQuery::class, 'call'];
    $u->result_basic = [Magic8BallResultBasic::class, 'call'];
    $u->result_body = [Magic8BallResultBody::class, 'call'];
    $u->result_headers = [Magic8BallResultHeaders::class, 'call'];
    $u->transform_request = [Magic8BallTransformRequest::class, 'call'];
    $u->transform_response = [Magic8BallTransformResponse::class, 'call'];
});
