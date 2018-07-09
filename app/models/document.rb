class Document < ApplicationRecord
  has_many :document_tags

  # indico la tabella intermedia e quella finale per le 
  # associazioni molti a molti
  has_many :document_posts
  has_many :posts, through: :document_posts

  has_one_attached :file
end
