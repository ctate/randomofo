var scraperjs = require('scraperjs'),
  fs = require('fs');

scraperjs.StaticScraper.create('http://veganmofo.com/2015-blogroll')
  .scrape(function($) {
    return $('.entry-content p a').map(function() {
      var data = {};
      data['name'] = $(this).text().trim();
      data['url'] = $(this).attr('href').trim();
      return data;
    }).get();
  }, function(results) {
    console.log(results);
    fs.writeFileSync('src/public/data/veganmofo.json', JSON.stringify(results, null, "\t"), 'utf-8');
  })
