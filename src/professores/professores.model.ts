import * as mongoose from 'mongoose';

export const ProfessorSchema = new mongoose.Schema({
    name: { type: String, required: true},
    tia: { type: Number, required: true},
    departamento: { type: String, required: true},
    disciplina:{ type: String}
});

export interface Professor{
    id: string,
    name: string,
    tia: number,
    departamento: string,
    disciplina: string

}