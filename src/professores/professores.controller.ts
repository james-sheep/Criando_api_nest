
import { Body, Controller, Get, Post, Param, Patch, Delete } from '@nestjs/common';
import { Professor} from './professores.model';
import {ProfessoresService} from './professores.service';



@Controller('professores')
export class ProfessoresController {

    constructor(private readonly professoresService:ProfessoresService){}



    @Get()
    async ConsultaTodos(): Promise<any>{

        return this.professoresService.mostraTodos();

    }



    @Get(':tia')
    getProf( @Param('tia') tia: number ){
        return this.professoresService.getProfessorByTIA(tia);
    }


    @Post()
    async CriaProfessor(@Body() professor: Professor): Promise<any>{
        
        var resposta = await this.professoresService.criaProfessor(professor);
        return {id : resposta};
        
    }


    // UPDATE
    @Patch()
    async updateprof(@Body() professor: Professor ) : Promise<any> {
        return await this.professoresService.updateProfessor(professor);
    }

    // DELETE
    @Delete(':tia')
    async deleteprofessor(@Param('tia') tia: number){
        await this.professoresService.deleteProfessor(tia);
        return null;
    }










}
