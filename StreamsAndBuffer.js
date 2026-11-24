// A buffer is a fixed-size, raw memory allocation used to store chunks of binary data

// A stream is an abstract interface that allows reading or writing data continuously, piece by piece, as it arrives.

const fs = require('fs')

const readStream = fs. createReadStream('./docs/hugefile.txt', {encoding: 'utf8'})

const writeStream = fs.createWriteStream('./docs/copyHugeFile.txt')

// streams data in buffer
// readStream.on('data', (buffer) => {
//     // console.log('\nNew buffer \n');
//     // console.log(buffer);

//     // writing in new file
//     writeStream.write('\nNew buffer\n');
//     writeStream.write(buffer)
// })

// to exactly write in a new file [shorthand]
readStream.pipe(writeStream)