import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

import { Purchase } from './purchase';

@ObjectType('User')
@Directive('@key(fields: "authUserId")') // correlates with student entity from classroom
export class Customer {
  id: string;

  @Field(() => ID)
  authUserId: string;

  @Field(() => [Purchase])
  purchases: Purchase[];
}
