class PostSerializer < ActiveModel::Serializer
  attributes :id, :message, :created_at, :course_id
  has_many :comments
  has_many :documents
  belongs_to :user
  belongs_to :course


  attribute :upvotes

  def upvoters
    object.upvotes.map do |ii|
      UpvoteSerializer.new(ii)
    end
  end



  class  DocumentSerializer < ActiveModel::Serializer
    include Rails.application.routes.url_helpers

    attributes :id, :created_at, :file_url, :filename, :path

    def file_url
      if object.file.variable?
        variant = object.file.variant(resize: "100x100")
        return rails_representation_url(variant, only_path: true)# .processed.service_url # controllo se è presente localmente
      elsif object.file.previewable?
        preview = object.file.preview(resize: "100x100")
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
end
