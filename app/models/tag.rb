class Tag < ApplicationRecord
  extend Rack::Reducer

  has_many :thesis_tags, :dependent => :destroy

  has_many :document_tags, :dependent => :destroy
  has_many :documents, through: :document_tags, :dependent => :destroy

  belongs_to :user


  # validations
  validates_presence_of :name

  reduces self.all, filters: [
      ->(query:) { where('name ILIKE ?', "%#{query}%") }
  ]
end
