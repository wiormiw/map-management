import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from 'fastify'
import MapController from '../controllers/map.controller'
import responseHandler from '../helper/response.handler'
import { createDTO, updateDTO, deleteDTO, uploadDTO } from '../models/dtos/map.dto'
import * as Validator from '../helper/validate.handler'
import path from 'path'

class MapRoutes {
  public prefix_route = '/maps'
  
  async routes(fastify: FastifyInstance, options: FastifyPluginOptions, done: any) {

    fastify.post('/upload', { schema: uploadDTO, attachValidation: true }, async (request: FastifyRequest, reply: FastifyReply) => {
      responseHandler(async () => {
        const file = await request.file()
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
