// front end

var Calculator = require('./../js/pingpong.js').calculatorModule;

$(function() {
  $('#ping-pong-form').submit(function(event) {
    event.preventDefault();
    //user input
    var goal = $('#goal').val();
    //new user object
    var simpleCalculator = new Calculator("hot pink");
    //new user output
    var output = simpleCalculator.pingPong(goal);
    output.forEach(function(element) {
      $('#solution').append("<li>" + element + "</li>");
    });
  });
});

$(function(){
  $('#signup').submit(function(event){
    event.preventDefault();
    var email = $('#email').val();
    $('#signup').hide();
    $('#solution').prepend('<p>Thank you, ' + email + ' has been added to our list!</p>');
  });
});

$(function(){
  $('#time').text(moment());
});
