ActionMailer::Base.delivery_method = :smtp
ActionMailer::Base.smtp_settings = {
    :address              =>  'smtp.sendgrid.net',
    :port                 =>  '587',
    :authentication       =>  :plain,
    :user_name            =>  'app97235386@heroku.com',
    :password             =>  'o5ymovpm8029',
    :domain               =>  'heroku.com',
    :enable_starttls_auto  =>  true
}
