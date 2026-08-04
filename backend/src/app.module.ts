import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Guest } from './guest.entity';
import { Message } from './message.entity';
import { Vote } from './vote.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_URL ? 'postgres' : 'better-sqlite3',
      database: process.env.DATABASE_URL ? undefined : 'database.sqlite',
      url: process.env.DATABASE_URL || undefined,
      entities: [Guest, Message, Vote],
      synchronize: true, // Auto-creación de tablas
      ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
    } as any),
    TypeOrmModule.forFeature([Guest, Message, Vote]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
