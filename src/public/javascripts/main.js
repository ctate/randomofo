var blog_i = 0;
var sites;
var load = function() {
  $('iframe').remove();
  
  var random = Math.floor(Math.random() * (sites.length-1));
  var site = sites[random];
  blog_i++;
  
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
    success: function(json) {
      sites = json;
      load();
    }
  });
});
