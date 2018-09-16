class Notification < ApplicationRecord
  belongs_to :recipient, :foreign_key => :recipient_id, class_name: "User"
  belongs_to :actor, :foreign_key => :actor_id, class_name: "User"
  belongs_to :notifiable, polymorphic: true

  scope :unread, -> {where read_at: nil}
end
