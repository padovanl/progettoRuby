class ThesesNameSerializer < ActiveModel::Serializer
  def name
    object.title
  end

  attributes :id, :name#provare con la key del sito https://github.com/rails-api/active_model_serializers/blob/v0.10.6/docs/general/serializers.md#attribute per trasformare title in name
end
