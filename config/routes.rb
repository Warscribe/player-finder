Rails.application.routes.draw do
  root to: "home#index"
  get '/about', to: 'home#about'

  devise_for :users, controllers: { registrations: 'users/registrations' }

  get 'user/profile', to: 'users#profile'
  get 'users/search', to: 'users#search'
end
