import { Field, InputType } from '@nestjs/graphql';

export interface CreateProductParams {
  title: string;
}

@InputType()
export class CreateProductInput implements CreateProductParams {
  @Field()
  title: string;
}
