# Set the host name for URL creation
SitemapGenerator::Sitemap.default_host = "http://www.tidedata.com"

SitemapGenerator::Sitemap.create do
  # Put links creation logic here.
  #
  # The root path '/' and sitemap index file are added automatically for you.
  # Links are added to the Sitemap in the order they are specified.
  #
  # Usage: add(path, options={})
  #        (default options are used if you don't specify)
  #
  # Defaults: :priority => 0.5, :changefreq => 'weekly',
  #           :lastmod => Time.now, :host => default_host
  #
  # Examples:
  #
  # Add '/articles'
  #
  #   add articles_path, :priority => 0.7, :changefreq => 'daily'
  #
  # Add all articles:
  #
  #   Article.find_each do |article|
  #     add article_path(article), :lastmod => article.updated_at
  #   end

  # $ rake routes
  #
  #    Prefix   Verb  URI Pattern                                             Controller#Action
  #    states   GET   /states(.:format)                                       states#index
  #             GET   /states/:state_name(.:format)                           states#show
  #             GET   /states/:state_name/regions/:region_name(.:format)      regions#show
  # locations   GET   /states/:state_name/locations/:location_name(.:format)  locations#show
  #      root   GET   /                                                       states#index


  add(states_path)

  states_dir = Rails.root.join 'app', 'xml', '2014'

  Dir.foreach(states_dir) do |state_name|

    if state_name != "." && state_name != ".." && state_name != ".DS_Store"

      state_path = "/states/" + state_name
      add(state_path, changefreq: 'monthly')

      regions_dir = Rails.root.join 'app', 'xml', '2014', state_name, 'regions'
      Dir.foreach(regions_dir) do |region_name|
        if region_name != "." && region_name != ".." && region_name != ".DS_Store"
          add(state_path + "/regions/" + region_name.sub(".xml", ""), changefreq: 'monthly')
        end
      end

      locations_dir = Rails.root.join 'app', 'xml', '2014', state_name, 'locations'
      Dir.foreach(locations_dir) do |location_name|
        if location_name != "." && location_name != ".." && location_name != ".DS_Store"
          add(state_path + "/locations/" + location_name.sub(".xml", ""), changefreq: 'daily')
        end
      end

    end
  end
end
