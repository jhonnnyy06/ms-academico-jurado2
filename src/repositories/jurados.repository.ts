import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Jurados, JuradosRelations, UsuarioJurado, AreaInvestigacion, JuradosInvestigacion} from '../models';
import {UsuarioJuradoRepository} from './usuario-jurado.repository';
import {JuradosInvestigacionRepository} from './jurados-investigacion.repository';
import {AreaInvestigacionRepository} from './area-investigacion.repository';

export class JuradosRepository extends DefaultCrudRepository<
  Jurados,
  typeof Jurados.prototype.id,
  JuradosRelations
> {

  public readonly usuarioJurados: HasManyRepositoryFactory<UsuarioJurado, typeof Jurados.prototype.id>;

  public readonly areaInvestigacions: HasManyThroughRepositoryFactory<AreaInvestigacion, typeof AreaInvestigacion.prototype.id,
          JuradosInvestigacion,
          typeof Jurados.prototype.id
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('UsuarioJuradoRepository') protected usuarioJuradoRepositoryGetter: Getter<UsuarioJuradoRepository>, @repository.getter('JuradosInvestigacionRepository') protected juradosInvestigacionRepositoryGetter: Getter<JuradosInvestigacionRepository>, @repository.getter('AreaInvestigacionRepository') protected areaInvestigacionRepositoryGetter: Getter<AreaInvestigacionRepository>,
  ) {
    super(Jurados, dataSource);
    this.areaInvestigacions = this.createHasManyThroughRepositoryFactoryFor('areaInvestigacions', areaInvestigacionRepositoryGetter, juradosInvestigacionRepositoryGetter,);
    this.registerInclusionResolver('areaInvestigacions', this.areaInvestigacions.inclusionResolver);
    this.usuarioJurados = this.createHasManyRepositoryFactoryFor('usuarioJurados', usuarioJuradoRepositoryGetter,);
    this.registerInclusionResolver('usuarioJurados', this.usuarioJurados.inclusionResolver);
  }
}
