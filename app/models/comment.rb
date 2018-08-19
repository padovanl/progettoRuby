class Comment < ApplicationRecord
  belongs_to :post
  belongs_to :user

  # validations
  validates_presence_of :content
end
