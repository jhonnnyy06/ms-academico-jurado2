import {Entity, model, property} from '@loopback/repository';

@model()
export class JuradosInvestigacion extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;


  constructor(data?: Partial<JuradosInvestigacion>) {
    super(data);
  }
}

export interface JuradosInvestigacionRelations {
  // describe navigational properties here
}

export type JuradosInvestigacionWithRelations = JuradosInvestigacion & JuradosInvestigacionRelations;
