class UserSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :email, :avatar_url, :name, :admin

  def avatar_url
    if object.avatar.attached?
      variant = object.avatar.variant(resize: "100x100") # .processed.service_url # controllo se è presente localmente
      return rails_representation_url(variant, only_path: true)
    else
      return ActionController::Base.helpers.asset_path("dragon.png")
    end
  end
end
