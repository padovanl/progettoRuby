class CommentMailer < ApplicationMailer
  default :from => 'BRAIN_STEAM'

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.comment_mailer.new_comment.subject
  #
  def new_comment(rep, c_u, content)
    @current_user = c_u
    @content = content
    @user_email = rep.user.email
    @course_name = rep.course.name
    mail to: @user_email, subject: "Ripetizione per '#{@course_name}'"
  end
end
