import { Field, InputType } from '@nestjs/graphql';

export interface CreatePurchaseParams {
  productId: string;
  customerId: string;
}

@InputType()
export class CreatePurchaseInput
  implements Pick<CreatePurchaseParams, 'productId'>
{
  @Field()
  productId: string;
}
