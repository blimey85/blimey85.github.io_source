require 'json'

module Jekyll
  class SearchData < Jekyll::StaticFile
    def write(dest)
      true
    end
  end

  class SearchGenerator < Jekyll::Generator

    EXCLUDE = ["Not found", "Internal Server Error", "Blog Archive", "store_bak", "Contact", "Search"]

    def generate(site)
      @search_array = []
      search_posts(site)
      search_pages(site)
      file = File.new(File.join(site.dest, "search.json"), "w")
      file.write(JSON.pretty_generate(@search_array))
      file.close
      site.static_files << Jekyll::SearchData.new(site, site.dest, "/", "search.json")
    end

    def search_posts(site)
      site.posts.each_with_index do |post, i|
        @search_array << {
          id: i,
          title: post.data["title"],
          summary: post.data["summary"],
          category: post.categories.first,
          tags: post.tags,
          url: post.url,
          content: post.content,
          date: ordinalize(post.date)
        }
      end
    end

    def search_pages(site)
      site.pages.each_with_index do |page, i|
        if page.data["title"]
          unless EXCLUDE.include? page.data["title"]
            @search_array << {
              id: i,
              title: page.data["title"],
              url: page.url,
              content: page.content
            } unless page.url == "/index.html"
          end
        end
      end
    end

    def ordinalize(date)
      "#{date.strftime('%b %-d')}#{ordinal_suffix(date)}, #{date.strftime('%Y')}"
    end

    def ordinal_suffix(date)
      number = date.strftime('%e').to_i
      if (11..13).include?(number % 100)
        "th"
      else
        case number % 10
          when 1; "st"
          when 2; "nd"
          when 3; "rd"
          else    "th"
        end
      end
    end

  end
end
