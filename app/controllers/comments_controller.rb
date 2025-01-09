class CommentsController < ApplicationController
  def create
    @comment = Comment.new(comment_params)
    @place = Place.find(params[:place_id]) 
    if @comment.save 
      CommentChannel.broadcast_to @place, { comment: @comment, user: @comment.user } 
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:text).merge(user_id: current_user.id, place_id: params[:place_id])
  end
end
