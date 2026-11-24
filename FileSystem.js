// fs is the default module

const fs = require("fs");
// console.log(fs);

// mkdir - make directory
// it is async fn
// fs.existsSync - to check whether the folder/ file already exists

// syntax --> fs.mkdir(path, callback)
// callback is executed after the directory is created
// if (!fs.existsSync("./docs")) {
//   fs.mkdir("./docs", (err) => {
//     if (err) {
//       // console.log(err);
//       console.log(err.message);
//     } else console.log("Folder created successfully");
//   });
// }

// write file
// syntax --> fs.writeFile(path, text to be written, callback)
// fs.writeFile('./docs/Filesystem.txt', 'Hi hi hi', (err) => {
//     if(err) console.log(err.message);
//     else console.log('File created successfully');
// })

// read file
// syntax --> fs.readFile(path, callback)
// if (fs.existsSync("./docs/Filesystem.txt")) {
//   fs.readFile("./docs/filesystem.txt", (err, data) => {
//     if (err) console.log(err.message);
//     else console.log(data.toString());
//   });
// }

// delete file
// fs.unlink(path, callback)
// if(fs.existsSync('./docs/filesystem.txt')){
//     fs.unlink('./docs/filesystem.txt', (err) => {
//         if(err) console.log(err.message);
//         else console.log('File deleted successfully');
//     })
// }

// delete folder - this deletes folder only if it is empty
// fs.rmdir(path, callback)
// if(fs.existsSync('./docs')){
//     fs.rmdir('./docs', (err) => {
//     if(err) console.log(err.message);
//     else console.log('Folder deleted successfully');
// })
// }
