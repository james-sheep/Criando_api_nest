import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Professor } from './professores.model';


@Injectable()
export class ProfessoresService {

    constructor(@InjectModel('Professor') private readonly professorModel: Model<any>) { }


    async mostraTodos(){

        const todos_professores = await this.professorModel.find().exec();
        return todos_professores;


    }


    async criaProfessor(professor:Professor){
       const modeloDeProfessor = new this.professorModel({ 
           
        name: professor.name,
        tia: professor.tia,
        departamento: professor.departamento,
        disciplina: professor.disciplina
       })

       const result = await modeloDeProfessor.save()
       return result.id as string;

    }


    async getProfessorByTIA(tia: number): Promise<any> {
        const professor = await this.professorModel.findOne({tia: tia});
        if (!professor){
            throw new NotFoundException('O aluno não se encontra cadastrado');
        }
        return {
            id: professor.id,
            name: professor.name,
            tia: professor.tia,
            departamento: professor.departamento,
            disciplina: professor.disciplina
        }
    }

    async deleteProfessor(tia: number){
        const result = await this.professorModel.deleteOne({tia: tia}).exec();
        if (result.n === 0){
            throw new NotFoundException('Não foi possível deletar! Professor não encontrado.')
        }
    }

    async updateProfessor(professor: Professor): Promise<any>{
        const updatedProfessor = await this.professorModel.findOne({tia: professor.tia});
        if (!updatedProfessor){
            throw new NotFoundException('Could not find Teacher.');
        }
        if (professor.name){
            updatedProfessor.name = professor.name;
        }
        if (professor.departamento){
            updatedProfessor.departamento = professor.departamento;
        }
        updatedProfessor.save();
        return {
            id: updatedProfessor.id,
            name: updatedProfessor.name,
            tia: updatedProfessor.tia,
            departamento: updatedProfessor.departamento,
            disciplina: updatedProfessor.departamento,

        }
    }
    
}
