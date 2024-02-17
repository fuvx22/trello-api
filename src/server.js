/* eslint-disable no-console */
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from 'express'
import cors from 'cors'
import { corsOptions } from '~/config/cors'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, GET_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware'

const START_SERVER = () => {

  const app = express()

  app.use(cors(corsOptions))

  // enable req.body json data
  app.use(express.json())

  // use APIs v1
  app.use('/v1', APIs_V1)

  // MiddleWare xử lý lỗi tập trung
  app.use(errorHandlingMiddleware)

  if (env.BUILD_MODE === 'production') {
    // môi trường production ( đang support cho render.com)
    app.listen(process.env.PORT, () => {
      console.log(`3. Production Hello ${env.AUTHOR}, I am running at port ${ process.env.PORT }`)
    })
  }
  else {
    // môi trường local dev
    app.listen(env.LOCAL_DEV_APP_PORT, env.LOCAL_DEV_APP_HOST, () => {
      console.log(`3. Local DEV Hello ${env.AUTHOR}, I am running at host ${ env.LOCAL_DEV_APP_HOST }:${ env.LOCAL_DEV_APP_PORT }/`)
    })
  }

  exitHook(() => {
    console.log('4. Disconnecting from MongoDB Cloud Atlas')
    CLOSE_DB()
    console.log('5. Disconnected from MongoDB Cloud Atlas')
  })
}

(async () => {
  try {
    console.log('1. Connecting to MongoDB Cloud Atlas')
    await CONNECT_DB()
    console.log('2. Connected to MongoDB Cloud Atlas')

    START_SERVER()
  }
  catch (error) {
    console.error(error)
    process.exit(0)
  }
})()

// CONNECT_DB()
//   .then(() => console.log('Connect to MongoDB Cloud Atlas!'))
//   .then(() => START_SERVER())
//   .catch(error => {
//     console.error(error)
//     process.exit(0)
//   })