class CourseTipsController < ApplicationController

  skip_before_action :verify_authenticity_token

  def index
    courseTips = CourseTip.where(:course_id => params['course_id']).includes([:user, :course])
    json_response(courseTips.to_json(include: [:user, :course]))
  end

  def create
    q = CourseTip.create(tip_params)
    courseTips = CourseTip.where(:id => q.id).includes([:user, :course])
    json_response(courseTips.to_json(include: [:user, :course]))
  end

  def destroy
    CourseTip.destroy(params[:id])
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
