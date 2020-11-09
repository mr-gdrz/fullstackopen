const http = require('http')
const  {PORT}  = require('./utils/config')
const {info} = require('./utils/logger')
const app = require('./app')

const server = http.createServer(app)

server.listen(PORT, () =>{
    info(`server is running on port ${PORT}`)
}) 
