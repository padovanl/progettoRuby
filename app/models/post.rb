class Post < ApplicationRecord
  belongs_to :user
  belongs_to :course
  has_many :comments
  has_many :documents
end
