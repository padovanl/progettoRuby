class WelcomeController < ApplicationController
  def index
    if !user_signed_in? then
      redirect_to new_user_session_url
    end #TODO dove lo mandiamo altrimenti?
  end

  def jsDisabled
    render 'welcome/jsDisabled', layout: false
  end
end
