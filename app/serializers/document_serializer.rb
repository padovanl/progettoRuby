class  DocumentSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :created_at, :file_url, :filename

  def file_url
    if object.file.variable?
      variant = object.file.variant(resize: "100x100")
      return rails_representation_url(variant, only_path: true)
      #<%= link_to image_tag(allegato.file.variant(resize: "64x64")), allegato.file %>
    elsif object.file.previewable?
      preview = object.file.preview(resize: "64x64")
      return  rails_representation_url(preview, only_path: true)
    elsif object.file.image?
      # <%= link_to image_tag(allegato.file, width: 64), allegato.file %>
      #      <% elsif allegato.file.filename.to_s.end_with? "zip" %>
      #                                                     <%= link_to image_tag(image_url("zip-box.png"), width: 64), allegato.file %>
      return rails_blob_path(object.file, disposition: :attachement, only_path: true)
    else
      return rails_blob_path(object.file, disposition: :attachement, only_path: true)
    end
  end

  def filename
    return object.file.filename
  end
end