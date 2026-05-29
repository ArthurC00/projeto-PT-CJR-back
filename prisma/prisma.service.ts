import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  findUnique(arg0: { where: { id: number; }; }) {
    throw new Error('Method not implemented.');
  }
  findOne(arg0: { where: { id: number; }; }) {
    throw new Error('Method not implemented.');
  }
  constructor() {
    const connectionString = process.env["DATABASE_URL"]!;

    //if (!connectionString) {
    //  console.error('DATABASE_URL não encontrada');
    //}

    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}


