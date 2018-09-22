require 'test_helper'

class CoursesControllerTest < ActionDispatch::IntegrationTest

  include Devise::Test::IntegrationHelpers

  def setup
    Rails.application.load_seed
  end

  test "should get index" do
    user = User.find_by_name("User User")
    sign_in user
    get allcourses_url
    assert_response :ok
  end

  test "redirect login" do
    get mycourses_path
    assert_response :redirect
  end

  test "set follow = true of Analisi 1 (id=1) and user user" do
    user = User.find_by_name("User User")
    sign_in user

    post follow_url, params: {'user_course[course_id]' => 1, 'user_course[follow]' => true}
    assert_response :created
  end


  # test "the truth" do
  #   assert true
  # end
end
