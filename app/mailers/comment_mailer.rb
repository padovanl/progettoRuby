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
    @rep = rep
    mail to: rep.user.email, subject: "Ripetizione per '#{rep.course.name}'"
  end
end
