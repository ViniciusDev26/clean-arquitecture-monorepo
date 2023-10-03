import { type Hasher } from '../../contracts/cryptograph/hasher'
import { type SaveAccount } from '../../contracts/repositories/save-account'
import { Account } from '../entities/account'

export interface CreateAccountUseCaseParams {
  email: string
  password: string
}

export class CreateAccountUseCase {
  constructor (
    private readonly hasher: Hasher,
    private readonly saveAccount: SaveAccount
  ) {}

  async execute (params: CreateAccountUseCaseParams): Promise<void> {
    const passwordHashed = await this.hasher.hash(params.password)

    const account = new Account({
      ...params,
      password: passwordHashed
    })

    await this.saveAccount.save(account)
  }
}
