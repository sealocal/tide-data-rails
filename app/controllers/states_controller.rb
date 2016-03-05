class StatesController < ApplicationController
  def index
  end

  def show
    @state_name = params[:state_name]
    html_path = Rails.root.join('app/assets/states', snakify(@state_name) + '.html')
    @html_doc = File.open(html_path) { |f| Nokogiri::HTML(f) }

    # Store the regions and stations for keywords tag
    @regions = @html_doc.css('.grphdr1, .grphdr2').map{ |node| strip_whitespace node.text }
    @stations = @html_doc.css('.stationname').map{ |node| strip_whitespace node.text }

    # Point the station name links to station page
    @html_doc.css('.stationname a').each do |anchor|
      anchor.set_attribute('href', stations_path(@state_name, URI.parse(anchor['href']).query.split('=').last, { station_name: anchor.text }))
    end

    # Remove table colums
    @html_doc.css(extraneous_info_classes).remove
  end # show

  private

    def snakify(string)
      string.tr(' ', '').underscore
    end

    def strip_whitespace(string)
      string.gsub(/\A\p{Space}*|\p{Space}*\z/, '')
    end

    def extraneous_info_classes
      ".stn_id_hdr, .lat_hdr, .lon_hdr, .pred_type_hdr, .stationid, .latitude, .longitude, .pred_type"
    end
end
