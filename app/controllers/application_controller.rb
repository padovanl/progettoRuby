class ApplicationController < ActionController::Base
  include Response
  include ExceptionHandler
  include UtilFunction

  helper_method :mobile?



  protect_from_forgery with: :exception

  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up) {|u| u.permit(:name, :email, :password, :news)}

    devise_parameter_sanitizer.permit(:account_update) {|u| u.permit(:name, :email, :password, :current_password, :avatar, :news)}
  end

  private

  def mobile? # has to be in here because it has access to "request"
    request.user_agent =~ /\b(Android|iPhone|iPad|Windows Phone|Opera Mobi|Kindle|BackBerry|PlayBook)\b/i
  end
end
