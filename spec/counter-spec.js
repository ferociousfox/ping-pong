var Calculator = require('./../js/pingpong.js').calculatorModule;

describe('Calculator', function() {

  it('should test whether number count starts at 1 to user input number', function(){
    var cal = new Calculator();
    expect(cal.pingPong(3)).toEqual("1, 2, 3");
  });

});
