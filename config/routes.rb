Rails.application.routes.draw do

  get 'welcome/index'
  root 'welcome#index'
  resources :publications, only: [:index]
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks"}


  resources :documents
  resources :posts do
    resources :comments
  end

  #admin
  get '/dashboard', to: 'admin#dashboard'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
