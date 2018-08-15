class UserSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :email, :avatar_url, :name

  has_many :posts

  def avatar_url
    if object.avatar.attached?
      variant = object.avatar.variant(resize: "100x100")
      return rails_representation_url(variant, only_path: true)
    else
      return ActionController::Base.helpers.asset_path("dragon.png")
    end
  end
end
