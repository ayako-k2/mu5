class PlacesController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create]
  before_action :set_room

  def index
    @places = @room.places.order("created_at DESC")
    @q = @room.places.ransack(params[:q])
    @room = Room.find(params[:room_id])
  
  end

  def new 
    @place = Place.new
    @places = Place.all.order("created_at DESC")
    
  end



 def create
    @room = Room.find(params[:room_id])
    @place = Place.find_or_initialize_by(place_params)
  
    if @place.new_record? || !@room.places.exists?(place_id: @place.id)
      if @place.save
        RoomPlace.create(room: @room, place: @place)
        redirect_to room_places_path(@room)
      else
        flash.now[:alert] = 'エラーが発生しました。'
        render :new, status: :unprocessable_entity
      end
    else
      flash.now[:alert] = 'この場所は既に登録されています。'
      render :new, status: :unprocessable_entity
    end
  end


  def show
    @place = @room.places.find(params[:id])
    @comments = @place.comments.includes(:user)
    @comment = Comment.new
  end

  
  def destroy
    @place.destroy
   redirect_to room_place_path(@room), notice: 'Room was successfully deleted.'
 end

  def search
    @q = @room.places.ransack(params[:q])
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
