# spec/models/todo_spec.rb
require 'rails_helper'

# Test suite for the Todo model
RSpec.describe Post, type: :model do
  # Association test
  # ensure Post model has a 1:m relationship with the Documents_post model
  it { should have_many(:resources) }
  # ensure a post record belongs to a single user
  it { should belong_to(:user) }

  # Validation tests
  # ensure columns message and user_id are present before saving
  it { should validate_presence_of(:message) }
end