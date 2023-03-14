import { ReadStream } from "fs";

const uploadDTO = {
  body: {
    type: 'object',
    properties: {
      file: { type: 'object' }
    }
  }
}

interface filePart {
  file: () => Promise<ReadStream>;
  headers: Record<string, string>;
}


interface createDTO {
  id: string 
  map_name: string
  sources: string
}

interface updateDTO {
  _id: string
  map_name?: string 
  sources: string
  updated_at?: Date
}

interface deleteDTO {
  _id: string
}

interface whitelistUpdateFieldDTO {
  map_name?: string
  sources: string
  updated_at?: Date
}

export { uploadDTO, filePart, createDTO, updateDTO, deleteDTO, whitelistUpdateFieldDTO }