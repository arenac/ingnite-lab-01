import { Field, InputType } from '@nestjs/graphql';
import { CreateProductParams } from '../../../services/products.service';

@InputType()
export class CreateProductInput implements CreateProductParams {
  @Field()
  title: string;
}
