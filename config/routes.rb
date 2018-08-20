Rails.application.routes.draw do

  resources :upvotes
  get 'welcome/index'
  root 'welcome#index'
  resources :publications, only: [:index]
  resources :upvotes, only: [:create, :destroy]
  devise_for :users, controllers: {omniauth_callbacks: "users/omniauth_callbacks"}


  resources :documents


  get '/allcourses', to: 'courses#allcourses'

  resources :posts
  resources :comments

  #admin
  get '/dashboard', to: 'admin#dashboard'


  #namespace :api do
  #  namespace :v1 do
  #    resources :courses, only: [:index, :create, :destroy, :update]
  #  end
  #end

  namespace :api do
    namespace :v1 do
      resources :degree_courses, only: [:index, :create, :destroy, :update]
    end
  end

  namespace :api do
    namespace :v1 do
      resources :tags, only: [:index, :create, :destroy, :update]
    end
  end

  namespace :api do
    namespace :v1 do
      resources :teachers, only: [:index, :create, :destroy, :update]
    end
  end

  namespace :api do
    namespace :v1 do
      resources :theses, only: [:index, :create, :destroy, :update]
    end
  end

  namespace :api do
    namespace :v1 do
      resources :theses do
        resources :thesis_tags, only: [:index, :create, :destroy] #tolto :update
      end
    end
  end

  namespace :api do
    namespace :v1 do
      resources :degree_courses do
        resources :courses, only: [:index, :create, :destroy, :update]
      end
    end
  end

  namespace :api do
    namespace :v1 do
      resources :course do
        resources :teacher_courses, only: [:index, :create, :destroy] #tolto :update
      end
    end
  end

  get "/dashboard/thesis/tags/:thesis_id", to: "admin#thesis_tags"
  get "/dashboard/cdl/courses/:degree_course_id", to: "admin#courses"
  get "/dashboard/course/teachers/:course_id", to: "admin#teacher_courses"
  get "/api/v1/theses/search/prof/:teacher_id", to: "api/v1/theses#searchByProf"

  mount ActionCable.server, at: '/cable'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
