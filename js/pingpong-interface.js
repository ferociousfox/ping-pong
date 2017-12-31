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
