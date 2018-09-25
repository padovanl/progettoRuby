class CourseTipsController < ApplicationController
  before_action :authenticate_user!
  after_action :broadcast_notification, only: [:create]

  def index
    courseTips = CourseTip.get_course_tips(params['course_id'])
    json_response(courseTips.to_json(include: [:user, :course]))
  end

  def create
    tip = CourseTip.new(tip_params)

    unless tip.save
      render_json_validation_error tip
      return
    end

    Notification.send_notifications(params['course_id'], current_user, "ha inserito un nuovo", tip)

    courseTips = CourseTip.where(:id => tip.id).includes([:user, :course])
    json_response(courseTips.to_json(include: [:user, :course]))
  end

  def destroy
    course_tip = CourseTip.find(params[:id])

    if !course_tip.destroy
      render_json_validation_error course_tip
      return
    end

    Notification.where(:notifiable_id => params[:id]).where(:notifiable_type => "CourseTip").destroy_all
    Report.where(:reportable_id => params[:id]).where(:reportable_type => "CourseTip").destroy_all

    head :no_content
  end

  def update
    quest = CourseTip.find(params[:id])
    quest.update_attributes(tip_params)
    json_response(quest.to_json)
  end

  def reportTip

    Report.send_report(params[:id], current_user.id,
                       params[:reportReason][:reason],
                       CourseTip.find(params[:id]),
                       "CourseTip",
                       "È stata segnalato un")
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
