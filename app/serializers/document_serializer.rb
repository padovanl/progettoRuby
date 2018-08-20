class  DocumentSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :created_at, :file_url, :filename, :path

  def file_url
    if object.file.variable?
      variant = object.file.variant(resize: "64x64")
      return rails_representation_url(variant, only_path: true)
    elsif object.file.previewable?
      preview = object.file.preview(resize: "64x64")
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