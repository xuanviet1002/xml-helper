var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  var userIndex = countUsers();
  res.render('index', { title: 'Xml Helper', entered: userIndex });
});

var countUsers = function(){
  var logFile = "userlogs/log";

  var userIndex = fs.readFileSync(logFile, 'utf8');

  fs.open(logFile, 'r', (err, fd) => {
    if (!err)
      {
        userIndex = parseInt(userIndex.toString()) + 1;
        fs.writeFile(logFile, userIndex, (err) => { });
      }
  });
  return userIndex.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

module.exports = router;
