class ReportsController < ApplicationController
  before_action :authenticate_user!
  before_action :current_user_admin?

  def getCount
    #n = Notification.where(recipient: current_user).where(:read_at => nil).all
    n = Report.where("updated_at = created_at").unread
    json_response(n.length.to_json)
  end

  def index
    @reports = Report.order(created_at: :desc).page(params[:page]).per(2)
    @last_page = @reports.total_pages
    #@notifications = Notification.where(recipient: current_user).unread
    respond_to do |format|
      format.html
      format.json {render json: @reports, :include => {:reportable => {}} }
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

  def show
    #puts (ActiveModel::Serializer.config.default_includes)
    @report = Report.find(params[:id])
    respond_to do |format|
      format.html
      #format.json {render json: report, :include => {:users => {:only => [:id, :email, :avatar_url, :name, :admin]}, :reportable => {}} }
      format.json {render json: @report, :include => {:user_reports => {}, :reportable => {}}
      }
    end
  end

  def updateIsSelected
    reports = Report.where("updated_at = created_at").unread
    #if notifications.size > 0 -> a quanto pare non lo fa comunque se non ci sono notifiche
    reports.update(isSelected: true)
    #end
    render json: {success: true}
  end
end
