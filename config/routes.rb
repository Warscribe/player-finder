Rails.application.routes.draw do
  root to: "home#index"
  get '/about', to: 'home#about'

  devise_for :users, controllers: { registrations: 'users/registrations' }

  resources :users, only: [:index] do
    collection do
      get 'profile'
      get 'search'
    end
  end
end
