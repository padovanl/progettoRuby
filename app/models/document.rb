class Document < ApplicationRecord
  has_many :document_tags, dependent: :destroy

  belongs_to :user
  # indico la tabella intermedia e quella finale per le 
  # associazioni molti a molti
  has_many :document_posts, dependent: :destroy
  has_many :posts, through: :document_posts

  has_many :document_tags
  has_many :tags, through: :document_tags

  has_one_attached :file

  # validations
  validates_presence_of :user

end
