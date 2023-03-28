import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/JwtAuth/jwt-auth.guard';
import { CreateUserDto, UpdateUserDto } from 'src/dto/user.dto';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}

  /**
     * send back all users from the database
     @param res the response object from express framwork
     */

  @UseGuards(JwtAuthGuard)
  @Get()
  public async getAllUsers(@Res() res: Response) {
    try {
      const users = await this.userService.findAll();
      return res.status(HttpStatus.OK).json(users);
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).send(err);
    }
  }

  /**
   * send back one user with specific phone_number from the database
   * @param phone_number
   * @param res the response object from express framwork
   */
  @Get()
  public async getUser(
    @Body('phone_number') phone_number: string,
    @Res() res: Response,
  ) {
    try {
      const user = await this.userService.findOne(phone_number);
      res.status(HttpStatus.OK).json(user);
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).send(err);
    }
  }

  /**
   * create a user in the database and send it back
   * @param createUserDto
   * @param res the response object from express framwork
   */
  @Post()
  public async createUser(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ) {
    try {
      const user = await this.userService.create(createUserDto);
      res.status(HttpStatus.OK).json(user);
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).send(err);
    }
  }

  /**
   * delete one user with specific phone_number from the database
   * @param phone_number
   * @param res the response object from express framwork
   */
  @Delete()
  public async deleteUser(
    @Body('phone_number') phone_number: string,
    @Res() res: Response,
  ) {
    try {
      await this.userService.delete(phone_number);
      res.status(HttpStatus.OK).json({});
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).send(err);
    }
  }

  /**
   * update one user with specific phone_number in the database
   * @param phone_number
   * @param updateUserDto
   * @param res the response object from express framwork
   */
  @Put()
  public async updateUser(
    @Body('phone_number') phone_number: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    try {
      const updatedUser = await this.userService.update(
        phone_number,
        updateUserDto,
      );
      res.status(HttpStatus.OK).json(updatedUser);
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).send(err);
    }
  }
}
