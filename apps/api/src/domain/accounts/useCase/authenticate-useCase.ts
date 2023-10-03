import { type JwtSignerResponse, type JwtSigner } from '../../contracts/authentication/SignerJwt'
import { type Comparer } from '../../contracts/cryptograph/comparer'
import { type FindAccountByEmailRepository } from '../../contracts/repositories/find-account-by-email'

export interface AuthenticateUseCaseParams {
  email: string
  password: string
}

export class AuthenticateUseCase {
  constructor (
    private readonly findAccountByEmailRepository: FindAccountByEmailRepository,
    private readonly comparer: Comparer,
    private readonly jwtSigner: JwtSigner
  ) {}

  async execute (params: AuthenticateUseCaseParams): Promise<JwtSignerResponse> {
    const account = await this.findAccountByEmailRepository.findByEmail(params.email)
    if (!account) {
      throw new Error('Account not found')
    }

    const isValidPassword = await this.comparer.compare(params.password, account.password)
    if (!isValidPassword) {
      throw new Error('Account not found')
    }

    const token = await this.jwtSigner.sign({ sub: account.id })
    return token
  }
}
