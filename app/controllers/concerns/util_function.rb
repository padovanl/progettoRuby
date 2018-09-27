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
    notification_len = Notification.where(recipient: current_user).where("updated_at = created_at").order(created_at: :desc).unread.size
    notification = Notification.order(created_at: :desc).where(recipient: current_user).unread.limit(3)
    notification = ActiveModel::Serializer::CollectionSerializer
                       .new(notification, each_serializer: NotificationSerializer)
                       .as_json(:include => {:actor => {:only => [:id, :email, :avatar_url, :name, :admin]}, :notifiable =>{} })
    ActionCable.server.broadcast 'notification', { length: notification_len, notifications: notification }
  end

  def user_compile_survey?
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