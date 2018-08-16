module PublicationsHelper

  def avatar_url
    return current_user.avatar.attached? ? rails_representation_url(current_user.avatar.variant(resize: "100x100"), only_path: true)
        : image_url("dragon.png")
  end
end
