Rails.application.routes.draw do

  root to: "dashboard#index"

  resources :projects, only: [:index, :show] do
  end

  namespace :api do
    namespace :v2 do
      resources :projects, only: [:index, :show] do
        member do
          get :related
        end
      end
    end
  end
end
