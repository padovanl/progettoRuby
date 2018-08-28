class TagsController < ApplicationController
  before_action :authenticate_user!

  def index
    tags = Tag.reduce(params).order(created_at: :desc)
    render json: tags
  end
end
