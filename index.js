import sequelize from './shared/database/database.js'
import { usersRouter } from "./users/router.js"
import express from 'express'
import https from 'https'
import fs from 'fs'

const app = express()
const PORT = 8000

sequelize.sync({ force: true }).then(() => console.log('db is ready'))

app.use(express.json())
app.use('/api/users', usersRouter)

let server;

if (process.env.NODE_ENV === 'production') {
  const options = {
    key: fs.readFileSync('/etc/tls/tls.key'),
    cert: fs.readFileSync('/etc/tls/tls.crt')
  };

  server = https.createServer(options, app).listen(PORT, () => {
    console.log('Server running on port ${PORT} with HTTPS');
  });
} else {
  // Para desarrollo o pruebas, usa HTTP
  server = app.listen(PORT, () => {
    console.log('Server running on port ${PORT}');
  });
}

export { app, server }