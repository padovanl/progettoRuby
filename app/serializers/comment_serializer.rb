class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content, :created_at, :course_id
  belongs_to :user
  belongs_to :course
end
