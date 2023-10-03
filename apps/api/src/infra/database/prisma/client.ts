import { PrismaClient } from '@prisma/client'
export class Client extends PrismaClient {
  private static _instance?: Client
  private constructor () {
    super({
      log: ['info', 'error']
    })
  }

  async $connect (): Promise<void> {
    await super.$connect()
  }

  async $disconnect (): Promise<void> {
    await super.$disconnect()
  }

  static getInstance (): Client {
    if (!Client._instance) {
      console.log('Creating new instance of PrismaClient')

      Client._instance = new Client()
    }

    return Client._instance
  }
}
