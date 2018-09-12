class UserNotifierMailer < ApplicationMailer
  default :from => 'BRAIN_STEAM'

  # send a signup email to the user, pass in the user object that   contains the user's email address
  def send_signup_email(user, text, titolo)
    @user = user
    @text = text
    @titolo = titolo
    mail( :to => @user.email,
          :subject => 'Newsletter di BRAIN_STEAM' )
  end
end
