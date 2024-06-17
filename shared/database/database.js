import * as dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

dotenv.config()

const isValidBase64String = (str) => {
  const base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
  return base64Regex.test(str);
}

const databaseName = isValidBase64String(process.env.DATABASE_NAME)
  ? atob(process.env.DATABASE_NAME)
  : null;

const databaseUser = isValidBase64String(process.env.DATABASE_USER)
  ? atob(process.env.DATABASE_USER)
  : null;

const databasePassword = isValidBase64String(process.env.DATABASE_PASSWORD)
  ? atob(process.env.DATABASE_PASSWORD)
  : null;

const sequelize = new Sequelize('test-db', databaseUser, databasePassword, {
  dialect: 'sqlite',
  host: databaseName
})

export default sequelize
