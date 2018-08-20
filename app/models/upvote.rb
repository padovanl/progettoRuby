class Upvote < ApplicationRecord
  belongs_to :post
  belongs_to :upvoter, class_name: 'User'

  # validations
  validates_presence_of :upvoter, :post_id
  validates :upvoter, uniqueness: { scope: :post_id }

  scope :current_upvoter,   ->(user, id){ where(upvoter_id: user.id, id: id) }
end
