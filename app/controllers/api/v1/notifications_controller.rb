class Api::V1::NotificationsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!
  def getCount
    n = UserNotification.where(:user_id => current_user.id).where(:letta => false).all
    json_response(n.length.to_json)
  end

  def index
    n = UserNotification.where(:user_id => current_user.id).includes([:notification])
    json_response(n.to_json(include: [:notification]))
  end


  def destroy
    UserNotification.destroy(params[:id])
  end

end