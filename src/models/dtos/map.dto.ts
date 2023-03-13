import { FastifyRequest } from 'fastify';
import { MulterFile } from 'multer';

interface uploadDTO extends FastifyRequest {
  file: MulterFile;
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

export { uploadDTO, createDTO, updateDTO, deleteDTO, whitelistUpdateFieldDTO }