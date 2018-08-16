class UpvotesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_upvote, only: [:destroy]

  def create
    @upvote = Upvote.new()
    @upvote.post_id = params['post_id']
    @upvote.user_id = current_user.id

    if @upvote.save
      json_response(@upvote.to_json, :created)
    else
    end
  end


  def destroy
    if(@upvote.user_id == current_user.id)
      @upvote.destroy
    end
  end

  private
    def set_upvote
      @upvote = Upvote.find(params[:id])
    end
end
