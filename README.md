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
