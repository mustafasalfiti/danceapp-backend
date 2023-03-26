import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto, CreateUserDto } from 'src/dto/user.dto';
import { User } from 'src/schema/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

    static saltRounds: number = 10;
    constructor(
        // Inject the model name 
        @InjectModel(User.name) private readonly userModel: Model<User>
    ) { }


    /**
     * find all users in the database
     */
    public async findAll(): Promise<User[]> {
        return await this.userModel.find().exec()
    }

    /**
     * find one user from the database if not exists throws exception error
     * @param phone_number 
     */
    public async findOne(phone_number: string): Promise<User> {
        const user = await this.userModel.findOne({ phone_number }).exec();

        if (!user)
            throw new NotFoundException(`User with the phone number ${phone_number} is not found`)

        return user;
    }


    /**
     * update one user from the database if not exists throws exception error
     * @param phone_number 
     */
    public async update(phone_number: string, updateUserDto: UpdateUserDto): Promise<User> {
        const updateExistingUser = await this.userModel.findOneAndUpdate({ phone_number }, updateUserDto).exec()

        if (!updateExistingUser)
            throw new NotFoundException(`User with the phone number ${phone_number} is not found`)

        return updateExistingUser;
    }

    /**
     * remove one user from the database
     * @param phone_number 
     */
    public async delete(phone_number: string): Promise<Boolean> {
        try {
            await this.userModel.findOneAndRemove({ phone_number })
            return true
        } catch (err) {
            throw new Error(`User failed to be deleted ${err}`);

        }
    }

    /**
     * create one user in the database
     * @param userCreateDto Data transfer object for user
     */
     public async create(createUserDto: CreateUserDto): Promise<any> {
        const newUser: User = new this.userModel(createUserDto);
        console.log(newUser)
        // bcrypt the password and after that save it in the database
        const hash = bcrypt.hashSync(newUser.password, bcrypt.genSaltSync(UserService.saltRounds))
        newUser.password = hash;
        await newUser.save()
        return newUser;
    }
}
