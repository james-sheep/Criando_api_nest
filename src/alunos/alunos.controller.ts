import { Body, Controller, Get, Post, Param, Patch, Delete } from '@nestjs/common';
import { Aluno } from './alunos.model';
import {AlunosService} from './alunos.service';



@Controller('alunos')
export class AlunosController {

    constructor(private readonly alunosService:AlunosService){}

    @Get()
    async ConsultaTodos(): Promise<any>{

        return this.alunosService.mostraTodos();

    }



    @Get(':tia')
    getStudent( @Param('tia') tia: number ){
        return this.alunosService.getStudentByTIA(tia);
    }


    @Post()
    async CriaAluno(@Body() aluno: Aluno ): Promise<any>{
        
        var resposta = await this.alunosService.criaAluno(aluno);
        return {id : resposta};
        
    }


    // UPDATE
    @Patch()
    async updateStudent(@Body() aluno: Aluno ) : Promise<any> {
        return await this.alunosService.updateStudent(aluno);
    }

    // DELETE
    @Delete(':tia')
    async deleteStudent(@Param('tia') tia: number){
        await this.alunosService.deleteStudent(tia);
        return null;
    }









}
