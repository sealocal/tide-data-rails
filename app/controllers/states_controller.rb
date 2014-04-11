class StatesController < ApplicationController
  def index
  end

  def show
    @state_name = params[:state_name]
    @regions_array = Array.new
    xml_dir = Rails.root.join 'app/xml/2013', @state_name, 'regions'
    xml_dir.each_entry do |file_path|
      @regions_array << file_path.to_s
    end
    @regions_array.sort!
    @regions_array.shift
    @regions_array.shift
    @regions_array.map! { |file_name| file_name.sub(".xml", "") }
  end
end
