import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SummaryModule } from './summary/summary.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/frontdoor'),
    UserModule,
    SummaryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
