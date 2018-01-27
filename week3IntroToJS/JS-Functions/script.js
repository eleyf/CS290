/*
**  eleyf
**  1/21/18
**  cs290 w2018
**  Activity JS Functions
*/


// Write a JavaScript program that declares a function but calls it before it is declared
noVariable();

function noVariable() {
    console.log("This is the noVariable function");
}


// Also write a function which is assigned to a variable. Call it before it is assigned and prove that this does not work.
varFunction();

var varFunction = function () {
    console.log("This is the varFunction function");
}
