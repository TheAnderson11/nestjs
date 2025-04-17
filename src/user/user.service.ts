import { Injectable } from '@nestjs/common'
import { users } from '../moks/index'

@Injectable()
export class UserService {
  getUsers() {
    return users
  }
}
