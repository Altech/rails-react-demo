require 'rails_helper'

describe ReactStateRenderer do
  let!(:company) {
    Company.create!(name: 'Wantedly, Inc.', founded_on: Date.new(2010, 9, 1), country_cd: 'JP')
  }
  let!(:avatar) {
    Image.create!(name: 'avatar', imageable_id: company.id, imageable_type: 'Company', file_file_name: 'test', file_updated_at: Time.now)
  }
  let!(:project) {
    Project.create!(
      title: 'Web Engineer Wanted',
      published_at: Time.now,
      keywords: 'Ruby,Docker',
      company: company
    )
  }
  let(:request) {
    r = double(:request)
    allow(r).to receive(:original_url).and_return("https://www.wantedly.com/projects")
    allow(r).to receive(:query_parameters).and_return({}.with_indifferent_access)
    r
  }

  let(:controller) { 'projects' }
  let(:action) { 'index' }
  let(:resource) { Project.all.limit(5) }
  let(:resources) { { projects: resource } }

  describe '#initialize' do
    it 'can be called' do
      ReactStateRenderer.new(
        resources,
        request: request, controller: controller, action: action
      )
    end

    it 'does not allow resources which is not a hash' do
      expect {
        ReactStateRenderer.new(
          project,
          request: request, controller: controller, action: action
        )
      }.to raise_error(TypeError)
    end

    it 'does not allow empty args' do
      expect {
        ReactStateRenderer.new(
          {},
          request: request, controller: controller, action: action
        )
      }.to raise_error(ArgumentError)

      expect {
        ReactStateRenderer.new(
          resources,
          request: nil, controller: controller, action: action
        )
      }.to raise_error(ArgumentError)

      expect {
        ReactStateRenderer.new(
          resources,
          request: request, controller: '', action: action
        )
      }.to raise_error(ArgumentError)


      expect {
        ReactStateRenderer.new(
          resources,
          request: request, controller: controller, action: ''
        )
      }.to raise_error(ArgumentError)


      expect {
        ReactStateRenderer.new(
          resources,
          request: request, controller: nil, action: action
        )
      }.to raise_error(ArgumentError)


      expect {
        ReactStateRenderer.new(
          resources,
          request: request, controller: controller, action: nil
        )
      }.to raise_error(ArgumentError)
    end
  end

  let(:renderer) {
    ReactStateRenderer.new(
      resources,
      request: request, controller: controller, action: action
    )
  }

  describe '#perform' do
    let(:body) { { id: 1 } }

    before do
      allow(renderer).to receive(:serialize_resources).and_return(body)
    end

    it 'calls serialize_resources and returns the hole state' do
      expect(renderer).to receive(:serialize_resources)

      res = renderer.perform

      expect(res).to eq({
        global: {},
        controller: controller,
        action: action,
        body: body,
      })
    end

    # it 'returns with global'
  end

  let(:options) {
    {
      fields: [:id, :title],
      include: {
        company: {
          only: [:id, :name],
          avatar: {
            only: [:id],
          }
        }
      }
    }
  }

  describe '#serialize_resources' do
    let(:all_options) {
      {
        :projects => options
      }
    }

    before do
      allow(ReactStateRenderer::OptionsLoader).to receive(:load!).and_return(all_options)
    end

    it 'calls OptionsLoader.load! and pass it to #serialize_resource' do
      expect(ReactStateRenderer::OptionsLoader).to receive(:load!)
      expect(renderer).to receive(:serialize_resource).with(resource, options)
      renderer.serialize_resources(base_options: {})
    end

    it 'calls #preload_resource' do
      expect(renderer).to receive(:preload_resource).with(resource, options)
      renderer.serialize_resources(base_options: {})
    end

    it 'returns a json including projects key' do
      json = renderer.serialize_resources(base_options: {})
      expect(json).to be_an(Hash)
      expect(json[:projects]).to be_an(Array)
    end
  end

  describe '#serialize_resource' do
    context 'without any options' do
      it 'serializes a ActiveRecord::Relation to a json' do
        json = renderer.serialize_resource(resource, {})
        expect(json).to be_an(Array)
        expect(json[0]).to be_a(Hash)
      end

      it 'serializes a ActiveRecord::Relation to a json' do
        json = renderer.serialize_resource(resource, {})
        expect(json).to be_an(Array)
        expect(json[0]).to be_a(Hash)
      end

      let(:project_json) { renderer.serialize_resource(resource, {})[0] }

      it 'serializes all attributes by default' do
        # column based attribute
        expect(project_json.values_at(:id, :title, :published_at)).to eq([project.id, project.title, project.published_at])
        # computational attribute
        expect(project_json[:keywords]).to eq(['Ruby', 'Docker'])
      end

      it 'serializes nested associations by default' do
        expect(project_json[:company]).to be_a(Hash)
        expect(project_json[:company].values_at(:id, :name)).to eq([company.id, company.name])
      end

      it 'does not serialize twice nested associations by default' do
        expect(company.avatar).to be_an(Image)
        expect(project_json[:company][:avatar]).to eq(nil)
      end
    end

    context 'with options' do
      it 'serializes a ActiveRecord::Relation to a json' do
        json = renderer.serialize_resource(resource, options)
        expect(json).to be_an(Array)
        expect(json[0]).to be_a(Hash)
      end

      it 'serializes a ActiveRecord::Relation to a json' do
        json = renderer.serialize_resource(resource, options)
        expect(json).to be_an(Array)
        expect(json[0]).to be_a(Hash)
      end

      let(:project_json) { renderer.serialize_resource(resource, options)[0] }

      it 'serializes with specified attributes' do
        expect(project_json.values_at(:id, :title, :published_at)).to eq([project.id, project.title, nil])
      end

      it 'serializes nested association with specified attributes' do
        expect(project_json[:company]).to be_a(Hash)
        expect(project_json[:company].values_at(:id, :name)).to eq([company.id, company.name])
      end

      it 'serialize twice nested associations if specified' do
        expect(project_json[:company][:avatar]).to be_a(Hash)
        expect(project_json[:company][:avatar].values_at(:id, :url)).to eq([company.avatar.id, nil])
      end
    end
  end
end
