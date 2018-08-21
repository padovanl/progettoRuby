class Tag < ApplicationRecord
  has_many :thesis_tags
  has_many :document_tags
  belongs_to :user
end
