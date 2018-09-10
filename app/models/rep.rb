class Rep < ApplicationRecord
  extend Rack::Reducer

  belongs_to :user
  belongs_to :course


  def get_reps
  end


  reduces self.all, filters: [
      ->(offer:) { where(offer: offer) },#ricerca secondo il tipo (true = offro, false = cerco)
      ->(price_hours:) { order(price_hours: price_hours )}, #secondo il prezzo Ascendente o desc
      ->(place:) { where('lower(place) like ?', "%#{place.downcase}%") },
      ->(home_service:) { where(home_service: home_service) },
      ->(user_id:) { where(user_id: user_id) }
  ]


  #validations
  validates_presence_of  :course_id, :price_hours
  validates_inclusion_of :offer, :in => [true, false]
  validates_numericality_of :price_hours, :greater_than_or_equal_to => 0, :less_than => 10000.00, message: "Only not negative numbers between 0 and 9.999,99."
  validates_format_of :week_days,   with: /\A[a-zA-Z-àèéìòù .,]+\z/, :allow_blank => true, :on => :create, message: "only allows letters"

  def self.get_course_id(course_name)
    Course.find_by_name(course_name).id
  end

end
