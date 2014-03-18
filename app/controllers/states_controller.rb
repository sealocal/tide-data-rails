class StatesController < ApplicationController
  def index
  end

  def show
    @state_name = params[:state_name]
  end
end
