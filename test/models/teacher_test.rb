require 'test_helper'

class TeacherTest < ActiveSupport::TestCase
  test "should have a name" do
    t = Teacher.new
    t.name = ""
    t.surname = "cognome"
    t.link_cv = "link"
    assert_not t.save
  end

  test "should have a surname" do
    t = Teacher.new
    t.name = "nome"
    t.surname = ""
    t.link_cv = "link"
    assert_not t.save
  end

  test "should have a link" do
    t = Teacher.new
    t.name = "nome"
    t.surname = "cognome"
    t.link_cv = ""
    assert_not t.save
  end

end
