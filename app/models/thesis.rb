class Thesis < ApplicationRecord
  extend Rack::Reducer

  belongs_to :teacher
  has_many :thesis_tags, dependent: :destroy
  has_many :tags, through: :thesis_tags


  reduces self.all, filters: [
      ->(thesis_title:) { where('title ILIKE ?', "%#{thesis_title}% ")},
      ->(tag:) { where(get_tags(tag))},
      ->(teacher:) { where(teacher_id: teacher) },
  ]




  def self.get_titles
    select(:id, :title).order(:title)
  end

  def self.get_tags(id)
    includes(:thesis_tags).references(:thesis_tags).where(tag_id: id)
  end

end
