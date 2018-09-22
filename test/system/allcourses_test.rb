require "application_system_test_case"

class AllcoursesTest < ApplicationSystemTestCase

  def setup
    Rails.application.load_seed
  end

   test "visiting the allcourses" do
     user = User.first
     sign_in user

     visit allcourses_url

     assert_selector "h2", text: "Corsi disponibili"
   end

  test "allcourses, redirect to login, redirect to allcourses and then click on All" do
    visit allcourses_url

    take_screenshot
    #login
    fill_in "user[email]", with: "user@user.com"
    fill_in "user[password]", with: "123123"

    take_screenshot
    click_on "Log in"

    #go to allcourses (redirect)
    take_screenshot
    click_on "All"

    assert true
  end


end
