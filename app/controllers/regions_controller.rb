class RegionsController < ApplicationController
  def index
  end

  def show
    @state_name = params[:state_name]
    @region_name = params[:region_name]
    xml_dir = Rails.root.join 'app/xml/2014', @state_name, 'regions'
    xml_file_path = xml_dir + "#{@region_name}.xml"
    xml_content = File.read(xml_file_path)
    #this is ridiculous, but it works for now
    @locations_array = Hash.from_xml(xml_content)["TIDELOCATIONS"]["LOCATION"]
    @locations_array.map {|location| location.strip!}

    #check number of LOCATION elements, and assign number of columns
    if (@locations_array.size <= 24)
      @number_of_columns = 1;
    elsif (@locations_array.size <= 50)
      @number_of_columns = 2;
    elsif (@locations_array.size <= 100)
      @number_of_columns = 3;
    else
      @number_of_columns = 4;
    end
  end
end
