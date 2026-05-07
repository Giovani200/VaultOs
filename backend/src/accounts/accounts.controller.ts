import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountsService } from './accounts.service';

@Controller('accounts')
export class AccountsController {
  constructor(private accountsService: AccountsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('dashboard')
  getDashboard(@Request() req) {
    return this.accountsService.getDashboard(req.user.id);
  }
}
