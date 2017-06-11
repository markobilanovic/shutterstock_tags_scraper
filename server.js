var express = require('express');
var cors = require('cors');
var request = require('request');
var cheerio = require('cheerio');

var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/website'));


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});




var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
})); // support encoded bodies

app.use(cors());




app.get('/', function(request, response) {
  response.sendFile('website/index.html', {root: __dirname });
});


app.post('/scrape', analyzeThis);
function analyzeThis(req, resp) {
  var url = req.body.text;

  request(url, function(error, responce, html) {
    var retVal = {
      foundResults : false,
      values : null
    };
    var data;
    if(!error){
      var $ = cheerio.load(html);
      data = $('.col-xs-12.text-left.js-product-keywords-holder').text();
      if(data !== ""){
        retVal.foundResults = true;
        data = data.split(/\W+/);
        data.splice(0, 1);
        data.splice(-1);
        retVal.values = data;
      }
    }
    else {
      console.log(error);
    }
    resp.send(retVal);
  });
}
