var sites, site_urls;
var load = function() {
  $('iframe').remove();
  
  if (location.hash && location.hash.length) {
    var site = {
      name: 'randomofo',
      url: location.hash.substr(1)
    };
    location.hash = '';
  } else {
    var random = Math.floor(Math.random() * (sites.length-1));
    var site = sites[random];
  }
  
  var site_title = site.name;
  var site_url = site.url;
  
  $('h1 a').attr('href', site_url);
  $('h1 a').text(site_url.replace(/(^https?:\/\/|www\.|\/$)/ig, ''));
  
  var iframe = $(document.createElement('iframe'));
  iframe.attr('frameborder', 0);
  iframe.attr('name', 'frame');
  iframe.attr('src', site_url);
  $('#frame').append(iframe);
  
  $('.report').attr('href', "mailto:report@randomofo.com?subject=Report%20a%20Blog&body=" + site_url);
  
  $(window).resize();
};

var search = function(keyword) {
  sites.each(function(i) {
    if ($(this).attr('xmlUrl').match(keyword)) {
      console.log(i + ': ' + website($(this).attr('xmlUrl')));
    } 
  });
};

var website = function(www) {
  if (!www.match(/^http/i)) {
    www = 'http://' + www;
  }
  www = www.replace(/(\?format=rss|\/atom\.xml|\/rss\.xml|(\/(1|8))?\/feed|\/feeds\/posts\/default\/?(\?alt=rss)?|\?feed=rss2?|feed\/|\/rss2?\/?)$/ig, '');
  return www;
};

$(window).load(function() {
  $(window).resize(function() {
    if (navigator.userAgent.match('Mobile')) {
      $('body, iframe').css('height', 'auto');
    } else {
      $('iframe').css('height', $(window).height());
    }
  });
  $(window).resize();
  
  $.ajax({
    type: 'GET',
    url: '/data/veganmofo.json',
    dataType: 'json',
    success: function(results) {
      $.ajax({
        type: 'GET',
        url: '/data/ignore.json',
        dataType: 'json',
        success: function(ignore) {
          var length = ignore.length;
          for (var i = 0; i < length; i++) {
            ignore.push('www.' + ignore[i]);
          }
          
          site_urls = [];
          sites = [];
          for (var i = 0; i < results.length; i++) {
            var parser = document.createElement('a');
            parser.href = results[i].url;
            if (ignore.indexOf(parser.hostname) === -1) {
              sites.push(results[i]);
              site_urls.push(results[i].url);
            }
          }
          load();
        }
      });
    }
  });
});
