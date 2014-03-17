class RegionsController < ApplicationController
  def index
  end

  def show
    @region_name = params[:name]
  end
end
