Rails.application.routes.draw do
  resources :publications
  resources :posts, only: [:index]
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
  get 'welcome/index'
  root 'welcome#index'

  resources :courses


  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
