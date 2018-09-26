class Report < ApplicationRecord
  has_many :user_reports, :dependent => :destroy
  has_many :users, through: :user_reports, :dependent => :destroy
  belongs_to :reportable, polymorphic: true

  def self.send_report(object_id, current_user_id, reason, object_reported, type_report, action)
    report = where(:reportable_id => object_id).where(:reportable_type => type_report).first
    if (report != nil)
      report.user_reports.create!(user_id: current_user_id, report_id: report.id, reason: reason)
    else
      r = create!(action: action, reportable: object_reported)
      r.user_reports.create!(user_id: current_user_id, report_id: r.id, reason: reason)
    end
  end

  scope :unread, -> {where read_at: nil}
end
