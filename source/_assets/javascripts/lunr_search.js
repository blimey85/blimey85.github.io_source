var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

this.LunrSearch = (function() {
  var debounce;

  function LunrSearch(elem, options) {
    this.bindKeypress = bind(this.bindKeypress, this);
    this.displayResults = bind(this.displayResults, this);
    this.search = bind(this.search, this);
    this.populateSearchFromQuery = bind(this.populateSearchFromQuery, this);
    this.compileTemplate = bind(this.compileTemplate, this);
    this.createIndex = bind(this.createIndex, this);
    this.$elem = elem;
    this.$results = $(options.results);
    this.$entries = $(options.entries, this.$results);
    this.indexDataUrl = options.indexUrl;
    this.index = this.createIndex();
    this.template = this.compileTemplate($(options.template));
    this.init();
  }

  LunrSearch.prototype.init = function() {
    return this.loadIndex((function(_this) {
      return function(data) {
        _this.populateIndex(data);
        _this.populateSearchFromQuery();
        return _this.bindKeypress();
      };
    })(this));
  };

  LunrSearch.prototype.createIndex = function() {
    return lunr(function() {
      this.field("title", {
        boost: 10
      });
      this.field("body");
      return this.ref("id");
    });
  };

  LunrSearch.prototype.compileTemplate = function(template) {
    return Handlebars.compile($(template).text());
  };

  LunrSearch.prototype.loadIndex = function(callback) {
    return $.getJSON(this.indexDataUrl, callback);
  };

  LunrSearch.prototype.populateIndex = function(data) {
    var entry, i, index, len, ref, results1;
    index = this.index;
    this.entries = data.map(function(raw) {
      if (raw.tags && raw.tags.length > 0) {
        var tags = raw.tags.join(", ");
      } else {
        var tags = 'Not Tagged';
      }
      return {
        id: raw.id + 1,
        title: raw.title,
        url: raw.url,
        body: raw.content,
        date: raw.date,
        tags: tags,
        category: raw.category,
        summary: raw.summary ? raw.summary : ''

      };
    });
    ref = this.entries;
    results1 = [];
    for (i = 0, len = ref.length; i < len; i++) {
      entry = ref[i];
      results1.push(index.add(entry));
    }
    return results1;
  };

  LunrSearch.prototype.populateSearchFromQuery = function() {
    var queryString, uri;
    uri = new URI(window.location.search.toString());
    queryString = uri.search(true);
    if (queryString.hasOwnProperty("q")) {
      $(this.$elem).val(queryString.q);
      return this.search(queryString.q.toString());
    }
  };

  LunrSearch.prototype.search = function(query) {
    var entries, results;
    entries = this.entries;
    if (query.length <= 2) {
      this.$results.hide();
      this.$entries.empty();
    } else {
      results = $.map(this.index.search(query), (function(_this) {
        return function(result) {
          var reference;
          reference = parseInt(result.ref, 10);
          return $.grep(entries, function(entry) {
            return entry.id === parseInt(result.ref, 10);
          })[0];
        };
      })(this));
    }
    if (results) {
      return this.displayResults(results);
    }
  };

  LunrSearch.prototype.displayResults = function(entries) {
    var $entries, $results;
    $entries = this.$entries;
    $results = this.$results;
    $entries.empty();
    if (entries.length === 0) {
      $entries.append("<p>Nothing found.</p>");
    } else {
      $entries.append(this.template({
        entries: entries
      }));
    }
    return $results.show();
  };

  LunrSearch.prototype.bindKeypress = function() {
    var input;
    input = $(this.$elem);
    return input.bind("keyup", debounce((function(_this) {
      return function() {
        return _this.search(input.val());
      };
    })(this)));
  };

  debounce = function(fn) {
    var slice, timeout;
    timeout = void 0;
    slice = Array.prototype.slice;
    return (function(_this) {
      return function() {
        var args, ctx;
        args = slice.call(arguments);
        ctx = _this;
        clearTimeout(timeout);
        return timeout = setTimeout(function() {
          return fn.apply(ctx, args);
        }, 100);
      };
    })(this);
  };

  return LunrSearch;

})();