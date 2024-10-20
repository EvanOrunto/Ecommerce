import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './Model/user.model';
import { Model } from 'mongoose';

@Injectable()
export class UsersService { }
