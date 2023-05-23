import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Bottle} from '../models';
import {BottleRepository} from '../repositories';

export class BottleController {
  constructor(
    @repository(BottleRepository)
    public bottleRepository: BottleRepository,
  ) {}

  @post('/bottles')
  @response(200, {
    description: 'Bottle model instance',
    content: {'application/json': {schema: getModelSchemaRef(Bottle)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bottle, {
            title: 'NewBottle',
            exclude: ['id'],
          }),
        },
      },
    })
    bottle: Omit<Bottle, 'id'>,
  ): Promise<Bottle> {
    return this.bottleRepository.create(bottle);
  }

  @get('/bottles/count')
  @response(200, {
    description: 'Bottle model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Bottle) where?: Where<Bottle>): Promise<Count> {
    return this.bottleRepository.count(where);
  }

  @get('/bottles')
  @response(200, {
    description: 'Array of Bottle model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Bottle, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Bottle) filter?: Filter<Bottle>): Promise<Bottle[]> {
    return this.bottleRepository.find(filter);
  }

  @patch('/bottles')
  @response(200, {
    description: 'Bottle PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bottle, {partial: true}),
        },
      },
    })
    bottle: Bottle,
    @param.where(Bottle) where?: Where<Bottle>,
  ): Promise<Count> {
    return this.bottleRepository.updateAll(bottle, where);
  }

  @get('/bottles/{id}')
  @response(200, {
    description: 'Bottle model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Bottle, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Bottle, {exclude: 'where'})
    filter?: FilterExcludingWhere<Bottle>,
  ): Promise<Bottle> {
    return this.bottleRepository.findById(id, filter);
  }

  @patch('/bottles/{id}')
  @response(204, {
    description: 'Bottle PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bottle, {partial: true}),
        },
      },
    })
    bottle: Bottle,
  ): Promise<void> {
    await this.bottleRepository.updateById(id, bottle);
  }

  @put('/bottles/{id}')
  @response(204, {
    description: 'Bottle PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() bottle: Bottle,
  ): Promise<void> {
    await this.bottleRepository.replaceById(id, bottle);
  }

  @del('/bottles/{id}')
  @response(204, {
    description: 'Bottle DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.bottleRepository.deleteById(id);
  }
}
