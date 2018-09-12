Rails.application.routes.draw do

  get 'user_courses/show'
  get 'welcome/index'
  root 'welcome#index'

  get '/javascript_disabled', to: 'welcome#jsDisabled', as: 'jsDisabled'

  devise_for :users, controllers: {omniauth_callbacks: "users/omniauth_callbacks"}

  resources :upvotes
  resources :publications, only: [:index]
  resources :upvotes, only: [:create, :destroy]
  resources :resources, only: [:index]
  resources :tags, only: [:index]
  resources :documents
  resources :posts
  resources :comments
  resources :courses, only: [:show]
  resources :reps, only: [:index, :create, :update, :destroy]


  #courses (user)
  resources :courses do
    resources :questions, only: [:index, :create, :destroy, :update]
  end

  resources :courses do
    resources :course_tips, only: [:index, :create, :destroy, :update]
  end

  resources :courses do
    resources :questions do
      resources :frequency_questions, only: [:index, :destroy, :update, :create]
      end
  end

  # route utilizzata per visualizzare la pagina delle statistiche del singolo corso
  resources :courses do
    resources :user_courses , only: [:index]
  end


  get '/allcourses', to: 'courses#allcourses'
  get :mycourses, controller: :courses
  get :search_degrees, controller: :courses
  get :courses_name, controller: :courses
  post :follow, controller: :courses
  put :unfollow, controller: :courses

  #rep_mail
  post :send_email, controller: :reps

  get :teachers_name, controller: :teachers


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

  #index utilizzata per visualizzare il sondaggio da compilare per l'utente x
  # la show invece la richiamo in manier asincrona dentro i componenti react per vedere ottenere il singolo record sul
  # follow o se un utente ha passato il corso.
  namespace :api do
    namespace :v1 do
      resources :users do
        resources :user_courses, only: [:show, :index, :update]
      end
    end
  end

  get "/dashboard/thesis/tags/:thesis_id", to: "admin#thesis_tags"
  get "/dashboard/cdl/courses/:degree_course_id", to: "admin#courses"
  get "/dashboard/degree_course/:degree_course_id/course/teachers/:course_id", to: "admin#teacher_courses"
  get "/api/v1/theses/search/prof/:teacher_id", to: "api/v1/theses#searchByProf"
  get "/api/v1/theses/search/title/(:string)", to: "api/v1/theses#searchByTitle"
  get "/dashboard/mail", to: "admin#mailing_list"
  post "/dashboard/mail", to: "admin#send_emails"

  get "/api/v1/users", to: "api/v1/users#index"
  post "/api/v1/users/set_admin/:user_id", to: "api/v1/users#setAdmin"


  #route index notifiche
  get "/notifications", to: "notifications#index"
  get "/api/v1/new_notifications", to: "api/v1/notifications#getCount"
  namespace :api do
    namespace :v1 do
      resources :notifications, only: [:index, :destroy]
    end
  end

  mount ActionCable.server, at: '/cable'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
