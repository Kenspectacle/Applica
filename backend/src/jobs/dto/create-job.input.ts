import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

@InputType()
export class CreateJobInput {
  @Field()
  @IsNotEmpty()
  role: string;

  @Field()
  @IsNotEmpty()
  location: string;

  @Field()
  @IsNotEmpty()
  description: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isArchived?: boolean;
}

@InputType()
export class UpdateJobInput {
  @Field({ nullable: true })
  @IsOptional()
  role?: string;

  @Field({ nullable: true })
  @IsOptional()
  location?: string;

  @Field({ nullable: true })
  @IsOptional()
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isArchived?: boolean;
}