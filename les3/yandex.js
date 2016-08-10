/**
 * Created by kalter on 8/10/2016.
 */
const yourkey = require('./key');
var key = yourkey.key;
var url = 'https://translate.yourkey.net/api/v1.5/tr/translate?';
var request = require('request');
const readline = require('readline');
const cheerio = require('cheerio');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var getTranslation = function (xml) {
    var $ = cheerio.load(xml);
    console.log($('text').text());
};

var translate = function (text) {
    var str = url + 'key=' + key + '&text=' + encodeURIComponent(text) + '&lang=ru';
    request(str, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            getTranslation(body);
        } else {
            console.error(error);
        }
    });
};

rl.on('line', (answer) => {
    if (answer != '') {
        console.log('Your text: ' + answer);
        translate(answer);
    } else {
        console.log('Write smth to translate');
    }
});