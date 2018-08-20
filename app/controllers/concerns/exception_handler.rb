module ExceptionHandler
  # provides the more graceful `included` method
  extend ActiveSupport::Concern

  included do
    rescue_from ActiveRecord::RecordNotFound do |e|
      render_json_error :not_found, e # e.model restituisce il model che ha lanciato l'eccezione
    end

    rescue_from ActiveRecord::RecordInvalid do |e|
      render_json_error :unprocessable_entity, e
    end
  end
end