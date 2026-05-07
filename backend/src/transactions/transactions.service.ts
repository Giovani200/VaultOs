import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async transfer(userId: string, amount: number, recipientIban: string) {
    const account = await this.prisma.account.findFirst({ where: { userId } });

    if (!account) throw new BadRequestException('Compte introuvable');
    if (Number(account.balance) < amount) {
      throw new BadRequestException('Solde insuffisant');
    }

    await this.prisma.account.update({
      where: { id: account.id },
      data: { balance: { decrement: amount } },
    });

    const transaction = await this.prisma.transaction.create({
      data: {
        accountId: account.id,
        amount,
        type: 'DEBIT',
        label: `Virement vers ${recipientIban}`,
      },
    });

    return { success: true, transactionId: transaction.id };
  }
}
