class ReactStateRenderer
  class OptionsLoader
    class FileNotFound < StandardError; end
    class InvalidStructure < StandardError; end

    META_KEY_REGEXP = /^_.+/
    FIELDS_KEY = '_fields'

    def self.load!(controller, action)
      self.new(controller, action).load
    end

    attr_reader :controller, :action

    def initialize(controller, action)
      @controller = controller
      @action = action
    end

    def load
      @data = YAML.load(read_from_view_file)
      validate(@data)
      transform(@data)
    end

    def view_file_path
      Rails.root + "app/views/#{controller}/#{action}.yml"
    end

    private

    def validate(data)
      unless data.is_a?(Hash)
        raise InvalidStructure.new("The contents of #{view_file_path} is invalid. Expected hash.")
      end
    end

    def transform(data)
      data.map { |key, value|
        fields = transform_fields(value)
        include = transform_include(value)

        set_default_fields!(fields)

        transformed_value = {
          fields: fields,
          include: include,
        }

        [key.to_sym, transformed_value]
      }.to_h
    end

    def transform_fields(value)
      value[FIELDS_KEY] ? value[FIELDS_KEY].map(&:to_sym) : []
    end

    def transform_include(value)
      value.reject { |key, _| key =~ META_KEY_REGEXP }.map { |key, value|
        fields = transform_fields(value)
        set_default_fields!(fields)
        [key.to_sym, { only: fields }.merge(transform_include(value))]
      }.to_h
    end

    def read_from_view_file(path = self.view_file_path)
      if !path.exist?
        raise FileNotFound.new("The definition of props was not found(#{path})")
      end
      path.read
    end

    def set_default_fields!(fields)
      fields.unshift(:id) unless fields.include?(:id)
      fields.unshift(:_entity_type) unless fields.include?(:_entity_type)
    end
  end
end
