Rails.application.routes.draw do

  get 'theses/index'
  get 'theses/show'
  get 'user_courses/show'
  get 'welcome/index'
  root 'welcome#index'

  get '/javascript_disabled', to: 'welcome#jsDisabled', as: 'jsDisabled'

  devise_for :users, controllers: {omniauth_callbacks: "users/omniauth_callbacks"}

  resources :upvotes
  resources :publications, only: [:show]
  resources :upvotes, only: [:create, :destroy]
  resources :resources, only: [:show]
  resources :tags, only: [:index]
  resources :documents
  resources :posts
  resources :comments
  resources :courses, only: [:show]
  resources :reps, only: [:index, :show, :create, :update, :destroy]
  resources :theses, only: [:index, :show]


  #courses (user)
  resources :courses do
    resources :questions, only: [:index, :create, :destroy, :update]
  end
  #report di una domanda
  post "/report_question/:id", to: "questions#reportQuestion"

  resources :courses do
    resources :course_tips, only: [:index, :create, :destroy, :update]
  end

  post "/report_tip/:id", to: "course_tips#reportTip"


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
  post :follow, controller: :courses
  put :unfollow, controller: :courses

  #rep_mail
  post :send_email, controller: :reps
  get :get_places, controller: :reps

  #get names
  get :teachers_name, controller: :teachers
  get :courses_name, controller: :courses
  get :search_degrees, controller: :courses
  get :theses_title, controller: :theses



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
        resources :user_courses, only: [:show, :update]
      end
    end
  end

  get "/course/:course_id/survey/:id", to: "api/v1/user_courses#show"

  get "/dashboard/thesis/tags/:thesis_id", to: "admin#thesis_tags"
  get "/dashboard/cdl/courses/:degree_course_id", to: "admin#courses"
  get "/dashboard/degree_course/:degree_course_id/course/teachers/:course_id", to: "admin#teacher_courses"
  get "/api/v1/theses/search/prof/:teacher_id", to: "api/v1/theses#searchByProf"
  get "/api/v1/theses/search/title/(:string)", to: "api/v1/theses#searchByTitle"
  get "/dashboard/mail", to: "admin#mailing_list"
  post "/dashboard/mail", to: "admin#send_emails"

  get "/api/v1/users", to: "api/v1/users#index"
  post "/api/v1/users/set_admin/:user_id", to: "api/v1/users#setAdmin"
  post "/api/v1/users/block/:user_id", to: "api/v1/users#blockUser"
  post "/api/v1/users/unblock/:user_id", to: "api/v1/users#unblockUser"

  #report post, document, repetition
  post "/report_post/:id", to: "posts#reportPost"
  post "/report_document/:id", to: "documents#reportDocument"
  post "/report_rep/:id", to: "reps#reportRep"
  post "/report_comment/:id", to: "comments#reportComment"



  #route index notifiche

#notifications
  resources :notifications, only: [:index, :destroy]
  get "/notifications", to: "notifications#index"
  get "/new_notifications", to: "notifications#getCount"
  get "/notifications_nav_bar", to: "notifications#notificationsNavBar"
  put "/mark_as_read_notification/:id", to: "notifications#markAsRead"
  put "/update_is_selected_notification", to: "notifications#updateIsSelected"

  #reports
  resources :reports, only: [:show, :index, :destroy]
  get "/reports", to: "reports#index"
  get "/reports/:id", to: "reports#show"
  get "/new_reports", to: "reports#getCount"
  put "/mark_as_read_report/:id", to: "reports#markAsRead"
  put "/update_is_selected_report", to: "reports#updateIsSelected"


  # thesis
  get "/thesis/:id", to: "theses#show"


  mount ActionCable.server, at: '/cable'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
