export type Payload = {
  sub: string
} & Record<string, any>

export interface JwtSignerResponse {
  token: string
  validUntil: Date
}

export interface JwtSigner {
  sign: (payload: Payload) => Promise<JwtSignerResponse>
}
