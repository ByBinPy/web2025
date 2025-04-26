import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient()

@Injectable()
export class UserService {
  create(data: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.create({
      data
    })
  }

  getByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        email: email
      }
    })
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

}
