class WelcomeController < ApplicationController
  def index
    if !user_signed_in? then
      redirect_to new_user_session_url
    else
      redirect_to mycourses_url
    end
  end

  def jsDisabled
    render 'welcome/jsDisabled', layout: false
  end
end
