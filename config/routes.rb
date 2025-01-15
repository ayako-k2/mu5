Rails.application.routes.draw do
  devise_for :users, controllers: {
   omniauth_callbacks: 'users/omniauth_callbacks',
   registrations: 'users/registrations'
 }

  root to: 'rooms#index'  
  resources :rooms, only: [:index, :new, :create, :show, :destroy] do
    resources :places, only: [:index, :new, :create, :show, :destroy] do
      collection do
        get 'search'
      end
      resources :comments, only: [:create, :destroy]
    end
  end

end
