# CategoryFortune direct test

require "minitest/autorun"
require "json"
require_relative "../Magic8Ball_sdk"
require_relative "runner"

class CategoryFortuneDirectTest < Minitest::Test
  def test_direct_load_category_fortune
    setup = category_fortune_direct_setup({ "id" => "direct01" })
    _should_skip, _reason = Runner.is_control_skipped("direct", "direct-load-category_fortune", setup[:live] ? "live" : "unit")
    if _should_skip
      skip(_reason || "skipped via sdk-test-control.json")
      return
    end
    if setup[:live]
      skip "live direct-load needs real ID — set *_ENTID env var with real IDs to run"
      return
    end
    client = setup[:client]

    params = {}
    query = {}
    unless setup[:live]
      params["category"] = "direct01"
    end

    result, err = client.direct({
      "path" => "api/{category}",
      "method" => "GET",
      "params" => params,
      "query" => query,
    })
    if setup[:live]
      # Live mode is lenient: synthetic IDs frequently 4xx. Skip rather
      # than fail when the load endpoint isn't reachable with the IDs
      # we can construct from setup.idmap.
      if !err.nil?
        skip("load call failed (likely synthetic IDs against live API): #{err}")
        return
      end
      unless result["ok"]
        skip("load call not ok (likely synthetic IDs against live API)")
        return
      end
      status = Helpers.to_int(result["status"])
      if status < 200 || status >= 300
        skip("expected 2xx status, got #{status}")
        return
      end
    else
      assert_nil err
      assert result["ok"]
      assert_equal 200, Helpers.to_int(result["status"])
      assert !result["data"].nil?
      if result["data"].is_a?(Hash)
        assert_equal "direct01", result["data"]["id"]
      end
      assert_equal 1, setup[:calls].length
    end
  end

end


def category_fortune_direct_setup(mockres)
  Runner.load_env_local

  calls = []

  env = Runner.env_override({
    "MAGIC_BALL_TEST_CATEGORY_FORTUNE_ENTID" => {},
    "MAGIC_BALL_TEST_LIVE" => "FALSE",
    "MAGIC_BALL_APIKEY" => "NONE",
  })

  live = env["MAGIC_BALL_TEST_LIVE"] == "TRUE"

  if live
    merged_opts = {
      "apikey" => env["MAGIC_BALL_APIKEY"],
    }
    client = Magic8BallSDK.new(merged_opts)
    return {
      client: client,
      calls: calls,
      live: true,
      idmap: {},
    }
  end

  mock_fetch = ->(url, init) {
    calls.push({ "url" => url, "init" => init })
    return {
      "status" => 200,
      "statusText" => "OK",
      "headers" => {},
      "json" => ->() {
        if !mockres.nil?
          return mockres
        end
        return { "id" => "direct01" }
      },
      "body" => "mock",
    }, nil
  }

  client = Magic8BallSDK.new({
    "base" => "http://localhost:8080",
    "system" => {
      "fetch" => mock_fetch,
    },
  })

  {
    client: client,
    calls: calls,
    live: false,
    idmap: {},
  }
end
