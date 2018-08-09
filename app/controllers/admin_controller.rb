class AdminController < ApplicationController
  before_action :authenticate_user!

  def dashboard
    isAdmin = current_user.admin
    if isAdmin then
      render 'dashboard'
    else
      render 'admin/accessDenied', layout: false
    end

  end
end