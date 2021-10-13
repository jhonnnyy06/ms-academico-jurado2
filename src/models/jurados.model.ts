import {Entity, model, property} from '@loopback/repository';

@model()
export class Jurados extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'number',
  })
  telefono?: number;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  entidad: string;


  constructor(data?: Partial<Jurados>) {
    super(data);
  }
}

export interface JuradosRelations {
  // describe navigational properties here
}

export type JuradosWithRelations = Jurados & JuradosRelations;
