class PlacesController < ApplicationController
  def index
    @places = Place.all   
    
  end

  def new 
    @place = Place.new
    
  end

  def create
    place = Place.new(place_params)
    if place.save
      redirect_to places_path, notice: '場所が登録されました。', status: :created
    else
      flash.now[:alert] = 'この場所は既に登録されています。'
      render :new, status: :unprocessable_entity
    end
  end

  
  private

  def place_params
    params.require(:place).permit(:name, :category, :address, :url, :website, :latitude, :longitude, :place_id, :prefecture)
  end
end
