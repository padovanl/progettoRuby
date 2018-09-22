class ResourcesController < ApplicationController
  before_action :authenticate_user!

  def show
    @course = Course.find(params[:id])
    user_follow_course?
  end
end
