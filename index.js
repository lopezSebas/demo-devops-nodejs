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

const options = {
  key: fs.readFileSync('/etc/tls/tls.key'),
  cert: fs.readFileSync('/etc/tls/tls.crt')
};

const server = https.createServer(options, app);

const server = app.listen(PORT, () => {
    console.log('Server running on port PORT', PORT)
})

export { app, server }