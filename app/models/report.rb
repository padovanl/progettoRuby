class Report < ApplicationRecord
  has_many :user_reports, :dependent => :destroy
  has_many :users, through: :user_reports, :dependent => :destroy
  belongs_to :reportable, polymorphic: true


  scope :unread, -> {where read_at: nil}
end
