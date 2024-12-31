Rails.application.routes.draw do
  devise_for :users, controllers: {
   omniauth_callbacks: 'users/omniauth_callbacks',
   registrations: 'users/registrations'
 }
  root 'places#index'  
  resources :places, only: [:incex, :new]  
end
