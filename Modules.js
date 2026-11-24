// modules are building blocks of nodejs app, to organise code into logics and components

// require is used to import
const {imports} = require('./data') // runs the complete file

// console.log(imports);
// console.log(imports.name); // for individual imports
// console.log(imports.age);


// const {name, age} = require('./data') // runs the complete file

// console.log(name, age); // can destructure based on the needs


// operating system module
const os = require('os')
// console.log(os);
console.log(os.homedir());
