// database.service.ts
import { neon } from '@neondatabase/serverless';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService {
    private readonly sql;

    constructor(private configService: ConfigService) {
        const databaseUrl = this.configService.get<string>('DATABASE_URL');
        if (!databaseUrl) {
            throw new Error('DATABASE_URL is not defined in environment');
        }
        
        this.sql = neon(this.configService.get<string>('DATABASE_URL')!);
    }
        async getData() {
        const data = await this.sql`SELECT * FROM playing_with_neon LIMIT 5`;
        return data;
    }
}