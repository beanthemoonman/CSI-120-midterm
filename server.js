var express = require('express');
var ejs = require('ejs');
var app = express();
var twitterAPI = require('node-twitter-api');
var twitter = new twitterAPI({
	consumerKey: 'HGOvd84clRvWaiGLVfsdpA',
	consumerSecret: '2BKlskG82sOKCa0zkXkZ1gSsyxYbgj96lOhkdcHk',
	callback: ''
	
});
twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
	if (error){
		
});
var analyze = require('sentiment').analyze;
var mymodel = require('bookshelf');


// handle posts in express
app.use(express.bodyParser());

// use root '/' to access public files folder ie '/index.html'
app.use('/', express.static(__dirname + '/public'));

// use Embedded Javascript templating
app.engine('html', ejs.renderFile);

// handles form post
app.post('/formPost', function(req, res){
	console.log(req.body);
	 /*
	 { 
	 email: 'email@champlain.edu',
	  hashtags: '#CampChamp',
	  apiToUse: 'facebook',
	  numResults: '3',
	  location: [ 'eu', 'am', 'sa' ],
	  dateOfContent: '2013-10-11',
	  area: 'This\r\nis\r\nso\r\nmulti-\r\nline!' 
	  }
	*/
	var model = req.body;
	 
	 
	 //Sentimental
	 model.sentimentScore = analyze(model.area).score;
	 
	 console.log("model:");
	console.log(model);
	
	// Renders EJS file
	res.render('twitterResults.ejs', model);
	res.end();
});

app.listen(3000);