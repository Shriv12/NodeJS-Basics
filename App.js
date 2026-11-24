// ExpressJS
// Replicate the steps in server.js using expressJS

const express = require('express')
const morgan = require('morgan') // 3rd party middleware

const app = express()

app.listen(3000)

// Middleware
// Browser --> Request --> Server(Middleware) --> Response --> Browser
// syntax --> app.use((req, resm next) => {})

// app.use((req, res, next) => {
//     console.log('Req received');
//     console.log(req.host);
//     console.log(req.path);

//     // it is not mandatory for the middleware to send the response, so next() is needed to proceed with further code
//     next()
// })

app.use(morgan('dev')) // middleware logs basic info related to dev
// the o/p is: GET /about 304 2.023 ms

app.get('/', (req, res) => {
    // res.send('This is expressJS') // sending plain text
    // res.status(200).send('<h1>This is expressJS</h1>') // sending plain html along with statuscode
    res.sendFile('./docs/index.html', {root: __dirname}) // sendFile takes absolute path
})

app.get('/home', (req, res) => {
    res.sendFile('./docs/index.html', {root: __dirname})
})

app.get('/about', (req, res) => {
    res.sendFile('./docs/about.html', {root: __dirname})
})

app.get('/index', (req, res) => {
    res.redirect('/home')
})

// it has to put atlast since it runs without any condition
// it runs if the provided url is not found
app.use((req, res) => {
    res.status(404).sendFile('./docs/notFound.html', {root: __dirname})
})