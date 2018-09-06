class Rep < ApplicationRecord
  extend Rack::Reducer

  belongs_to :user
  belongs_to :course


  def get_reps
  end


  reduces self.all, filters: [
      ->(offer:) { where(type: offer) },#ricerca secondo il tipo (true = offro, false = cerco)
      ->(price_hours:) { order(price_hours )}, #secondo il prezzo Ascendente
      ->(place:) { where('lower(place) like ?', "%#{place.downcase}%") },
      ->(home_service:) { where(home_service: home_service) },
  ]


  #validations
  validates_presence_of :offer, :price_hours

end
