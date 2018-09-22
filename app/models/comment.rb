class Comment < ApplicationRecord
  belongs_to :post
  belongs_to :user
  belongs_to :course

  # validations
  validates_presence_of :content
end
