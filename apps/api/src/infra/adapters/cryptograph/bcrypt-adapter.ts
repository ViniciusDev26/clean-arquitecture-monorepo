import bcrypt from 'bcryptjs'
import { type Comparer } from '../../../domain/contracts/cryptograph/comparer'
import { type Hasher } from '../../../domain/contracts/cryptograph/hasher'

export class BcryptAdapter implements Hasher, Comparer {
  async hash (value: string): Promise<string> {
    const salt = await bcrypt.genSalt(12)
    return await bcrypt.hash(value, salt)
  }

  async compare (value: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(value, hash)
  }
}
