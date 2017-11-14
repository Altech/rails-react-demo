class ProjectsController < ApplicationController
  def index
    @projects = Project.listed.where(country_cd: 'JP').order(monthly_support_count: :desc).page(params[:page] || 1).per(params[:per] || 5)
    @project_filter = ProjectFilterContentsService.new(current_user).fetch
    @featured_projects = Project.where(is_featured: true).order('RANDOM()').limit(5)

    render_react projects: @projects,
      featured_projects: @featured_projects,
      project_filter: @project_filter,
      total_count: @projects.total_count
  end

  def show
    @project = Project.find(params[:id])

    render_react project: @project
  end
end
