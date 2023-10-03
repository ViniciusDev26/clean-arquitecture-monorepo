import { type Account } from '../../accounts/entities/account'

export interface SaveAccount {
  save: (account: Account) => Promise<void>
}
