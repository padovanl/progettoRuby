module UtilFunction
  def set_course
    @course = Course.find(params['course_id'])
  end

  def user_follow_course?
    if !UserCourse.where(user_id: current_user.id, course_id: @course.id).exists?
      head(403)
    end
  end

  def current_user_admin?
    if !current_user.admin?
      render 'admin/accessDenied', layout: false
    end
  end

  def broadcast_notification
    notification = Notification.where(recipient: current_user).where("updated_at = created_at").unread
    ActionCable.server.broadcast 'notification', notification
  end
end