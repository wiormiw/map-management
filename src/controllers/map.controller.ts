import { MapInterface } from '../models/interfaces/data/map.interface'
import MapRepository from '../repositories/map.repository'

import {
  createDTO,
  updateDTO,
  deleteDTO,
} from '../models/dtos/map.dto'
import { allowedExtensions, allowedMimetypes } from 'src/helper/file.validate.handler'
import { FastifyReply, FastifyRequest } from 'fastify'

async function findAllMap(): Promise<MapInterface[]> {
  const mapRepository = MapRepository.getInstance()
  return await mapRepository.findAllMap()
}

async function uploadMap(file: Buffer): Promise<Object> {
  try {
    
  } catch (err) {
    console.log(err)
    throw new Error(`400 : Upload File is not successfully`)
  }
}

async function createMap(reqCreate: createDTO): Promise<string> {
  const mapRepository = MapRepository.getInstance()
  try {
    await mapRepository.createMap(reqCreate)
    return `200 : Save data is successfully`
  } catch (err) {
    console.log(err)
    throw new Error(`400 : Save data is not successfully`)
  }
}

async function updateMap(reqUpdate: updateDTO): Promise<string> {
  const mapRepository = MapRepository.getInstance()
  const  { _id, ...dataUpdate } = reqUpdate
  let updateResult: number
  try {
    updateResult = await mapRepository.updateMap(_id, dataUpdate)
  } catch (error) {
    throw new Error(`400 : Update data is not successfully`)
  }
  if (updateResult) {
    return `200 : Update data is successfully`
  } else {
    throw new Error(`400 : Page not found in database`)
  }
}

async function deleteMap(reqDelete: deleteDTO): Promise<string> {
  const mapRepository = MapRepository.getInstance()
  const { _id } = reqDelete
  const deleteResult: number = await mapRepository.deleteMap(_id)
  if (deleteResult) {
    return `200 : Delete data is successfully`
  } else {
    throw new Error(`400 : Delete data is not successfully, don't have data in Database`)
  }
}

export default {
  findAllMap,
  uploadMap,
  createMap,
  updateMap,
  deleteMap
}
