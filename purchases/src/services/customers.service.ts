import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';
import { CreateCustomerParams } from '../http/graphql/inputs/create-customer-input';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async listAllProducts() {
    return this.prisma.product.findMany();
  }

  getCustomerByAuthUserId(id: string) {
    return this.prisma.customer.findUnique({
      where: {
        authUserId: id,
      },
    });
  }

  async createCustomer({ authUserId }: CreateCustomerParams) {
    const customer = await this.prisma.customer.findUnique({
      where: { authUserId },
    });

    if (customer) {
      throw new Error('Customer already exists');
    }

    return this.prisma.customer.create({
      data: {
        authUserId,
      },
    });
  }
}
