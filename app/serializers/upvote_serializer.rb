class UpvoteSerializer < ActiveModel::Serializer
  attributes :id
  belongs_to :upvoter

end
