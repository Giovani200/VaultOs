import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  async getDashboard(userId: string) {
    const account = await this.prisma.account.findFirst({
      where: { userId },
      include: {
        transactions: {
          orderBy: { date: 'desc' },
          take: 10,
        },
      },
    });

    return account;
  }
}
