class RoomsController < ApplicationController
  def index
    @rooms = Room.all
  end

  

  def new
    @room = Room.new
  end

  def show
    @room = Room.find(params[:id])
    @places = @room.places.order("created_at DESC")
    @q = @room.places.ransack(params[:q])
  end

  private

  def room_params
    params.require(:room).permit(:name, :description).merge(user_id: current_user.id, place_id: params[:place_id])
  end
end
