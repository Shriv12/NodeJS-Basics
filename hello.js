console.log('hello js');
const hello = (sname) => {
    console.log(`hello ${sname}`);
    
}

hello('shri')

// console.log(window); // ReferenceError

console.log(global) // returns object

// setTimeout(() => {
//     console.log('this is a settimeout fn');
    
// }, 2000)

// const interfn = setInterval(() => {
//     console.log('this is a interval fn');
    
// }, 1000)

// clearInterval(interfn)

console.log('directory name', __dirname); // D:\NodeJS - Backend
console.log('file name', __filename); // D:\NodeJS - Backend\hello.js


names = ['shri', 'varshan', 'k']