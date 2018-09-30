module UtilFunction
  def set_course
    @course = Course.find(params['course_id'])
  end

  def user_follow_course(course_id)
    if !UserCourse.where(user_id: current_user.id, course_id: course_id, follow: true).exists?
      flash[:alert] = 'Per visualizzare la pagina segui il corso!'
      redirect_to controller: 'courses', action: 'show', id: course_id
    end
  end

  def current_user_admin?
    if !current_user.admin?
      render 'admin/accessDenied', layout: false
    end
  end

  def broadcast_notification
    users_to_notify = Notification.select(:recipient_id).where.not(recipient: current_user).distinct(:recipient_id).unread

    users_to_notify.each do |nott|
        notification_len = Notification.where(recipient_id: nott.recipient_id).where("updated_at = created_at").order(created_at: :desc).unread.size
        notification = Notification.order(created_at: :desc).where(recipient_id: nott.recipient_id).unread.limit(3)
        notification = ActiveModel::Serializer::CollectionSerializer
                           .new(notification, each_serializer: NotificationSerializer)
                           .as_json(:include => {:actor => {:only => [:id, :email, :avatar_url, :name, :admin]}, :notifiable => {}})

        NotificationChannel.broadcast_to User.find( nott.recipient_id), {length: notification_len, notifications: notification}
    end
  end

  def user_compile_survey?
    if request.format.html?
      if UserCourse.where(user_id: current_user.id, course_id: params[:course_id], passed: true).exists?
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

def destroy_notification_comment_unfollow_upvote
  Post.joins(:upvotes).where("upvotes.upvoter_id = ?", current_user.id).where(:course_id => user_course_param[:course_id]).each do |post|
    post.comments.each do |comment|
      notifica = Notification.where(:notifiable_id => comment.id).where(:notifiable_type => 'Comment').first
      if notifica.present?
        notifica.destroy
      end
    end
  end
end

def destroy_report_and_notification_comment_of_post
  post = Post.find(params[:id])
  post.comments.each do |comment|
    report = Report.where(:reportable_id => comment.id).where(:reportable_type => 'Comment').first
    notification = Notification.where(:notifiable_id => comment.id).where(:notifiable_type => 'Comment').first
    if report.present?
      report.destroy
    end

    if notification.present?
      notification.destroy
    end
  end
end

def destroy_report_and_notification(type_object)
  Notification.where(:notifiable_id => params[:id]).where(:notifiable_type => type_object).destroy_all
  Report.where(:reportable_id => params[:id]).where(:reportable_type => type_object).destroy_all
end

###################
def can_insert_tip_or_question?(type_object)
  if type_object == 'CourseTip'
    course_id = params[:courseTip][:course_id]
  else
    course_id = params[:courseQuestion][:course_id]
  end

  if !UserCourse.where(user_id: current_user.id, course_id: course_id, passed: true).exists?
    flash[:alert] = 'Operazione non permessa: non hai completato il sondaggio'
    redirect_to controller: 'courses', action: 'show', id: course_id
  end

end

def can_update_or_delete_tip_or_question?(type_object)

  if type_object == 'CourseTip'
    object = CourseTip.find(params[:id])
  else
    object = CourseQuestion.find(params[:id])
  end

  if  current_user.id != object.user_id && !current_user.admin?
    flash[:alert] = 'Operazione non permessa: non hai inserito tu l\'oggetto'
    redirect_to controller: 'courses', action: 'show', id: params[:course_id]
  end
end

#non posso eseguire i quote altrui
def can_quote?
  if (!UserCourse.where(user_id: current_user.id, course_id: params[:course_id], passed: true).exists? || FrequencyQuestion.where(:user_id => current_user.id).where(:course_question_id =>  params[:frequencyQuestion][:course_question_id]).exists?)
    flash[:alert] = 'Operazione non permessa: non hai il permesso'
    redirect_to controller: 'courses', action: 'show', id: params[:course_id]
  end
end

#non posso eseguire gli unquote altrui
def can_unquote?
  f = FrequencyQuestion.find(params[:id])
  if (!UserCourse.where(user_id: current_user.id, course_id: params[:course_id], passed: true).exists? || current_user.id != f.user_id)
    flash[:alert] = 'Operazione non permessa: non hai il permesso'
    redirect_to controller: 'courses', action: 'show', id: params[:course_id]
  end
end

#non posso compilare il questionario altrui via curl
def can_survey_update?
  uc = UserCourse.find(params[:id])
  if uc.user_id != current_user.id
    flash[:alert] = 'Operazione non permessa: non hai il permesso di compilare il questionario altrui'
    redirect_to course_path(uc.course_id)
  end
end