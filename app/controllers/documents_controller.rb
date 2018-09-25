class DocumentsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_course, only: [:index, :destroy]
  before_action :user_follow_course?, only: [:index, :destroy]
  after_action :broadcast_notification, only: [:create]
  after_action ->(type_object) { destroy_report_and_notification('Document') }, only: [:destroy]

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

    head :no_content
  end

  def reportDocument
    Report.send_report(params[:id], current_user.id,
                       params[:reportReason][:reason],
                       Document.find(params[:id]),
                       "Document",
                       "È stato segnalato un")
    respond_to do |format|
      format.json { head :ok }
    end
  end

  private
  def document_params
    params.require(:document).permit( :course_id, :attachment, tags: [:id, :name] )
  end
end
