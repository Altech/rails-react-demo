class ReactStateRenderer
  module ControllerHelpers

    def self.included(mod)
      mod.helper_method :render_react_state
    end

    def render_react(data, options = {})
      @react_state = render_react_state(data)

      respond_to do |format|
        format.html do
          hypernova_render_support do
            render({ template: 'application/ssr' }.reverse_merge(options))
          end
        end
        format.json do
          render({ json: @react_state }.reverse_merge(options))
        end
      end
    end

    def react_global_state; {} end

    def render_react_state(data = {})
      ReactStateRenderer.new(
        data,
        request: request,
        controller: controller_name,
        action: action_name,
        global: react_global_state,
      ).perform
    end
  end
end
