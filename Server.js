// nodemon ==> nodemon is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.
// npm install --save-dev nodemon
// nodemon filename 

const http = require('http')
const fs = require('fs')

// creating server
const server = http.createServer((req, res) => {
    // console.log("Request made");
    // console.log(req.url); // url in browser
    // console.log(req.method); // GET or POST or PUT

    // send response as plain text
    // order of sending [res.setHeader(), res.write(), res.end()]
    // res.setHeader('Content-Type', 'text/plain')
    // res.write('This is NodeJs learning')
    // res.end()

    // send response as html
    // res.setHeader('Content-Type', 'text/html')
    // res.write('<h1>This is NodeJS learning</h1>')
    // res.end()

    // send response as html file
    res.setHeader('Content-Type', 'text/html')
    // fs.readFile('./docs/index.html', (err, data) => {
    //     if(err){
    //         console.log(err.message);
    //         res.end()
    //     } 
    //     else{
    //         res.write(data)
    //         res.end()
    //     }
    // })

    let path = './docs/'
    if(req.url === '/'){
        path += 'index.html'
        res.statusCode = 200
    }
    // redirecting to new url
    else if(req.url === '/home'){
        res.statusCode = 301 // this status code is for redirection
        res.setHeader('Location', '/')
        res.end()
    }
    else if(req.url === '/aboutpage'){
        path += 'about.html'
        res.statusCode = 200
    }
    else{
        path += 'notfound.html'
        res.statusCode = 404
    }

    fs.readFile(path, (err, data) => {
        if(err){
            console.log(err.message);
            res.end()
        }
        else{
            res.write(data)
            res.end()
        }
    })
})


// listening to the server
server.listen(3000, 'localhost', () => {
    console.log('Server is running');  
})