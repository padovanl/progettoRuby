class ResourcesController < ApplicationController
  before_action :authenticate_user!

  def show
    @course = Course.find(params[:id])
    user_follow_course?

    if params['document_id']
      @document = Document.find(params['document_id'])
    end
  end
end
