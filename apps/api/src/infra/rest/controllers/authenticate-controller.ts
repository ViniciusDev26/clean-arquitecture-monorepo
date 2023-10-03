import { type FastifyReply } from 'fastify'
import { type AuthenticateUseCase } from '../../../domain/accounts/useCase/authenticate-useCase'

export class AuthenticateController {
  constructor (
    private readonly authenticateUseCase: AuthenticateUseCase
  ) {}

  async handle (request: any, response: FastifyReply): Promise<any> {
    const { email, password } = request.body

    const { validUntil, token } = await this.authenticateUseCase.execute({
      email,
      password
    })

    return await response.status(200).send({ accessToken: token, validUntil })
  }
}
