require 'rails_helper'

RSpec.describe "documents/new", type: :view do
  before(:each) do
    assign(:document, Document.new())
  end

  it "renders new document form" do
    render

    assert_select "form[action=?][method=?]", documents_path, "post" do
    end
  end
end
