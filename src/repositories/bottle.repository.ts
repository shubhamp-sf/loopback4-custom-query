import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PgsqlDataSource} from '../datasources';
import {Bottle, BottleRelations} from '../models';

export class BottleRepository extends DefaultCrudRepository<
  Bottle,
  typeof Bottle.prototype.id,
  BottleRelations
> {
  constructor(
    @inject('datasources.pgsql') dataSource: PgsqlDataSource,
  ) {
    super(Bottle, dataSource);
  }
}
