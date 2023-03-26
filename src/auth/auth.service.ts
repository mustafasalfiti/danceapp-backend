import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { User } from 'src/schema/user.schema';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService
        ) { }

    /**
     * validate if the password is correct and then return the user
     * @param phone_number the phone number of the user
     * @param pass the password that was given from the user
     */
    async validateUser(phoneNumber: string, pass: string): Promise<User> | null {
        const user = await this.userService.findOne(phoneNumber);
        if (user && bcrypt.compareSync(pass, user.password)) {
            return user;
        }
        return null;
    }

    /**
     * generate a JWT from subset of the user object and return a access token property
     * @param user user object
     */
    async login(user:User) {
        const payload = {phone_number: user.phone_number , sub:user._id }
        return {
            access_token: this.jwtService.sign(payload)
        }

    }
}
