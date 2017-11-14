class Api::V2::ProjectsController < Api::V2::BaseController
  def index
    @projects = Project.listed.order(published_at: :desc)

    @projects = preload_for(@projects)

    render json: setup_pagination(@projects),
      fields: @fields,
      includes: @includes
  end

  def show
    @project = Project.find(params[:id])

    render json: @project,
      fields: @fields,
      include: @include
  end

  def related
    @projects = Project.related_of(params[:id])

    @projects = preload_for(@projects)

    render json: setup_pagination(@projects),
      fields: @fields,
      include: @include
  end
end
