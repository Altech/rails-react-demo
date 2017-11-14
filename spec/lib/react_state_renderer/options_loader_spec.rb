require 'rails_helper'

describe ReactStateRenderer::OptionsLoader do

  let(:yaml) {
    <<YAML
projects:
  _fields:
    - title
    - published_on
  company:
    _fields:
      - name
    avatar:
      _fields:
        - url
YAML
  }
  let(:controller) { 'projects' }
  let(:action) { 'index' }

  before do
    allow_any_instance_of(ReactStateRenderer::OptionsLoader).to receive(:read_from_view_file).and_return(yaml)
  end

  describe '.load!' do
    it 'delegates to an instance' do
      expect_any_instance_of(ReactStateRenderer::OptionsLoader).to receive(:load)
      ReactStateRenderer::OptionsLoader.load!(controller, action)
    end
  end

  let(:loader) { ReactStateRenderer::OptionsLoader.new(controller, action) }

  describe '#load' do
    it 'transforms data' do
      expect(loader).to receive(:transform).with(YAML.load(yaml))
      loader.load
    end
  end

  describe '#transform' do
    it 'transforms the data for ActiveModel::Serializers' do
      res = loader.send(:transform, YAML.load(yaml))
      expect(res).to eq({
        projects: {
          fields: [:_entity_type, :id, :title, :published_on],
          include: {
            company: {
              only: [:_entity_type, :id, :name],
              avatar: {
                only: [:_entity_type, :id, :url],
              },
            }
          }
        }
      })
    end
  end
end
