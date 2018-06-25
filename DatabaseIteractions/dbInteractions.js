/*
**  eleyf
**  3/15/18
**  cs290 w2018
**  HW Assignment - DB Interactions and UI
*/

var express = require('express');
var mysql = require('./dbcon.js');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 4532);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// main client page
app.get('/',function(req,res){
  res.render('clientUI');
});


// GET app to view table data
app.get('/table-data',function(req,res,next){

  var context = {};
  mysql.pool.query('SELECT * FROM workouts', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    res.send(context.results);
  });
});


// POST app to insert data into table
app.post('/insert',function(req,res,next){
  var bodyParams = [];
  for (var p in req.body){
    bodyParams.push({'name':p,'value':req.body[p]})
  }
  var context = {};
  mysql.pool.query("INSERT INTO workouts (`name`, `reps`, `weight`, `date`, `lbs`) VALUES (?, ?, ?, ?, ?)",
   [req.body.exerciseName, req.body.reps, req.body.weight, req.body.date, req.body.lbs], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = result;
    res.sendStatus(200);
  });
});


// POST app to delete row
app.post('/delete',function(req,res,next){

  var bodyParams = [];
  for (var p in req.body){
    bodyParams.push({'name':p,'value':req.body[p]})
  }

  var context = {};
  mysql.pool.query("DELETE FROM workouts WHERE id=?", [req.body.rowId], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = result;
    res.sendStatus(200);
  });
});


// GET app to edit row
app.get('/edit',function(req,res){

  var context = {};
  mysql.pool.query("SELECT * FROM workouts WHERE id=?", [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }
  context.id = result[0].id;
  context.name = result[0].name;
  context.reps = result[0].reps;
  context.weight = result[0].weight;
  context.date = result[0].date;
  context.lbs = result[0].lbs;
  res.render('editRow',context);
  });
});


// POST app to update row
app.post('/update',function(req,res,next){
  var bodyParams = [];
  for (var p in req.body){
    bodyParams.push({'name':p,'value':req.body[p]})
  }

  var context = {};
  mysql.pool.query("SELECT * FROM workouts WHERE id=?", [req.body.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    if(result.length == 1){
      var curVals = result[0];
        mysql.pool.query("UPDATE workouts SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id=? ",
          [req.body.exerciseName || curVals.name, req.body.reps || curVals.reps, req.body.weight || curVals.weight,
           req.body.date || curVals.date, req.body.lbs || curVals.lbs, req.body.id],
          function(err, result){
          if(err){
            next(err);
            return;
          }
          context.results = "Updated " + result.changedRows + " rows.";
          res.send(context.results);
        });
    }
  });
});


// GET app to reset to an empty table
app.get('/reset-table',function(req,res,next){
  var context = {};
  mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err){
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    mysql.pool.query(createString, function(err){
      context.results = "Table reset";
      res.render('resetTable',context);
    })
  });
});


// 404 error
app.use(function(req,res){
  res.status(404);
  res.render('404');
});


// 500 error
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});


app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});