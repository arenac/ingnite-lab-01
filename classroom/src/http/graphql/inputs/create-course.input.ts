import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateCourseInput {
  title: string;
}
