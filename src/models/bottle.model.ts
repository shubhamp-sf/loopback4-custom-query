import {Entity, model, property} from '@loopback/repository';

@model()
export class Bottle extends Entity {
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
  brand: string;

  @property({
    type: 'number',
    required: true,
  })
  price: number;


  constructor(data?: Partial<Bottle>) {
    super(data);
  }
}

export interface BottleRelations {
  // describe navigational properties here
}

export type BottleWithRelations = Bottle & BottleRelations;
