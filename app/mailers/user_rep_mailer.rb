class UserRepMailer < ApplicationMailer

  default from: 'notifications@example.com'

  def text_email(rep)#(rep -> rep.user.email, rep.comment, rep.course.name)
    #youtube dice che non abbiamo accesso ai params, quindi dovrei passarglielo come argomento di una funzione
    @user_email = rep.user.email#params[:user_email]
    @content = rep.description#params[:content]
    @course_name = rep.course.name#params[:course_name]
    mail(to: @user_email, subject: ("Ripetizioni per #{@course_name}"))
  end

end