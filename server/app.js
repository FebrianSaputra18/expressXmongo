require('./config/mongoose')
const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')
// const bodyParser = require('body-parser')
// const multer = require('multer')

//router
const Routerv1 = require('./app/productv1/routes')
const Routerv2 = require('./app/productv2/routes')

const logger = require('morgan')

// app.use(multer().array());

app.use(logger('dev'))
app.use(cors())
// app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

//route
app.use('/api/v1/', Routerv1)
app.use('/api/v2/', Routerv2)

app.use((req, res, next) => {
    // Add more products here if needed
    res.status(404);
    res.send({
        status: 'failed',
        message: 'Resource' + req.originalUrl + 'not found'
    })
})

app.listen(3000, () => {
    console.log('Server listening on : http://localhost:3000');
})
