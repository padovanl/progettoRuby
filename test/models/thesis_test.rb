require 'test_helper'

class ThesisTest < ActiveSupport::TestCase
  test "should have a title" do
    t = Thesis.new
    t.title = ""
    t.content = "contenuto"
    t.teacher = Teacher.first
    t.id = 100
    assert_not t.save
  end

  test "should have a content" do
    t = Thesis.new
    t.title = "titolo"
    t.content = ""
    t.teacher = Teacher.first
    t.id = 100
    assert_not t.save
  end
end
