import { type Account } from '../../accounts/entities/account'

export interface FindAccountByEmailRepository {
  findByEmail: (email: string) => Promise<Account | null>
}
