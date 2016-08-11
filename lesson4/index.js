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

const url = {
    url: 'https://geekbrains.ru/',
    posts: '#posts',
    com: '#posts_comments'
};

app.get('/', (req, res) =>{
    res.render('index', {
        title: 'Greetings'
    });
});

function getPosts(idPost, callback) {
    request(url.url, (err, res, body) => {
        if (!err && res.statusCode == 200){
            const $ = cheerio.load(body);
            return callback($(idPost).children().children().map((i, el) => {
                    return $(this).text();
            }).get().join('\r\n'));
        }
    });
}

app.post('/', (req, res) => {
    if (!req.body) return res.sendStatus(400);
    switch (req.body.type){
        case 'p':
            getPosts(url.posts, (news) => {
                res.render('news', {
                    title: 'Posts',
                    content: news
                })
            });
            break;
        case 'c':
            res.render('news', {
                title: 'Comments',
                content: getPosts(url.com)
            });
    }
});

app.listen(8888);