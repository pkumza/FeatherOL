var express = require('express');
var router = express.Router();
var log4js = require('log4js');
var fs = require('fs');

if (!fs.existsSync('public')) {
  fs.mkdirSync('public');
}
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
    },
    {
      type: 'file',
      filename: 'public/logs/post.log',
      maxLogSize: 102400,
      backups:10000,
      category: "post"
    }
  ]
});

feather_log = log4js.getLogger("feather")
// Deprecated post_log
post_log = log4js.getLogger("post")


router.post('/',function(req,res){
  console.log(req.method);
  var uploading_data=req.body.data;
  feather_log.trace(uploading_data);
  res.render('index', { title: 'AppFeather 应用の翼' });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log(req.query.data);
  console.log(req.method);
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
