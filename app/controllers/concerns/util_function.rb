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

  def user_compile_survey?
    #byebug
    if request.format.html?
      if UserCourse.where(user_id: current_user.id, course_id:  params[:course_id], passed: true).exists?
        #redirect_to controller: '/controllers/courses', action: 'show', id: params[:course_id]
        #redirect_to(root_path, notice: 'Incorrect number of photos!')
        redirect_to course_path(params[:course_id])
        flash[:alert] = 'Questionatio già compilato'
      end
    end
  end

  def user_follows_course_for_survey?
    if request.format.html?
      if !UserCourse.where(user_id: current_user.id, course_id: params[:course_id], follow: true).exists?
        flash[:alert] = 'Prima di compilare il questionario devi seguire il corso!'
        redirect_to course_path(params[:course_id])
      end
    end
  end

end