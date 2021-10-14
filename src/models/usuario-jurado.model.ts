import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Jurados} from './jurados.model';

@model({
  settings: {
    foreignKeys: {
      fk_Usuario_id_jurado: {
        name: 'fk_Usuario_id_jurado',
        entity: 'Jurado',
        entityKey: 'id',
        foreignKey: 'id_jurado',
      }
    },
  },
})
export class UsuarioJurado extends Entity {
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
  clave: string;

  @belongsTo(() => Jurados, {name: 'tiene'})
  id_jurado: number;

  constructor(data?: Partial<UsuarioJurado>) {
    super(data);
  }
}

export interface UsuarioJuradoRelations {
  // describe navigational properties here
}

export type UsuarioJuradoWithRelations = UsuarioJurado & UsuarioJuradoRelations;
