class Rep < ApplicationRecord
  extend Rack::Reducer

  belongs_to :user
  belongs_to :course


  reduces self.all, filters: [
      ->(offer:) { where(offer: offer) },#ricerca secondo il tipo (true = offro, false = cerco)
      ->(price_hours:) { order(price_hours: price_hours )}, #secondo il prezzo Ascendente o desc
      ->(place:) { where('lower(place) like ?', "%#{place.downcase}%") },
      ->(home_service:) { where(home_service: home_service) },
      ->(user_id:) { where(user_id: user_id) },
      ->(course_name:) {where(course_id: get_course_id(course_name))}
  ]


  #validations
  validates_presence_of  :course_id, :price_hours
  validates_inclusion_of :offer, :in => [true, false]
  validates_numericality_of :price_hours, :greater_than_or_equal_to => 0, :less_than => 10000.00, message: "Only not negative numbers between 0 and 9.999,99."
  validates_format_of :week_days,  with: /\A[a-zA-Zàèéìòù .,]+\z/, :allow_blank => true, :on => [:create, :update], message: "only allows letters . and ,"
  validates_format_of  :user_competence,  with: /\A[a-zA-Zàèéìòù,.!'?()_ -]+\z/, :allow_blank => true, :on => [:create, :update], message: "Not allowed special chars"

  def self.get_course_id(course_name)
    Course.find_by_name(course_name).id
  end

  def self.send_email(current_user, content, id)
    rep = Rep.find(id)
    CommentMailer.new_comment(rep, current_user, content).deliver_now
  end

  def self.get_places
    Rep.select(:place).where("place NOT LIKE ''").order(place: :desc)
  end

  scope :current_user_rep,   ->(user, id){ where(user_id: user.id, id: id) }

end
