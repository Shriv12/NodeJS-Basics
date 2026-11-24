const names = ["shri", "varshan", "k"];
const ages = [23, 25, 6];

// console.log(names);

// module.exports = names // to export and get access in other files

// multiple exports
module.exports = {
  name: names,
  age: ages,
};

// you can also export without key
// module.exports = {
//   names,
//   ages,
// };


// Stream and buffer
