import dotenv from 'dotenv'
dotenv.config()

export default {
  port: process.env.PORT,
  frontendURL: process.env.FRONTEND_URL,
  databaseURL: process.env.DATABASE_URI,
  secretToken: process.env.TOKEN_SECRET,
  environment: process.env.NODE_ENV,
  api: {
    prefix: '/api',
  },
}
