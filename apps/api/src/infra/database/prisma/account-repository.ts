import { Account } from '../../../domain/accounts/entities/account'
import { type FindAccountByEmailRepository } from '../../../domain/contracts/repositories/find-account-by-email'
import { type SaveAccount } from '../../../domain/contracts/repositories/save-account'
import { type Client } from './client'

export class PrismaAccountRepository implements FindAccountByEmailRepository, SaveAccount {
  constructor (
    private readonly client: Client
  ) {}

  async findByEmail (email: string): Promise<Account | null> {
    const accountRow = await this.client.account.findUnique({
      where: {
        email
      }
    })

    if (!accountRow) return null

    return new Account({
      email: accountRow.email,
      password: accountRow.password
    }, accountRow.id)
  }

  async save (account: Account): Promise<void> {
    await this.client.account.upsert({
      where: {
        id: account.id
      },
      create: {
        id: account.id,
        email: account.email,
        password: account.password
      },
      update: {
        email: account.email,
        password: account.password
      }
    })
  }
}
