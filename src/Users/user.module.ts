import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { User, UserSchema } from './Model/user.model';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
})
export class UsersModule { }
