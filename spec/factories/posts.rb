
FactoryBot.define do
  factory :post do
    message { Faker::Lorem.word }
    user_id nil
  end
end