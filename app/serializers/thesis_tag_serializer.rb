class ThesisTagSerializer < ActiveModel::Serializer
  attributes :id, :tag_id
  belongs_to :tag
end
