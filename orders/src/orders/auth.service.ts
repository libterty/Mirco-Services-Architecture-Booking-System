import * as jwt from 'jsonwebtoken';
import {
  HttpService,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import axios from 'axios';

export class AuthService {
  public async validate(token): Promise<object> {
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const response = await this.requestUesr(token);
      if (response.status === 200) {
        return response.data;
      }
      throw new UnauthorizedException();
    } catch (error) {
      throw new UnauthorizedException(`Authorize Timeout`);
    }
  }

  private async requestUesr(token: string): Promise<any> {
    return axios
      .get('http://localhost:4546/auth/user', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
      .then(res => res)
      .catch(err => err.message);
  }
}
