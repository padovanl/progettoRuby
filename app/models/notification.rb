class Notification < ApplicationRecord
  belongs_to :recipient, :foreign_key => :recipient_id, class_name: "User"
  belongs_to :actor, :foreign_key => :actor_id, class_name: "User"
  belongs_to :notifiable, polymorphic: true

  scope :unread, -> {where read_at: nil}

  scope :get_user_recent_notification, -> (current_user) {
    where(recipient: current_user)
        .where("updated_at = created_at")
  }

  scope :get_user_notifications, -> (current_user) {
    order(created_at: :desc)
        .where(recipient: current_user)
  }

  scope :notifications_page, -> (page, number) {
        page(page)
            .per(number)
  }

  def self.send_notifications(course_id, current_user, action, object)

    course = Course.find(course_id)

    if (object.class.name == 'Comment')
      upvoters_post = object.post.upvoters.uniq
      (upvoters_post - [current_user]).each do |user|
        #course.users.uniq.each do |user|
        follow_details = user.user_courses.where(:course_id => course_id).where(:follow => true).exists?
        if follow_details
          create(recipient: user, actor: current_user, action: action, notifiable: object)
        end
      end

    else
      (course.users.uniq - [current_user]).each do |user|
        #course.users.uniq.each do |user|
          follow_details = user.user_courses.where(:course_id => course_id).where(:follow => true).exists?
          if follow_details
            create(recipient: user, actor: current_user, action: action, notifiable: object)
        end
      end
    end
  end

end
