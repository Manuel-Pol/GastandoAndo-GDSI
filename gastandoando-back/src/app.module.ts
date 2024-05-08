import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransfersModule } from './transfers/transfers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transfer } from './transfers/entities/transfer.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        type: "postgres",
        host: 'ep-super-pond-a4zoivba.us-east-1.aws.neon.tech',
        port: 5432,
        username: 'gandodb_owner',
        password: 'fDZMoOiq7BY2',
        database: 'gandodb',
        entities: [Transfer],
        ssl: true, // Habilitar SSL
        extra: {
          ssl: {
            rejectUnauthorized: false, // Opcional: deshabilitar la verificación del certificado SSL
            sslmode: 'require', // Modo SSL requerido
          },
        },
        synchronize: true,
      }
    ),
    TransfersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
