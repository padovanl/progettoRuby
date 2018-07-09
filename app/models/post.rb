class Post < ApplicationRecord
  belongs_to :user
  belongs_to :course
  has_many :comments
  # indico la tabella intermedia e quella finale per le 
  # associazioni molti a molti
  has_many :document_posts
  has_many :documents, through: :document_posts
end
