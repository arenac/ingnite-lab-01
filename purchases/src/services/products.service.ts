import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async listAllProducts() {
    return this.prisma.product.findMany();
  }
}
