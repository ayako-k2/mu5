class PlacesController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create]
  before_action :set_room

  def index
    @room = Room.find(params[:room_id])
    @places = Place.all.order("created_at DESC")
    @q = Place.ransack(params[:q])
    @places = @q.result
  end

  def new 
    @place = Place.new
    @places = Place.all.order("created_at DESC")
    
  end

  def create
    @place = Place.new(place_params)
    if @place.save
      redirect_to room_places_path(@room)
    else
      flash.now[:alert] = 'この場所は既に登録されています。'
      render :new, status: :unprocessable_entity
    end
  end

  def show
    @place = Place.find(params[:id])
    @room = Room.find(params[:room_id])
    @room = @place.rooms.find(params[:room_id])
    @comments = @place.comments.includes(:user)
    @comment = Comment.new
  end

  def search
    @q = Place.ransack(params[:q])
    @places = @q.result
    render :index
  end

  
  private

  def place_params
    params.require(:place).permit(:name, :category, :address, :url, :website, :latitude, :longitude, :place_id, :prefecture).merge(user_id: current_user.id)
  end

  def set_room
    @room = Room.find(params[:room_id])
  rescue ActiveRecord::RecordNotFound
    redirect_to root_path, alert: "Room not found"
  end
end
