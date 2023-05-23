# loopback4-custom-query

Test App to get the response types of the execute function of the `DefaultCrudRepository`.

## Select Query

### Example 1

```ts
this.bottleRepository.execute('SELECT * from public.bottle');
```

Returned Plain Array

```json
[
  {"id": 1, "brand": "Bisleri General", "price": 20},
  {"id": 2, "brand": "Bisleri Vedica", "price": 60},
  {"id": 3, "brand": "AquaFina", "price": 120}
]
```

### Example 2

```ts
this.bottleRepository.execute('SELECT * from public.bottle where id = $1', [2]);
```

Returned Plain Array

```json
[{"id": 2, "brand": "Bisleri Vedica", "price": 60}]
```

## Insert Query

```ts
this.bottleRepository.execute(
  'INSERT INTO public.bottle (brand, price) VALUES ($1, $2)',
  ['Bisleri Vedica', 60],
);
```

Returned Empty Array

```json
[]
```

## Update Query

```ts
this.bottleRepository.execute(
  'UPDATE public.bottle SET brand = $1, price = $2 WHERE id = $3',
  [bottle.brand, bottle.price, id],
);
```

Returned an Object like below

```json
{"affectedRows": 1, "count": 1, "rows": []}
```

## Delete Query

```ts
this.bottleRepository.execute('DELETE FROM public.bottle WHERE id = $1', [id]);
```

Returned an Object like below

```json
{"affectedRows": 1, "count": 1, "rows": []}
```
