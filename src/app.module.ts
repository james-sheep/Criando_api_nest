import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlunosModule } from './alunos/alunos.module';
import { ProfessoresModule } from './professores/professores.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [AlunosModule, ProfessoresModule, MongooseModule.forRoot('mongodb+srv://thiago:12345@cluster0.u0lmk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority') ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
