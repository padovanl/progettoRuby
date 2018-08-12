class Thesis < ApplicationRecord
  belongs_to :teacher
  has_many :thesis_tags, :dependent => :destroy
end
