class UsersController < ApplicationController
  def profile
    @user = current_user
  end

  def search
    @range = params[:range].empty? ? 20.0 : params[:range].to_f
    @city = params[:city]
    @country = params[:country]

    @users = User.near("#{@city}, #{@country}", @range)
    @users = @users.where.not(id: current_user.id) if user_signed_in?
  end
end
