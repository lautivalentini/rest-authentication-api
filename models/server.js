const express = require('express')
const cors = require('cors')

const { dbConnection } = require('../database/config')

class Server {

  constructor() {
    this.app = express()
    this.port = process.env.PORT
    this.paths = {
      auth: '/api/auth',
      user: '/api/user',
      categories: '/api/categories',
      products: '/api/products',
      search: '/api/search'
    }
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
    this.app.use(this.paths.user, require('../routes/user'))
    this.app.use(this.paths.auth, require('../routes/auth'))
    this.app.use(this.paths.categories, require('../routes/categories'))
    this.app.use(this.paths.products, require('../routes/products'))
    this.app.use(this.paths.search, require('../routes/search'))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server on at port', this.port)
    })
  }

}

module.exports = Server;