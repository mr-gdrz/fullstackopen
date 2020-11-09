const {MONGODB_URI} = require("./utils/config");
const express = require('express')
const app = express()
const cors = require('cors')
const { info, error } = require("./utils/logger");
const {connect} = require("mongoose");
const  blogRouter  = require('./controllers/blog')


info(`connecting to db ${MONGODB_URI}`)

connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
        info('connected to db')
    }).catch(_error => error('connection failed due to ', _error.message))


app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)

module.exports = app

