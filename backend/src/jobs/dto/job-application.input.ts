import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateJobApplicationInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  resumeURL: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  phone?: string;

  @Field()
  jobId: string;

  @Field()
  addressCountry: string;

  @Field()
  addressCity: string;

  @Field()
  addressPostalCode: string;

  @Field()
  addressStreet: string;

  @Field({ nullable: true })
  addressStreetNumber?: string;
}