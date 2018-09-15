class ThesisSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :created_at
  has_many :tags
  belongs_to :teacher
end
