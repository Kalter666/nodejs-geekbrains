/**
 * Created by kalter on 8/15/2016.
 */
const express = require('express');
const app = express();
const template = require('consolidate');
const router = require(__dirname + '/routers/router');
app.engine('hbs', template.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(router);
app.listen(8888);