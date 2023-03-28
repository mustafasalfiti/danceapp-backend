import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'phone_number',
      passwordField: 'password',
    });
  }
  /**
   * create a passport localStrategy if the credentials were right else throw unaothorized exception
   * @param phoneNumber the phone number of the user
   * @param password the password that was given from the user
   */
  async validate(phone_number: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(phone_number, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
