class LocationsController < ApplicationController
  def index
  end

  def show
    @location_name = params[:name]
  end
end
