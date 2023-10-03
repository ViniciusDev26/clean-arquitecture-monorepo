import { sign } from 'jsonwebtoken'
import { type JwtSigner, type JwtSignerResponse, type Payload } from '../../../domain/contracts/authentication/SignerJwt'

export class JsonwebtokenAdapter implements JwtSigner {
  async sign (payload: Payload): Promise<JwtSignerResponse> {
    const token = sign(
      payload,
      Buffer.from(process.env.PRIVATE_SECRET_KEY as string, 'base64'),
      {
        algorithm: 'RS256',
        expiresIn: '1d'
      }
    )

    return {
      token,
      validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000)
    }
  }
}
