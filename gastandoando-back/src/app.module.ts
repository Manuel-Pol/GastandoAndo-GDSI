import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransfersModule } from './transfers/transfers.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    // TypeOrmModule.forRoot(
    //   {
    //     type: "sqljs",
    //     host: 'localhost',
    //     port: 3306,
    //     username: 'root',
    //     password: '',
    //     da
    //   }
    // ),
    TransfersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
