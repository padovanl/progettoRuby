class DocumentsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_course, only: [:index, :destroy]
  before_action :user_follow_course?, only: [:index, :destroy]
  after_action :broadcast_notification, only: [:create]

  def index
    documents = Document.reduce(params).order(created_at: :desc).uniq
    render json: documents, include: %w(user tags)
  end

  def create
    resource = Resourse.new(document_params)
    resource.user = current_user

    unless resource.save
      render_json_validation_error resource
      return
    end

    course = Course.find(document_params[:course_id])
    course.users.uniq.each do |user|
      Notification.create!(recipient: user, actor: current_user, action: "ha condiviso un nuovo", notifiable: resource.document)
    end

    render json: resource.document, include: %w(user tags), status: :created
  end

  def destroy
    document = Document.current_user_document(current_user, params[:id]).first

    if !document.destroy
      render_json_validation_error document
      return
    end
    Notification.where(notifiable_id: params[:id]).where(notifiable_type: "Document").destroy_all
    head :no_content
  end

  private
  def document_params
    params.require(:document).permit( :course_id, :attachment, tags: [:id, :name] )
  end
end
