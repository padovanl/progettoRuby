class Document < ApplicationRecord
  has_many :document_tags, :dependent => :destroy

  # indico la tabella intermedia e quella finale per le 
  # associazioni molti a molti
  has_many :document_posts, :dependent => :destroy
  has_many :posts, through: :document_posts, :dependent => :destroy

  has_one_attached :file


=begin
  def self.with_link
    if allegato.file.variable?
      # allegato.file.variant(resize: "64x64")
    elsif allegato.file.previewable?
      # allegato.file.preview(resize: "64x64")
    elsif allegato.file.image?
      # allegato.file
    elsif allegato.file.filename.to_s.end_with? "zip"
      # "zip-box.png"
    else
      # rails_blob_path(allegato.file, disposition: :attachement)
    Rails.application.routes.url_helpers.rails_blob_path(doc.file, only_path: true)
  end
=end

end
