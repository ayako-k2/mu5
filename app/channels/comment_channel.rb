class CommentChannel < ApplicationCable::Channel
  def subscribed
    @place = Place.find(params[:place_id]) # 追記
    stream_for @place 
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
