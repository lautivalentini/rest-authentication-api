const express = require('express')
const cors = require('cors')

const { dbConnection } = require('../database/config')

class Server {

  constructor() {
    this.app = express()
    this.port = process.env.PORT
    this.usersPath = '/api/user'
    this.auth = '/api/auth'

    //Connection to database
    this.connectDB()

    // Middlewares
    this.middlewares()

    // Routes
    this.routes()
  }

  async connectDB() {
    await dbConnection()
  }

  middlewares() {
    //CORS
    this.app.use(cors())

    // body parser
    this.app.use(express.json())

    // Public directory
    this.app.use(express.static('public'))
  }

  routes() {
    this.app.use(this.usersPath, require('../routes/user'))
    this.app.use(this.auth, require('../routes/auth'))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server on at port', this.port)
    })
  }

}

module.exports = Server;