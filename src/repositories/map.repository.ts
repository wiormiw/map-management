import { Map } from '../models/schemas/map.schema'
import { MapInterface } from '../models/interfaces/data/map.interface'
import { createDTO, uploadDTO, whitelistUpdateFieldDTO } from '../models/dtos/map.dto'
import fs from 'fs'

class MapRepository {
  private static instance: MapRepository

  public static getInstance(): MapRepository {
    if (!MapRepository.instance) {
      MapRepository.instance = new MapRepository()
    }
    return MapRepository.instance
  }

  public async findAllMap(): Promise<MapInterface[]> {
    const result = await Map.findAll()
    return result as MapInterface[]
  }

  public async findAllMapInChannel(channel: { [key: string]: string }): Promise<MapInterface[]> {
    const result = await Map.findAll(channel)
    return result as MapInterface[]
  }

  public async findMapById(id: string): Promise<MapInterface | null> {
    const result: MapInterface = (await Map.findByPk(id))!
    return result
  }

  public async createMap(map: createDTO): Promise<string> {
    const result = await Map.create({ ...map })
    return result.id as string
  }

  public async updateMap(_id: string, dataUpdate: whitelistUpdateFieldDTO): Promise<number> {
    const updated_at: Date = new Date()
    if (!dataUpdate.updated_at) {
      dataUpdate.updated_at = updated_at
    }
    const result = await Map.update(
    { 
      ...dataUpdate
    }, 
    {
      where:
      {
        id: _id
      },
      returning: true
    })
    return result.values.length as number
  }

  public async deleteMap(_id: string): Promise<any> {
    const result = await Map.destroy({ 
      where: {
        id: _id
      }
    })
    return result
  }
}

export default MapRepository
