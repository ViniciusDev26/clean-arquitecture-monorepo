import { randomUUID } from 'node:crypto'

export interface AccountProps {
  email: string
  password: string
}

export class Account {
  private readonly _id: string
  private readonly props: AccountProps

  constructor (props: AccountProps, id?: string) {
    this._id = id ?? randomUUID()
    this.props = props
  }

  get id (): string {
    return this._id
  }

  get email (): string {
    return this.props.email
  }

  get password (): string {
    return this.props.password
  }
}
