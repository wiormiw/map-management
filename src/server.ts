import App from './app'
import fastifyMultipart from 'fastify-multipart'
import './helper/fastify.definition.handler'
import  { FastifyMultipartOptions } from './models/options/fastify-multipart.option'

import MapRoutes from './routes/map.route'

const app = new App({
  routes: [
    MapRoutes,
  ],
  plugins: [
    { plugin: fastifyMultipart, option: FastifyMultipartOptions },
  ],
})

app.listen()
