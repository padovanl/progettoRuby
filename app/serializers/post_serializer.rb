class PostSerializer < ActiveModel::Serializer
  attributes :id, :message, :created_at
  has_many :comments
  has_many :documents
  belongs_to :user

end
