class RegionsController < ApplicationController
  def index
  end

  def show
    @state_name = params[:state_name]
    @region_name = params[:region_name]
    xml_dir = Rails.root.join 'app/xml/',  @state_name, 'regions'
    xml_file_path = xml_dir + "#{@region_name}.xml"
    xml_content = File.read(xml_file_path)
    #this is ridiculous, but it works for now
    @locations_array = Hash.from_xml(xml_content)["TIDELOCATIONS"]["LOCATION"]
    @locations_array.map {|location| location.strip!}
  end
end
