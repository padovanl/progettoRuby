class PublicationsController < ApplicationController
  before_action :authenticate_user!
  def index
    @current_user_avatar = get_avatar_image
  end

  private

  def get_avatar_image
    if current_user.avatar.attached?
      return rails_representation_url(current_user.avatar.variant(resize: "100x100"), only_path: true)
    elsif current_user.image.blank?
      return current_user.image
    end
  end
end
