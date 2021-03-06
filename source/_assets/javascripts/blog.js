var hideTwitterAttempts = 0;
function hideTwitterBoxElements() {
    setTimeout( function() {
        if ( $('[id*=twitter]').length ) {
            $('[id*=twitter]').each( function(){
                var ibody = $(this).contents().find( 'body' );

                if (ibody.find('.timeline .stream .h-feed li.tweet').length) {
                    ibody.find('li.h-entry.tweet.customisable-border').css('border-bottom', '1px solid #ddd');
                } else {
                    $(this).hide();
                }
            });
        }
        hideTwitterAttempts++;
        if ( hideTwitterAttempts < 3 ) {
            hideTwitterBoxElements();
        }
    }, 500);
}

// lunr search
//$(function () {
//    $('#search-query').lunrSearch({
//        indexUrl: '/js/index.json',   // Url for the .json file containing search index data
//        results: '#search-results',  // selector for containing search results element
//        entries: '.entries',         // selector for search entries containing element (contained within results above)
//        template: '#search-results-template'  // selector for Mustache.js template
//    });
//});

$(document).ready(function () {
  // Lunr Search
  return new LunrSearch('#search-query', {
    indexUrl: "/search.json",
    results: "#search-results",
    entries: ".entries",
    template: "#search-results-template"
  });

  // Twitter - add borders between tweets
  hideTwitterBoxElements();

  // Tag Cloud
  if (!$('#myCanvas').tagcanvas({
    textColour: '#157ab5',
    outlineMethod: 'none',
    reverse: true,
    depth: 0.8,
    weight: true,
    weightSizeMin: 10,
    weightSizeMax: 40,
    wheelZoom: false,
    maxSpeed: 0.03
  }, 'tags')) {
    // something went wrong, hide the canvas container
    $('#myCanvasContainer').hide();
  }


  (function () {

    // This function does the dirty work of finding the event type and setting the appropriate title
    var updatePageTitle = function ( evt ) {
        var v = $(document).find('title').attr('alt'), // The title when tab is visible
            h = "Miss You :(", // The title when tab is hidden
            evtMap = {
                focus: v,
                focusin: v,
                pageshow: v,
                blur: h,
                focusout: h,
                pagehide: h
            }; // Map each title to the different events

        evt = evt || window.event;

        // If the event type exists in the map, set the right title
        if ( evt.type in evtMap ) {
            document.title = evtMap[ evt.type ];
        } else {
            // Last ditch attempt
            if ( document.hidden ) {
                document.title = h;
            } else {
                document.title = v;
            }
        }
    };

    // This sets the appropriate listeners so that everything works cross browser
    var hidden = "hidden";

    // Standards:
    if ( hidden in document )
        document.addEventListener( "visibilitychange", updatePageTitle );
    else if ( ( hidden = "mozHidden" ) in document )
        document.addEventListener( "mozvisibilitychange", updatePageTitle );
    else if ( ( hidden = "webkitHidden" ) in document )
        document.addEventListener( "webkitvisibilitychange", updatePageTitle );
    else if ( ( hidden = "msHidden" ) in document )
        document.addEventListener( "msvisibilitychange", updatePageTitle );
    // IE 9 and lower:
    else if ( "onfocusin" in document )
        document.onfocusin = document.onfocusout = updatePageTitle;
    // All others:
    else
        window.onpageshow = window.onpagehide = window.onfocus = window.onblur = updatePageTitle;

})();
});

(function($) {

  /**
   * Copyright 2012, Digital Fusion
   * Licensed under the MIT license.
   * http://teamdf.com/jquery-plugins/license/
   *
   * @author Sam Sehnert
   * @desc A small plugin that checks whether elements are within
   *     the user visible viewport of a web browser.
   *     only accounts for vertical position, not horizontal.
   */

  $.fn.visible = function(partial) {
    var $t            = $(this),
    $w            = $(window),
    viewTop       = $w.scrollTop(),
    viewBottom    = viewTop + $w.height(),
    _top          = $t.offset().top,
    _bottom       = _top + $t.height(),
    compareTop    = partial === true ? _bottom : _top,
    compareBottom = partial === true ? _top : _bottom;

    return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
  };

})(jQuery);

var win = $(window);
var allMods = $(".slide-in");

allMods.each(function(i, el) {
  var el = $(el);
  if (el.visible(true)) {
      el.addClass("already-visible");
  }
});

win.scroll(function(event) {
  allMods.each(function(i, el) {
      var el = $(el);
      if (el.visible(true)) {
          el.addClass("come-in");
      }
  });
});
