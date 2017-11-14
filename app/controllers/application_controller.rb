class ApplicationController < ActionController::Base
  include ReactStateRenderer::ControllerHelpers

  protect_from_forgery with: :exception

  def current_user
    nil
  end

  def react_global_state
    {
      auth: { user_id: current_user&.id }
    }
  end
end
