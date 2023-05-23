import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'pgsql',
  connector: 'postgresql',
  host: 'localhost',
  port: 5001,
  user: 'postgres',
  password: 'super-secret',
  database: 'postgres',
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class PgsqlDataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  static dataSourceName = 'pgsql';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.pgsql', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
