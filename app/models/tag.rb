class Tag < ApplicationRecord
  extend Rack::Reducer

  has_many :thesis_tags

  has_many :document_tags
  has_many :documents, through: :document_tags

  belongs_to :user


  # validations
  validates_presence_of :name

  reduces self.all, filters: [
      ->(query:) { where('name ILIKE ?', "%#{query}%") }
  ]
end
