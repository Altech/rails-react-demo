class ApplicationSerializer < ActiveModel::Serializer
  include Api::SerializerHelpers
  include ReactStateRenderer::SerializerHelpers
end
