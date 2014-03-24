class LocationsController < ApplicationController
  def index
  end

  def show
    @location_name = params[:location_name]
  end
end
