function displayUser(user) {
  $('span#name').text(user.name);
  $('span#name').data('id', user.id);
  $('span#gender').text(user.gender);
  $('span#experience').text(user.experience);
  $('img#profile-image').prop('src', user.picture);
  $('span#workoutType').text(user.workoutType);
  $('span#workoutTime').text(user.workoutTime);
}

$(document).ready(function () {
  if(users.length) {
    displayUser(users[0]);
    $('button#reject').click(function () {
      users.shift();
      $.post('/ajax/reject/' + $('span#name').data('id'), function () {
        if(users.length) {
          displayUser(users[0]);
        }
        else {
          $('#user').fadeOut('fast');
          $('#waiting').fadeIn('fast');
        }
      });
    });
    $('button#accept').click(function () {
      users.shift();
      $.post('/ajax/accept/' + $('span#name').data('id'), function (data) {
        if(data['mutual'] === true) {
          //TODO: redirect to contact us page
        }
        else {
          if(users.length) {
            displayUser(users[0]);
          }
          else {
            $('#user').fadeOut('fast');
            $('#waiting').fadeIn('fast');
          }
        }
      });
    });
  }
});
