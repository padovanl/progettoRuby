class CourseTipsController < ApplicationController

  skip_before_action :verify_authenticity_token

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
  end

  def update
    quest = CourseTip.find(params[:id])
    quest.update_attributes(tip_params)
    json_response(quest.to_json)
  end

  private
  def tip_params
    params.require(:courseTip).permit(:course_id, :user_id, :tip)
  end



end
