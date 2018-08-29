class DocumentsController < ApplicationController
  before_action :authenticate_user!

  def index
    documents = Document.reduce(params).order(created_at: :desc)
    render json: documents, include: %w(user tags)
  end

  def create
    resource = Resourse.new(document_params)
    resource.user = current_user

    unless resource.save
      render_json_validation_error resource
      return
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

  private

  def document_params
    params.require(:document).permit( :course_id, :attachment, tags: [:id, :name] )
  end
end
