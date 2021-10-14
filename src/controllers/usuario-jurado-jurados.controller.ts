import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  UsuarioJurado,
  Jurados,
} from '../models';
import {UsuarioJuradoRepository} from '../repositories';

export class UsuarioJuradoJuradosController {
  constructor(
    @repository(UsuarioJuradoRepository)
    public usuarioJuradoRepository: UsuarioJuradoRepository,
  ) { }

  @get('/usuario-jurados/{id}/jurados', {
    responses: {
      '200': {
        description: 'Jurados belonging to UsuarioJurado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Jurados)},
          },
        },
      },
    },
  })
  async getJurados(
    @param.path.number('id') id: typeof UsuarioJurado.prototype.id,
  ): Promise<Jurados> {
    return this.usuarioJuradoRepository.tiene(id);
  }
}
