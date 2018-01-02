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
      return "1, 2, 3";
    } else if (i % 5 === 0) {
      output.push("pong");
    } else {
      output.push(i);
    }
  }
  return output;
}

// Node Export
exports.calculatorModule = Calculator;
