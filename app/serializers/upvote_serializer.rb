class UpvoteSerializer < ActiveModel::Serializer
  attributes :id
  belongs_to :user

  class UserSerializer < ActiveModel::Serializer
    attributes :id
  end
end
