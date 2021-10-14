import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {UsuarioJurado, UsuarioJuradoRelations, Jurados} from '../models';
import {JuradosRepository} from './jurados.repository';

export class UsuarioJuradoRepository extends DefaultCrudRepository<
  UsuarioJurado,
  typeof UsuarioJurado.prototype.id,
  UsuarioJuradoRelations
> {

  public readonly tiene: BelongsToAccessor<Jurados, typeof UsuarioJurado.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('JuradosRepository') protected juradosRepositoryGetter: Getter<JuradosRepository>,
  ) {
    super(UsuarioJurado, dataSource);
    this.tiene = this.createBelongsToAccessorFor('tiene', juradosRepositoryGetter,);
    this.registerInclusionResolver('tiene', this.tiene.inclusionResolver);
  }
}
