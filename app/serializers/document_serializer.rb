class  DocumentSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :created_at, :file_url, :filename, :path

  has_many :tags

  def file_url
    if object.file.variable?
      variant = object.file.variant(resize: "200x200")
      return rails_representation_url(variant, only_path: true)# .processed.service_url # controllo se è presente localmente
    elsif object.file.previewable?
      preview = object.file.preview(resize: "200x200")
      return  rails_representation_url(preview, only_path: true)
    elsif object.file.image?
      return rails_blob_path(object.file, disposition: :attachement, only_path: true)
    else
      return ''
    end
  end

  def filename
    return object.file.filename
  end

  def path
    return rails_blob_path(object.file, disposition: :attachement, only_path: true)
  end
end