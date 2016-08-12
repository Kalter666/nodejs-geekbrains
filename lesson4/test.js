/**
 * Created by kalter on 8/12/2016.
 */
const request = require('request');
const cheerio = require('cheerio');
const http = require("http");

function ka(cb) {
    request("http://ria.ru/", function (error, response, html) {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
            cb($(".b-index__main-list-place").children().children().map(function (i, el) {
                return $(this).text();
            }).get().join('\r\n'));
        }
    });
}

ka((cb) => {
    console.log(cb);
});
function getPosts(url, cb) {
    request("http://ria.ru/", (err, res, body) => {
        if (!err && res.statusCode == 200){
            const $ = cheerio.load(body);
            cb($(".b-index__main-list-place").children().children().map((i, el) => {
                return $(this).text();
            }).get().join('\r\n'));
        }
    });
}
const url_ria = {
    uri: 'http://ria.ru/',
    id: ".b-index__main-list-place"
};
getPosts(url_ria, (cb) => {
    console.log(cb);
});