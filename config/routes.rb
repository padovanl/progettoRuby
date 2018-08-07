Rails.application.routes.draw do

  get 'welcome/index'
  root 'welcome#index'
  resources :publications, only: [:index]
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks"}


  resources :documents
  resources :posts
  resources :comments

  get '/courses', to: 'courses#index'
  resource :courses, only: [:show]

  #admin
  get '/dashboard', to: 'admin#dashboard'

  namespace :api do
    namespace :v1 do
      resources :courses, only: [:index, :create, :destroy, :update]
    end
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
