import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@Entity('job')
@ObjectType()
export class Job {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @Column({ type: 'text' })
    @Field()
    role: string;

    @Column({ type: 'text' })
    @Field()
    location: string;

    @Column({ type: 'text' })
    @Field()
    description: string;

    @Column({ type: 'boolean', default: false })
    @Field()
    isArchived: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @Field(() => String)
    creationDate: Date;
}