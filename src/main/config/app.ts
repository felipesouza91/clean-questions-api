import express from 'express'
import setupMiddlewares from './middlewares'
import setupRoutes from './routes'
import setupSwagger from './config-swagger'
import staticFile from './static-files'
const app = express()
staticFile(app)
setupSwagger(app)
setupMiddlewares(app)
setupRoutes(app)
export default app
