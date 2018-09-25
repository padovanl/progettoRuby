class Notification < ApplicationRecord
  belongs_to :recipient, :foreign_key => :recipient_id, class_name: "User"
  belongs_to :actor, :foreign_key => :actor_id, class_name: "User"
  belongs_to :notifiable, polymorphic: true

  scope :unread, -> {where read_at: nil}

  def self.send_notifications(course_id, current_user, action, tip)
    course = Course.find(course_id)
    #(course.users.uniq - [current_user]).each do |user|
    course.users.uniq.each do |user|
      Notification.create(recipient: user, actor: current_user, action: action, notifiable: tip)
    end
  end

end
