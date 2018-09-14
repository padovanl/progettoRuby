class Thesis < ApplicationRecord
  extend Rack::Reducer

  belongs_to :teacher
  has_many :thesis_tags, dependent: :destroy
  has_many :tags, through: :thesis_tags


  reduces self.all, filters: [
      ->(thesis_title:) { where('lower(title ) like ?', "%#{thesis_title.downcase}%")},
      ->(tag:) { get_tags(tag)},
      ->(teacher:) { where(teacher_id: teacher) },
  ]




  def self.get_titles
    select(:id, :title).order(:title)
  end

  def self.get_tags(id)
    eager_load(:thesis_tags).where('thesis_tags.tag_id = '+id)
  end

end
