var express = require('express')
, cons = require('consolidate')
, Handlebars = require('handlebars')
, app = express()
, mongojs = require('mongojs')
, db = mongojs('HelloHandlebars', ['test']);


app.set('view engine', 'hbs');
app.engine('hbs', cons.handlebars);
app.set('views', __dirname + '/views');
app.use(app.router);

app.get('/index.html', function(req, res) {
	db.collection('test').find({}, function(err, docs) {
		if(err) res.send(500);
		console.log(docs);
		res.render('root', docs);
	});
});

app.listen(3000);
