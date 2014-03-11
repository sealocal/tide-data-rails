class StatesController < ApplicationController
  def index
  end

  def show
    @state_name = params[:name]
  end
end
