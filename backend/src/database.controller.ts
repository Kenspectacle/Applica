import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Controller('database')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get('test')
  async testDatabase() {
    try {
      const data = await this.databaseService.getData();
      return {
        success: true,
        data: data,
        message: 'Database connection successful!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Database connection failed!'
      };
    }
  }
}