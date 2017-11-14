class ReactStateRenderer
  include ActionController::Serialization

  attr_reader :resources, :request, :controller, :action, :global, :body

  def initialize(resources, request:, controller:, action:, global: {})
    unless resources.is_a?(Hash)
      raise TypeError.new("resources must be a Hash, but got #{resources.class.name}")
    end
    if controller.blank? || action.blank? || request.blank?
      raise ArgumentError.new("All args must be present.")
    end

    @resources = resources
    @request = request
    @controller = controller
    @action = action
    @global = global
  end

  def perform
    @body = serialize_resources
    router = {
      path: request.path,
      query: request.query_parameters,
      queryString: request.query_parameters.to_query,
    }

    {
      global: global.merge({ router: router }),
      controller: controller,
      action: action,
      body: @body,
    }
  end

  def serialize_resources(base_options: self.serializer_options)
    resources.map do |key, resource|
      options = base_options.merge(resource_options[key.to_sym] || {})
      [key, serialize_resource(preload_resource(resource, options), options)]
    end.to_h
  end

  def resource_options
    @resources_options ||= OptionsLoader.load!(controller, action)
  end

  def serialize_resource(resource, options)
    serializable_resources = get_serializer(resource, options)
    serializable_resources.as_json(options)
  end

  def serializer_options
    @serializer_options ||= {
      serialization_context: ActiveModelSerializers::SerializationContext.new(request, {})
    }
  end

  def preload_resource(resource, options)
    case resource
    when ActiveRecord::Relation
      Api::Preloader.preload_for(resource, options[:fields], options[:include])
    else
      resource
    end
  end
end
