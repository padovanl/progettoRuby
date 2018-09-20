require 'test_helper'

class DocumentTest < ActiveSupport::TestCase
  test "should have a file_name" do
    document = Document.new
    document.user = User.first
    document.course = Course.first
    document.file_name = ""
    assert_not document.save
  end
end
