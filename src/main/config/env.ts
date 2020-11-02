export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/clean-node-api',
  applicationPort: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'adasdasdasd',
  salt: process.env.SALT || 12
}
