/**
 * Created by kalter on 8/10/2016.
 */
const express = require('express');
const app = express();
const request = require('request');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
const cheerio = require('cheerio');
const template = require('consolidate');
app.engine('hbs', template.handlebars);
app.set('view engine', 'hbs');
app.set('views',__dirname+'/views');
const cookieSession = require('cookie-session');

const url_ria = {
    name: 'Ria news',
    uri: 'http://ria.ru/',
    id: ".b-index__main-list-place"
};

const url_ya = {
    name: 'Yandex',
    uri: 'https://news.yandex.ru/',
    id: '.rubric__right'
};

app.get('/', (req, res) =>{
    const sess = req.session;
    res.render('index', {
        title: 'Greetings',
        cite: [url_ria.name, url_ya.name]
    });
});

function getPosts(url, cb) {
    request(url.uri, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
            cb($(url.id).children().children().map(function (i, el) {
                return $(this).text();
            }).get());
        }
    });
}

app.post('/', (req, res) => {
    if (!req.body) return res.sendStatus(400);
    switch (req.body.type){
        case url_ria.name:
            getPosts(url_ria, (cb) => {
                res.render('news', {
                    title: url_ria.name,
                    content: cb
                })
            });
            break;
        case url_ya.name:
            getPosts(url_ya,(cb) => {
                res.render('news', {
                    title: url_ya.name,
                    content: cb
                })
            });
    }
});

app.listen(8888);