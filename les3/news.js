const request = require('request');
const cheerio = require('cheerio');
const http = require("http");

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

function onRequest(request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write(news);
    response.end();
}
http.createServer(onRequest).listen(8888);