class Document < ApplicationRecord
  has_many :document_tags
  has_many :document_posts
end
