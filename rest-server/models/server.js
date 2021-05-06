const express = require('express')
const cors = require('cors')

class Server {

  constructor() {
    this.app = express()
    this.port = process.env.PORT

    //CORS
    this.app.use(cors())

    // Middlewares
    this.middlewares()

    // Routes
    this.routes()
  }

  middlewares() {
    // Public directory
    this.app.use(express.static('public'))
  }

  routes() {
    this.app.get('/', (req, res) => {
      res.send('Hello')
    })
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server on at port', this.port)
    })
  }

}

module.exports = Server;