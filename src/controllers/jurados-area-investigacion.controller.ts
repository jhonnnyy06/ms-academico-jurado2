import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
  import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
Jurados,
JuradosInvestigacion,
AreaInvestigacion,
} from '../models';
import {JuradosRepository} from '../repositories';

export class JuradosAreaInvestigacionController {
  constructor(
    @repository(JuradosRepository) protected juradosRepository: JuradosRepository,
  ) { }

  @get('/jurados/{id}/area-investigacions', {
    responses: {
      '200': {
        description: 'Array of Jurados has many AreaInvestigacion through JuradosInvestigacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(AreaInvestigacion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<AreaInvestigacion>,
  ): Promise<AreaInvestigacion[]> {
    return this.juradosRepository.areaInvestigacions(id).find(filter);
  }

  @post('/jurados/{id}/area-investigacions', {
    responses: {
      '200': {
        description: 'create a AreaInvestigacion model instance',
        content: {'application/json': {schema: getModelSchemaRef(AreaInvestigacion)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Jurados.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AreaInvestigacion, {
            title: 'NewAreaInvestigacionInJurados',
            exclude: ['id'],
          }),
        },
      },
    }) areaInvestigacion: Omit<AreaInvestigacion, 'id'>,
  ): Promise<AreaInvestigacion> {
    return this.juradosRepository.areaInvestigacions(id).create(areaInvestigacion);
  }

  @patch('/jurados/{id}/area-investigacions', {
    responses: {
      '200': {
        description: 'Jurados.AreaInvestigacion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AreaInvestigacion, {partial: true}),
        },
      },
    })
    areaInvestigacion: Partial<AreaInvestigacion>,
    @param.query.object('where', getWhereSchemaFor(AreaInvestigacion)) where?: Where<AreaInvestigacion>,
  ): Promise<Count> {
    return this.juradosRepository.areaInvestigacions(id).patch(areaInvestigacion, where);
  }

  @del('/jurados/{id}/area-investigacions', {
    responses: {
      '200': {
        description: 'Jurados.AreaInvestigacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(AreaInvestigacion)) where?: Where<AreaInvestigacion>,
  ): Promise<Count> {
    return this.juradosRepository.areaInvestigacions(id).delete(where);
  }
}
