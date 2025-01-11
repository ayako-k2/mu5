Rails.application.routes.draw do
  devise_for :users, controllers: {
   omniauth_callbacks: 'users/omniauth_callbacks',
   registrations: 'users/registrations'
 }
  root to: 'places#index'  
  resources :places, only: [:index, :new, :create, :show] do
    collection do
      get 'search'
    end
    resources :comments, only: :create
  end

end
