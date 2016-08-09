var select = '.jsTabs-content jsTabs-active';
var url = 'http://ria.ru/';

var request = require('request');
var cheerio = require('cheerio');

var news = [];

request("http://ria.ru/", function (error, response, html) {
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        news = $("div").filter(".b-index__main-list-place").children().children().map(function(i, el) {
            return $(this).text();
        }).get().join('\r\n');
        console.log(news);
    }
});

var http = require("http");

function onRequest(request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write(news);
    response.end();
}
http.createServer(onRequest).listen(8888);