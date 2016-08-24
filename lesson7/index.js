/**
 * Created by kalter on 8/24/2016.
 */
const restify = require('restify');
const tasks = require(__dirname + '/models/tasks');
const rest = restify.createServer({
  name: 'Золотая чаша, золотая'
});

rest.use(restify.queryParser());
rest.get('/', (req, res) => {
  res.send(200, "ДАРОВА");
});

rest.get('/tasks', (req, res) => {
  tasks.list((err, tasks) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send(JSON.stringify(tasks));
  });
});

rest.post('/tasks/name/:name/text/:text/priority/:priority', (req, res) => {
  const task= {
    name: req.params.name,
    text: req.params.text,
    priority: req.params.priority
  };
  tasks.add(task, err => {
    if (err) {
      return console.log(err);
    }
    res.send({result:'ДОБАВИЛ: ', task});
  });
});

rest.put('/tasks/:id/text/:text/priority/:priority', (req, res) => {
  const task= {
    id: req.params.id,
    name: req.params.name,
    text: req.params.text,
    priority: req.params.priority
  };
  tasks.change(task, (err) => {
    if (err) {
      return console.log(err);
    }
    res.send({result:'изменил: ', task});
  });
});

rest.put('/tasks/:id/complete', (req, res) => {
  const task= {
    id: req.params.id,
    complete: 1
  };
  tasks.complete(task, err => {
    if (err) {
      return console.log(err);
    }
    res.send({result:'красава'});
  });
});

rest.del('/tasks/:id', (req, res) => {
  const task= {
    id: req.params.id
  };
  tasks.delete(task, (err) => {
    if (err) {
      return console.log(err);
    }
    res.send({result:'удолил'});
  });
});


rest.listen(8888, () => {
  console.log('работай');
});