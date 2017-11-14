module Api::SerializerHelpers
  extend ActiveSupport::Concern

  included do
    class << self
      attr_reader :preload_rule
      def preload(&block)
        @preload_rule = Api::PreloadRule.new
        @preload_rule.instance_exec(&block)
        @preload_rule
      end
    end
  end
end
