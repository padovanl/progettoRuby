require "test_helper"

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  driven_by :selenium, using: :firefox#:chrome, screen_size: [1400, 1400]

  include Devise::Test::IntegrationHelpers

end
