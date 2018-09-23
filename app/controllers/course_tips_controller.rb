class CourseTipsController < ApplicationController

  skip_before_action :verify_authenticity_token
  after_action :broadcast_notification, only: [:create]

  def index
    courseTips = CourseTip.where(:course_id => params['course_id']).includes([:user, :course])
    json_response(courseTips.to_json(include: [:user, :course]))
  end

  def create
    q = CourseTip.create(tip_params)
    courseTips = CourseTip.where(:id => q.id).includes([:user, :course])
    @course = Course.find(tip_params[:course_id])
    #(@course.users.uniq - [current_user]).each do |user|
    @course.users.uniq.each do |user|
      Notification.create(recipient: user, actor: current_user, action: "ha inserito un nuovo", notifiable: q)
    end
    json_response(courseTips.to_json(include: [:user, :course]))
  end

  def destroy
    CourseTip.destroy(params[:id])
    Notification.where(:notifiable_id => params[:id]).where(:notifiable_type => "CourseTip").destroy_all
    Report.where(:reportable_id => params[:id]).where(:reportable_type => "CourseTip").destroy_all

  end

  def update
    quest = CourseTip.find(params[:id])
    quest.update_attributes(tip_params)
    json_response(quest.to_json)
  end

  def reportTip
    reason = params[:reportReason][:reason]
    tip = CourseTip.find(params[:id])
    report = Report.where(:reportable_id => params[:id]).where(:reportable_type => "CourseTip").first

    if (report != nil)
      UserReport.create!(user_id: current_user.id, report_id: report.id, reason: reason)
    else
      r = Report.create(action: "È stata segnalato un", reportable: tip)
      UserReport.create!(user_id: current_user.id, report_id: r.id, reason: reason)
    end

    #end
    respond_to do |format|
      format.json { head :ok }
    end
  end

  private
  def tip_params
    params.require(:courseTip).permit(:course_id, :user_id, :tip)
  end



end
