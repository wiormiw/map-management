import { Sequelize } from 'sequelize-typescript'
import { Map } from '../models/schemas/map.schema'

class PostgresAdapter {
  private _database: Sequelize

  constructor(username: string, password: string, host: string, post: number, dbName: string) {
    // PostgreSQL Local 
    const sequelize = new Sequelize({
      dialect: 'postgres',
      host: host,
      port: post,
      username: username,
      password: password,
      database: dbName,
      define: {
        timestamps: true,
        underscored: true,
      },
      models: [Map],
    })

    this._database = sequelize
    this.setup()
  }

  private async setup(): Promise<void> {
    try {
      await this._database.authenticate()
      this.connected()
      this.installExtensions()
      this.syncModels()
    } catch (error) {
      this.error(error)
    }
  }


  private async syncModels(): Promise<void> {
    try {
      await this._database.sync({ force: true });
      console.log("All models were synchronized successfully.");
    } catch (error) {
      this.error(error)
      throw new Error("Failed to synchronize models");
    }
  }

  private async installExtensions(): Promise<void> {
    try {
      await this._database.query('CREATE EXTENSION IF NOT EXISTS postgis;')
      await this._database.query('CREATE EXTENSION IF NOT EXISTS postgis_topology;')  
    } catch (error) {
      this.error(error)
      throw new Error("Failed to install an extension");
    }
  }

  public getModel(name: string): any {
    return this._database.model(name);
  }

  private connected() {
    console.log('Postgres With Sequelize has connected 🎉')
  }

  private error(error: Error) {
    console.log('**** error [db:postgres] : ', error)
    throw error
  }

}
export default PostgresAdapter