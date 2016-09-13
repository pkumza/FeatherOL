var express = require('express');
var router = express.Router();
var log4js = require('log4js');
var fs = require('fs');

if (!fs.existsSync('public/logs')) {
  fs.mkdirSync('public/logs');
}

log4js.configure({
  appenders:[
    {type: 'console'},
    {
      type: 'file',
      filename: 'public/logs/AppFeather.log',
      maxLogSize: 102400,
      backups:10000,
      category: "feather"
    }
  ]
});

feather_log = log4js.getLogger("feather")

/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log(req.query.data);
  feather_log.trace(req.query.data);
  res.render('index', { title: 'AppFeather 应用の翼' });
});

router.get('/get_data', function(req, res, next){
  var usfs = fs.readdirSync("public/logs");
  var links = new Array();
  usfs.forEach(function(file){
    file = "/logs/" + file;
    links.push(file);
  });
  console.log(links);
  res.render('get_data', { title: 'Data Recorded.', data: links});
});

router.get('/')

module.exports = router;
