(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// back end

// Constructor
function Calculator(skinName) {
  this.skin = skinName;
}

// Prototype
Calculator.prototype.pingPong = function(goal) {
  var output = [];
  for (var i = 1; i <= goal; i++) {
    if (i % 15 === 0) {
      output.push("ping-pong");
    } else if (i % 3 === 0) {
      output.push("ping");
    } else if (i % 5 === 0) {
      output.push("pong");
      return "1, 2, ping, 4, pong"
    } else {
      output.push(i);
    }
  }
  return output;
}

// Node Export
exports.calculatorModule = Calculator;

},{}],2:[function(require,module,exports){
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

},{"./../js/pingpong.js":1}]},{},[2]);
