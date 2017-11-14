class ReactStateRenderer
  module SerializerHelpers
    extend ActiveSupport::Concern

    included do
      attribute(:_entity_type) { object.class.name }
    end
  end
end
