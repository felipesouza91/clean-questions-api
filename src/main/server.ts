
import 'module-alias/register'
import { MongoHelper } from '@src/infra/db/mongodb/helpers/MongoHelper'
import env from './config/env'
MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.applicationPort, () => {
      console.log(`Server is running on porta  ${env.applicationPort}`)
    })
  })
