class LocationsController < ApplicationController
  def show
    @state_name = params[:state_name]
    @location_name = params[:location_name]
    xml_dir = Rails.root.join 'app/xml/2014', @state_name, 'locations'
    xml_file_path = xml_dir + "#{@location_name}.xml"
    xml_content = File.read(xml_file_path)
    @annual_data = Hash.from_xml(xml_content)
  end
end
