import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Aluno } from './alunos.model';



@Injectable()
export class AlunosService {

    constructor(@InjectModel('Aluno') private readonly alunoModel: Model<any>) { }


    async mostraTodos(){

        const todos_alunos = await this.alunoModel.find().exec();
        return todos_alunos;


    }


    async criaAluno(aluno:Aluno){
       const modeloDeAluno = new this.alunoModel({ 
           
        name: aluno.name,
        tia: aluno.tia,
        course: aluno.course 

       })

       const result = await modeloDeAluno.save()
       return result.id as string;

    }


    async getStudentByTIA(tia: number): Promise<any> {
        const student = await this.alunoModel.findOne({tia: tia});
        if (!student){
            throw new NotFoundException('O aluno não se encontra cadastrado');
        }
        return {
            id: student.id,
            name: student.name,
            tia: student.tia,
            course: student.course
        }
    }

    async deleteStudent(tia: number){
        const result = await this.alunoModel.deleteOne({tia: tia}).exec();
        if (result.n === 0){
            throw new NotFoundException('Não foi possível deletar! Aluno não encontrado.')
        }
    }

    async updateStudent(aluno: Aluno): Promise<any>{
        const updatedStudent = await this.alunoModel.findOne({tia: aluno.tia});
        if (!updatedStudent){
            throw new NotFoundException('Could not find student.');
        }
        if (aluno.name){
            updatedStudent.name = aluno.name;
        }
        if (aluno.course){
            updatedStudent.course = aluno.course;
        }
        updatedStudent.save();
        return {
            id: updatedStudent.id,
            name: updatedStudent.name,
            tia: updatedStudent.tia,
            course: updatedStudent.course
        }
    }









}
