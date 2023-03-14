class FastifyMultipartOptions {
    addToBody: boolean
    sharedSchemaId: string
  
    constructor() {
      this.addToBody = true
      this.sharedSchemaId = '#file'
    }
}

export { FastifyMultipartOptions }