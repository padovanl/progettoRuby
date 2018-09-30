class DocumentsController < ApplicationController
  before_action :authenticate_user!
  # before_action :set_course, only: [:index, :destroy]
  before_action ->(pram=params[:course_id]) { user_follow_course pram }, only: [:index, :destroy]
  after_action :broadcast_notification, only: [:create, :destroy]
  after_action -> { destroy_report_and_notification('Document') }, only: [:destroy]

  def index
    # La funzione reduce() seleziona i parametri presenti per costruire
    # la query di filtraggio
    documents = Document.reduce(params).order(created_at: :desc).uniq
    render json: documents, include: %w(user tags)
  end

  def create
    # mi assicuro che l'utente stia seguendo il corso prima di inserire il file
    user_follow_course document_params[:course_id]
    resource = Resourse.new(document_params)
    resource.user = current_user

    unless resource.save
      render_json_validation_error resource
      return
    end
    # Ivio una notifica a tutti gli utenti che segui il corso per è
    # stato caricato il documento
    Notification.send_notifications(document_params['course_id'],
                                    current_user, "ha condiviso un nuovo",
                                    resource.document)

    render json: resource.document, include: %w(user tags), status: :created
  end

  def destroy
    # Solo gli admin e gli utenti che hanno creato il documento lo possono cancellare
    if current_user.admin
      document = Document.find(params[:id])
    else
      document = Document.current_user_document(current_user, params[:id]).first
    end

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
