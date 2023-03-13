import App from './app'
import multer from 'fastify-multer'
import fastifyCors from '@fastify/cors'

import MapRoutes from './routes/map.route'

const app = new App({
  routes: [
    MapRoutes,
  ],
  plugins: [
    multer.contentParser,
    fastifyCors,
  ],
})

app.listen()
