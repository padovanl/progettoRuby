ActionMailer::Base.delivery_method = :smtp
ActionMailer::Base.smtp_settings = {
    :address              =>  'smtp.sendgrid.net',
    :port                 =>  '587',
    :authentication       =>  :plain,
    :user_name            =>  'app100148598@heroku.com',
    :password             =>  'bucsofyw1583',
    :domain               =>  'heroku.com',
    :enable_starttls_auto  =>  true
}
