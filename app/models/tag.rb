class Tag < ApplicationRecord
  has_many :thesis_tags, :dependent =>  :destroy
  has_many :document_tags, :dependent => :destroy
  belongs_to :user
end
