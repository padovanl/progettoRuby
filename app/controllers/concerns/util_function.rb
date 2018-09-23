module UtilFunction
  def set_course
    @course = Course.find(params['course_id'])
  end

  def user_follow_course?
    if !UserCourse.where(user_id: current_user.id, course_id: @course.id, follow: true).exists?
      flash[:alert] = 'Per visualizzare la pagina segui il corso!'
      redirect_to controller: 'courses', action: 'show', id: @course.id
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