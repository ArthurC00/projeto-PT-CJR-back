import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    $connect: any;
  private _lojas: any;
  public get lojas(): any {
    return this._lojas;
  }
  public set lojas(value: any) {
    this._lojas = value;
  }
    async onModuleInit() {
        await this.$connect();
    }
    
  }

