var express = require('express');
var router = express.Router();
var log4js = require('log4js');
var fs = require('fs');

if (!fs.existsSync('logs')) {
  fs.mkdirSync('logs');
}

log4js.configure({
  appenders:[
    {type: 'console'},
    {
      type: 'file',
      filename: 'logs/AppFeather.log',
      maxLogSize: 1024,
      backups:3,
      category: "feather"
    }
  ]
});

feather_log = log4js.getLogger("feather")

/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log(req.query.data);
  feather_log.trace(req.query.data);
  res.render('index', { title: 'AppFeather' });
});

router.get('/')

module.exports = router;
