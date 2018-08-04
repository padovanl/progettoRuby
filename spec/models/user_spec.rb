# spec/models/item_spec.rb
require 'rails_helper'

# Test suite for the Item model
RSpec.describe User, type: :model do
  # Validation test
  # ensure column name is present before saving
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:email) }
end