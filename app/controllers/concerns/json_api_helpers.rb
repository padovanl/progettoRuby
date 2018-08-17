module JsonApiHelpers
  extend ActiveSupport::Concern

  private

  def render_serialized_array(model_array)
    serializer_instance = serializer_for(model_array).new(
        model_array,
        each_serializer: serializer_for(model_array)
    )

    render json: adapter(serializer_instance)
  end

  def render_serialized_model(model)
    serializer_instance = serializer_for(model).new(model)

    render json: adapter(serializer_instance), status: :ok
  end

  def serializer_for(model)
    @_serializer ||= ActiveModel::Serializer.serializer_for(model)
  end

  def included; [] end # rubocop:disable Style/SingleLineMethods

  def adapter_opts
    { adapter: 'json_api', include: included }
  end

  def adapter(serializer_instance)
    ActiveModel::Serializer::Adapter.create(
        serializer_instance,
        adapter_opts
    )
  end
end