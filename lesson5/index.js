/**
 * Created by kalter on 8/15/2016.
 */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
const template = require('consolidate');
const cheerio = require('cheerio');
app.engine('hbs', template.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const Tasks = require(__dirname + '/models/tasks');

app.get('/', (req, res) => {
  "use strict";
  if (!req.body) return res.send(res.sendStatus(400));
  Tasks.list( (err, rows) => {
    if (!err){
      res.render('index', {
        title: 'tasks',
        tasks: rows
      })
    } else {
      console.error(err);
    }
  });
});

app.listen(8888);