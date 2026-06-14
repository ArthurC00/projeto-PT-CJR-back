import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  findMany(arg0: { where: { categoria_pai_id: null; }; }) {
    throw new Error('Method not implemented.');
  }
  constructor() {
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}