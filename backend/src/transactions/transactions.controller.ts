import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TransactionsService } from './transactions.service';

class TransferDto {
  amount!: number;
  recipient_iban!: string;
}

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('transfer')
  transfer(@Request() req, @Body() body: TransferDto) {
    return this.transactionsService.transfer(req.user.id, body.amount, body.recipient_iban);
  }
}
