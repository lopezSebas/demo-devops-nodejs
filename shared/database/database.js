import * as dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

dotenv.config()

// Decodificar valores codificados en Base64
const databaseName = atob(process.env.DATABASE_NAME);
const databaseUser = atob(process.env.DATABASE_USER);
const databasePassword = atob(process.env.DATABASE_PASSWORD);

const sequelize = new Sequelize('test-db', databaseUser, databasePassword, {
  dialect: 'sqlite',
  host: databaseName
})

export default sequelize
