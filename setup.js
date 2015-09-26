var db = require('./database');

var seed = 1;
function random() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

Array.prototype.pick = function () {
  return this[Math.floor(this.length * random())];
};

var names = ['Kristine Lindsey', 'Allen Maxwell', 'Yolanda Olson', 'Faith Osborne', 'Oliver Hicks', 'Emma Oliver', 'Antonio Schmidt', 'Steven Brady', 'Lois Bell', 'Emmett Fletcher', 'Donnie Shaw', 'Patrick Robbins', 'Rudolph Waters', 'Beatrice Tyler', 'Pat Barber', 'Gwendolyn Foster', 'Ruby Moran', 'Alvin Jones', 'Joshua George', 'Doyle Keller', 'Della Dean', 'Essie Klein', 'Dana Barrett', 'Julia Sparks', 'Linda Hansen', 'Jim Roberson', 'Becky Johnston', 'Lucia Huff', 'Mabel Torres', 'Jody Flowers', 'Rafael Aguilar', 'Jaime Meyer', 'Duane Houston', 'Lana Yates', 'Lillie Mccormick', 'Darrin Steele', 'Henrietta Duncan', 'Janis Horton', 'Lynda Casey', 'Drew Cox', 'Karen Stevenson', 'Ruth Hampton', 'Clay Lloyd', 'Alberto Parker', 'Erick Mcgee', 'Guadalupe Young', 'Daisy Holland', 'Gwen Copeland', 'Philip Coleman', 'Johnny Wright', 'Cathy Nichols', 'Candace Jensen', 'Wilfred Fuller', 'Joy Salazar', 'Kayla Perez', 'Darnell Ford', 'Alejandro Smith', 'Randolph Rogers', 'Erma Barker', 'Margarita Dixon', 'Sabrina Cortez', 'Frances Strickland', 'Ricardo Brewer', 'Don Williams', 'Kari Vaughn', 'Traci Ross', 'Terrance Gutierrez', 'Miguel Hodges', 'Kara Bowman', 'Percy Sullivan', 'Leticia Clark', 'Vernon Crawford', 'Jon Adams', 'Kevin Mullins', 'Shelia Graham', 'Willis Fisher', 'Alberta Cunningham', 'Christian Doyle', 'Franklin Bradley', 'Kristen Martinez', 'Clifton Baldwin', 'Anita Colon', 'Terrence Flores', 'Katie Holt', 'Regina Cole', 'Martha Rodgers', 'Tyrone Delgado', 'Terri Pearson', 'Agnes Wood', 'Angelina Powers', 'Bertha Saunders', 'Darren Hale', 'Woodrow Taylor', 'Jeffrey Chandler', 'Tony Pierce', 'Leslie Mcguire', 'Ethel Owen', 'Cameron Rhodes', 'Amos Patton', 'Pete Hughes'];
var genders = ['Male', 'Female', 'Other'];
var workoutTimes = ['Now', 'In fifteen minutes', 'In half an hour', 'In an hour', 'In a couple of hours'];
var experiences = ['Beginner', 'Intermediate', 'Expert'];
var partnerGenders = ['Male', 'Female', 'Other', 'Any'];
var workoutTypes = ['Running', 'Lifting', 'Bicycling'];
var pictures = [
  'https://www.randomlists.com/img/animals/tapir.jpg',
  'https://www.randomlists.com/img/animals/snake.jpg',
  'https://www.randomlists.com/img/animals/cat.jpg',
  'https://www.randomlists.com/img/animals/dog.jpg',
  'https://www.randomlists.com/img/animals/whale.jpg',
];

function generateUser() {
  var user = {};
  user.name = names.pick();
  user.id = user.name.toLowerCase().replace(' ', '');
  user.age = 18 + Math.floor(4 * random());
  user.gender = genders.pick();
  user.searchTime = Date.now();
  user.experience = experiences.pick();
  user.workoutType = workoutTypes.pick();
  user.partnerGender = partnerGenders.pick();
  user.workoutTime = workoutTimes.pick();
  user.active = random() > 0.4;
  user.picture = pictures.pick();
  return user;
}

var users = [
  {
    name: 'Zach Snow',
    id: 'zsnow',
    age: 18,
    gender: 'Male',
    phone: '12083186553',
    picture: '/images/zach.jpg'
  }, {
    name: 'Steven Palmer',
    id: 'stp',
    age: 18,
    picture: '/images/straps.png',
    phone: '17205797276',
    gender: 'Male',
    partnerGender: 'Male',
    experience: 'Intermediate',
    workoutType: 'Running',
    workoutTime: 'Any'
  }, {
    name: 'Nicolas Cage',
    id: 'ncage',
    age: 51,
    active: true,
    picture: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Nicolas_Cage_2011_CC.jpg',
    gender: 'Male',
    partnerGender: 'Any',
    experience: 'Intermediate',
    workoutType: 'Any',
    workoutTime: 'Any'
  }
];

for (var i = 0; i < 30; i++) {
  users.push(generateUser());
}

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
