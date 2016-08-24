/**
 * Created by kalter on 8/18/2016.
 */
const express = require('express');
const router = express.Router();
const Tasks = require(__dirname + '/../models/tasks');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
router.use(cookieParser());
router.use(bodyParser.urlencoded({extended: true}));
router.get('/', (req, res) => {
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

router.get('/add', (req, res) => {
  if (!req.body) return res.send(res.sendStatus(400));
  res.render('add');
});

router.post('/add', (req, res) => {
  if (!req.body) return res.send('cmon');
  const task = {
    name: req.body.name,
    text: req.body.text,
    priority: req.body.priority
  };
  Tasks.add(task, (err) => {
    if (err) {
      console.log(err);
    }
    res.redirect('/');
  });
});

module.exports = router;