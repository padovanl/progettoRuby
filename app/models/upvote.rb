class Upvote < ApplicationRecord
  belongs_to :post
  belongs_to :user

  # validations
  validates_presence_of :user_id, :post_id
  validates :user_id, uniqueness: { scope: :post_id }
end
