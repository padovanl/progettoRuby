require 'test_helper'

class RepTest < ActiveSupport::TestCase
  test "should have a description" do
   rep = Rep.new
   rep.description = ""
   rep.user = User.first
   rep.course = Course.first
   rep.price_hours = 15.00

    assert_not rep.save
  end

  test "should have a price" do
    rep = Rep.new
    rep.description = "descrizione"
    rep.user = User.first
    rep.course = Course.first
    rep.price_hours = nil

    assert_not rep.save
  end

  test "price should be between 0 and 10000" do
    rep = Rep.new
    rep.description = "descrizione"
    rep.user = User.first
    rep.course = Course.first
    rep.price_hours = 1000000

    assert_not rep.save
  end
end
