class CourseTipsController < ApplicationController
  before_action :authenticate_user!
  after_action :broadcast_notification, only: [:create, :destroy]
  after_action ->(type_object) { destroy_report_and_notification('CourseTip') }, only: [:destroy]
  before_action ->(type_object) {can_insert_tip_or_question?('CourseTip')}, only: [:create]
  before_action ->(type_object) {can_update_or_delete_tip_or_question?('CourseTip')}, only: [:update, :destroy]

  def index
    courseTips = CourseTip.get_course_tips(params['course_id'])
    json_response(courseTips.to_json(include: [:user, :course]))
  end

  def create
    tip = CourseTip.create!(tip_params)
    unless tip.valid?
      render_json_validation_error tip
      return
    end

    Notification.send_notifications(params['course_id'], current_user, "ha inserito un nuovo", tip)

    json_response(tip.to_json(include: [:user, :course]))
  end

  def destroy
    unless CourseTip.destroy(params[:id])
      render_json_validation_error course_tip
      return
    end
    head :no_content
  end

  def update
    tip = CourseTip.find(params[:id])
    unless !tip.update_attributes(tip_params)
      json_response(tip.to_json)
      return
    end
  end

  def reportTip
    Report.send_report(params[:id], current_user.id,
                       params[:reportReason][:reason],
                       CourseTip.find(params[:id]),
                       "CourseTip",
                       "È stata segnalato un")
    respond_to do |format|
      format.json { head :ok }
    end
  end

  private
  def tip_params
    params.require(:courseTip).permit(:course_id, :user_id, :tip)
  end



end
