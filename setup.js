var db = require('./database');

var users = [
  {
    name: 'Zach Snow',
    id: 'zsnow',
    age: 18,
    gender: 'Male'
  }, {
    name: 'Steven Palmer',
    id: 'stp',
    age: 18,
    gender: 'Male'
  }, {
    name: 'Allice',
    id: 'allicetest',
    age: 19,
    gender: 'Female'
  }, {
    name: 'Bobby',
    id: 'bobbytest',
    age: 19,
    gender: 'Male'
  }
];

db.once('open', function (callback) {
  console.log("Creating all users");
  for (var i = 0; i < users.length; i++) {
    var isLast = i === users.length - 1;
    var user = new db.schemas.User(users[i]);
    user.save(function (err, user) {
      if (err) {
        console.error(err);
      }
      if (isLast) {
        setTimeout(function () {
          db.close();
        }, 1000);
      }
    });
  }
});
