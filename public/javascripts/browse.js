function displayUser(user) {
  $('span#name').text(user.name);
  $('span#name').data('id', user.id);
  $('span#gender').text(user.gender);
  $('span#experience').text(user.experience);
  $('img#profile-image').prop('src', user.picture);
  $('span#workoutType').text(user.workoutType);
  $('span#workoutTime').text(user.workoutTime);
}

function showNextUser() {
  if (users.length > 0) {
    displayUser(users[0]);
  }
  else {
    $('#user').fadeOut('fast');
    $('#waiting').fadeIn('fast');
  }
}

$(document).ready(function () {
  showNextUser();

  $('button#reject').click(function () {
    users.shift();
    $.post('/ajax/reject/' + $('span#name').data('id'), function () {
      showNextUser();
    });
  });

  $('button#skip').click(function () {
    users.shift();
    showNextUser();
  });

  $('button#accept').click(function () {
    users.shift();
    $.post('/ajax/accept/' + $('span#name').data('id'), function (data) {
      if (data['mutual'] === true) {
        //TODO: redirect to contact us page
      }
      else {
        showNextUser();
      }
    });
  });
});
