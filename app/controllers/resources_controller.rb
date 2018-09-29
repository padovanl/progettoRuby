class ResourcesController < ApplicationController
  before_action :authenticate_user!
  before_action ->(pram=params[:id]) { user_follow_course pram }, only: [:show]

  def show
    @course = Course.find(params[:id])
    if params['document_id']
      @document = Document.find(params['document_id'])
    end
  end
end
