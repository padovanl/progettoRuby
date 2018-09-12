RSpec.describe User, type: :model do
  subject { create :rep }

  it 'sends an email' do
    expect { subject.send_email }
        .to change { ActionMailer::Base.deliveries.count }.by(1)
  end
end