import config from '../config/config'
import { whitelistUpdateFieldDTO } from 'src/models/dtos/map.dto'
import { Whitelist } from '../models/interfaces/data/whitelist.interface'
import { whitelist } from '../models/whitelists/whitelist.models'

const validCheckInput = (map_name: string, sources: string): boolean | string => {
  return map_name !== null && sources !== null
}

const validCheckID = (id: string): boolean | string => {
  return id !== null
}

const isNotValidField = (whitelist: Whitelist, fieldList: string): boolean => {
  return !Object.keys(whitelist).includes(fieldList)
}

const validUpdatedFields = (data: whitelistUpdateFieldDTO): string[] => {
  const errorFieldsUpdate: string[] = Object.keys(data).filter((key) => isNotValidField(whitelist['map'], key))
  return errorFieldsUpdate
}

export { validCheckInput, validCheckID, isNotValidField, validUpdatedFields }