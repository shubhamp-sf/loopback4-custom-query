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
  param,
  patch,
  post,
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
  ) {
    const reponse = await this.bottleRepository.execute(
      'INSERT INTO public.bottle (brand, price) VALUES ($1, $2)',
      [bottle.brand, bottle.price],
    );
    console.log(reponse);
    return reponse;
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
  async find(@param.filter(Bottle) filter?: Filter<Bottle>) {
    const reponse = await this.bottleRepository.execute(
      'SELECT * from public.bottle',
    );
    console.log(reponse);
    return reponse;
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
  async findById(@param.path.number('id') id: number) {
    const reponse = await this.bottleRepository.execute(
      'SELECT * from public.bottle where id = $1',
      [id],
    );
    console.log(reponse);
    return reponse;
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
          schema: getModelSchemaRef(Bottle),
        },
      },
    })
    bottle: Bottle,
  ) {
    const reponse = await this.bottleRepository.execute(
      'UPDATE public.bottle SET brand = $1, price = $2 WHERE id = $3',
      [bottle.brand, bottle.price, id],
    );
    console.log(reponse);
    return reponse;
  }

  @del('/bottles/{id}')
  @response(204, {
    description: 'Bottle DELETE success',
  })
  async deleteById(@param.path.number('id') id: number) {
    const reponse = await this.bottleRepository.execute(
      'DELETE FROM public.bottle WHERE id = $1',
      [id],
    );
    console.log(reponse);
    return reponse;
  }
}
