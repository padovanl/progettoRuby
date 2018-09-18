class ReportsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!

  def getCount
    #n = Notification.where(recipient: current_user).where(:read_at => nil).all
    n = Report.where("updated_at = created_at").unread
    json_response(n.length.to_json)
  end

  def index
    @reports = Report.order(created_at: :desc).page(params[:page]).per(1)
    @reports = @reports.total_pages
    #@notifications = Notification.where(recipient: current_user).unread
    respond_to do |format|
      format.html
      format.json {render json: @reports, :include => {:recipient => {:only => [:id, :email, :avatar_url, :name, :admin]}, :notifiable => {}} }
    end
    #render json: @notifications, include: %w(recipient notifiable notifiable.post notifiable.post.course), status: :created
  end

  def markAsRead
    report = Report.find(params[:id])
    report.update(read_at: Time.zone.now)
    render json: {success: true}
  end

  def destroy
    Report.destroy(params[:id])
  end

  def updateIsSelected
    reports = Report.where("updated_at = created_at").unread
    #if notifications.size > 0 -> a quanto pare non lo fa comunque se non ci sono notifiche
    reports.update(isSelected: true)
    #end
    render json: {success: true}
  end
end
