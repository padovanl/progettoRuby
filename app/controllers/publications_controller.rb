class PublicationsController < ApplicationController
  before_action :authenticate_user!

  def show
    @course = Course.find(params[:id])
    user_follow_course?
    @current_user_avatar = get_avatar_image

    # Questi paramentri permetto di visualizzare un singolo post, in base al post_id
    # o ad un commento che appartiene ad un post
    if params['post_id']
      @post = Post.find(params['post_id'])
    end
    if params['comment_id']
      @comment = Comment.find(params['comment_id'])
    end
  end

  private

  def get_avatar_image
    if current_user.avatar.attached?
      return rails_representation_url(current_user.avatar.variant(resize: "100x100"), only_path: true)
    elsif not current_user.image.blank?
      return current_user.image
    else
      return ActionController::Base.helpers.asset_path("dragon.png")
    end
  end
end
