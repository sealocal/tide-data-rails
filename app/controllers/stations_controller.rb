class StationsController < ApplicationController
  def show
    state_name = params[:state_name]
    station_id = params[:station_id]
    @station_name = params[:station_name]

    # NOAA Tides and Currents API Documentation: https://tidesandcurrents.noaa.gov/api/
    noaa_api_url = 'http://tidesandcurrents.noaa.gov/api/datagetter?' +
                   "station=#{station_id}&" +
                   "begin_date=#{Date.today.to_formatted_s(:number)}&" +
                   "end_date=#{Date.today.to_formatted_s(:number)}&" +
                   "product=water_level&" +
                   "datum=MLLW&" +
                   "units=english&" +
                   "time_zone=lst_ldt&" +
                   "format=json"

    json_data = HTTParty.get(noaa_api_url).body
    @tide_data = JSON.parse json_data
  end
end
