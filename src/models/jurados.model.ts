import {Entity, model, property, hasMany} from '@loopback/repository';
import {UsuarioJurado} from './usuario-jurado.model';
import {AreaInvestigacion} from './area-investigacion.model';
import {JuradosInvestigacion} from './jurados-investigacion.model';

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

  @hasMany(() => UsuarioJurado, {keyTo: 'id_jurado'})
  usuarioJurados: UsuarioJurado[];

  @hasMany(() => AreaInvestigacion, {through: {model: () => JuradosInvestigacion, keyFrom: 'id_jurado', keyTo: 'id_area'}})
  areaInvestigacions: AreaInvestigacion[];

  constructor(data?: Partial<Jurados>) {
    super(data);
  }
}

export interface JuradosRelations {
  // describe navigational properties here
}

export type JuradosWithRelations = Jurados & JuradosRelations;
