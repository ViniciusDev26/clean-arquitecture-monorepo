import 'dotenv/config'
import { fastify } from 'fastify'
import { makeAuthenticateController } from './rest/factories/makeAuthenticateController'
async function bootstrap (): Promise<void> {
  const app = fastify({ logger: true })

  // const bcrypt = new BcryptAdapter();
  // const accountRepository = new PrismaAccountRepository(Client.getInstance());
  // const createService = new CreateAccountUseCase(bcrypt, accountRepository);
  // await createService.execute({
  //   email: "vinicius@gmail.com",
  //   password: "senha123"
  // })

  app.post('/auth', async (request, reply) => await makeAuthenticateController().handle(request, reply))

  await app.listen({
    port: 3000
  })
}
void bootstrap()
