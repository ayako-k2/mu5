class RoomsController < ApplicationController
  before_action :authenticate_user!, only: [:destroy]
  before_action :set_room, only: [:show, :destroy]
  before_action :correct_user, only: [:destroy]


  def index
    @rooms = Room.all
    @room = Room.find(params[:id]) if params[:id].present?
  end

  

  def new
    @room = Room.new
  end

  def create
    @room = Room.new(room_params)
    if @room.save
      redirect_to rooms_path(@room)
    else
      render :new, status: :unprocessable_entity
    end
  end

  def show
    @places = @room.places.order("created_at DESC")
    @q = @room.places.ransack(params[:q])
    
  end

  def update
    if @item.update(item_params)
      redirect_to item_path
    else
    render :edit, status: :unprocessable_entity
    end
  end

  def destroy
     @room.destroy
    redirect_to root_path, notice: 'Room was successfully deleted.'
  end


  private

  def room_params
    params.require(:room).permit(:name, :description, :image).merge(user_id: current_user.id)
  end

  def set_room
    @room = Room.find(params[:id])
  end

  def correct_user
    unless current_user.id == @room.user_id
      redirect_to rooms_path, alert: 'You are not authorized to delete this room.'
    end
  end

end


