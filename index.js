const app = require('./app')
const http = require('http')
const PORT = process.env.PORT || 3001

const server = http.createServer(app)
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
