import { AuthenticateUseCase } from '../../../domain/accounts/useCase/authenticate-useCase'
import { JsonwebtokenAdapter } from '../../adapters/authentication/jsonwebtoken-adapter'
import { BcryptAdapter } from '../../adapters/cryptograph/bcrypt-adapter'
import { PrismaAccountRepository } from '../../database/prisma/account-repository'
import { Client } from '../../database/prisma/client'
import { AuthenticateController } from '../controllers/authenticate-controller'

export function makeAuthenticateController (): AuthenticateController {
  const client = Client.getInstance()
  const accountRepository = new PrismaAccountRepository(client)
  const bcryptAdapter = new BcryptAdapter()
  const jsonwebtokenAdapter = new JsonwebtokenAdapter()

  const authenticateUseCase = new AuthenticateUseCase(accountRepository, bcryptAdapter, jsonwebtokenAdapter)
  const controller = new AuthenticateController(authenticateUseCase)

  return controller
}
