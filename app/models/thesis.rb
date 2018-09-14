class Thesis < ApplicationRecord
  belongs_to :teacher
  has_many :thesis_tags, dependent: :destroy
  has_many :tags, through: :thesis_tags
end
