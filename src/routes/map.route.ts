import { FastifyInstance, FastifyPluginOptions, FastifyRequest } from 'fastify'
import MapController from '../controllers/map.controller'
import responseHandler from '../helper/response.handler'
import { createDTO, updateDTO, deleteDTO, uploadDTO } from '../models/dtos/map.dto'
import * as Validator from '../helper/validate.handler'
import multer from 'fastify-multer'

class MapRoutes {
  public prefix_route = '/maps'

  private storage = multer.diskStorage({
    destination: (_request, _file, cb) => {
      cb(null, './uploads')
    },
    filename: (_request, file, cb) => {
      cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`)
    }
  })

  private upload = multer({
    storage: this.storage,
    fileFilter: (_request, file, cb) => {
      if (file.mimetype === 'application/octet-stream' && (file.originalname.endsWith('.shp') || file.originalname.endsWith('.shx') || file.originalname.endsWith('.dbf') || file.originalname.endsWith('.prj'))) {
        cb(null, true);
      } else if (file.mimetype === 'application/vnd.geo+json') {
        cb(null, true);
      } else if (file.mimetype === 'image/tiff' && (file.originalname.endsWith('.tiff') || file.originalname.endsWith('.tif'))) {
        cb(null, true);
      } else if (file.mimetype === 'text/xml' && file.originalname.endsWith('.osm')) {
        cb(null, true);
      } else {
        cb(new Error('File type not supported'));
      }
    },
  })
  
  async routes(fastify: FastifyInstance, options: FastifyPluginOptions, done: any) {

    fastify.post('/upload', { preHandler: this.upload.single('map_file') }, async (request: uploadDTO, reply) => {
      responseHandler(async () => {
        const file = request.file
        const data = await MapController.uploadMap(file)
        return data
      }, reply)
      await reply
    })
    
    fastify.get(`/`, async (request, reply) => {
      responseHandler(async () => {
        const data = await MapController.findAllMap()
        return data
      }, reply)
      await reply
    })

    fastify.post(`/`, async (request, reply) => {
      responseHandler(async () => {
        const reqCreate: createDTO = request.body as createDTO
        const { map_name, sources } = reqCreate

        if (!Validator.validCheckInput(map_name, sources)) {
          throw new Error(`400 : Invalid input, Please input field map_name and sources`)
        }
        
        const data = await MapController.createMap(reqCreate)
        return data
      }, reply)
      await reply
    })

    fastify.put(`/`, async (request, reply) => {
      responseHandler(async () => {
        const reqUpdate: updateDTO = request.body as updateDTO
        const { _id, ...rawUpdate } = reqUpdate

        if (!Validator.validCheckID(_id)) {
          throw new Error(`400 : Invalid input, Please input field id`)
        }

        const errorFieldsUpdate = Validator.validUpdatedFields(rawUpdate)
        if (errorFieldsUpdate.length > 0) {
          throw new Error(`400 : Invalid Fields! ${errorFieldsUpdate.join(', ')}`)
        }

        const data = await MapController.updateMap(reqUpdate)
        return data
      }, reply)
      await reply
    })

    fastify.delete(`/`, async (request, reply) => {
      responseHandler(async () => {
        const data = await MapController.deleteMap(request.body as deleteDTO)
        return data
      }, reply)
      await reply
    })

    done()

  }

}

export default MapRoutes
