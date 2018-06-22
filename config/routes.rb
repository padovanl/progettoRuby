Rails.application.routes.draw do
  get 'posts/index'
  get 'posts/edit'
  get 'posts/show'
  get 'posts/new'
  get 'chat/index'
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
  get 'welcome/index'
  root 'welcome#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
