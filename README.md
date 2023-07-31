
# Prueba Backend MarketPlace - ML

La sigueinte es una API que cubre basicamente el CRUD de 3 entidades relacionales (users, products y orders)
Se exponen todos los servicios que cubren las necesidades de la prueba y algunos más para permitir el flujo continúo de la app


## Documentsssation

[backend](https://github.com/Jorgemunera/prueba-backend-ml)


## API Reference

### Auth

```http
  POST https://api-ml.fly.dev/api/v1/auth/login
```

| Parameter | Type      | Description          |
| :-------- | :-------- | :------------------- |
| `email` | `email` | Email registrado |
| `password`   | `string` | Password registrado    |


La autenticación se realiza con passport local, se obtiene un token con el que se podrá acceder a diferentes servicios de la API

### Users

```http
  POST https://api-ml.fly.dev/api/v1/users
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `email` | **Requerido**. |
| `password`      | `string` | **Requerido**.  |
| `role`      | `Array[strings]` | Opcional  |

Crea un registro de la entidad, no necesita bearer token

```http
  GET https://api-ml.fly.dev/api/v1/users
```
No recibe parametros, pero solo role "administrador" puede acceder a este endpoint, requiere bearer token

```http
  GET https://api-ml.fly.dev/api/v1/users/:{id}
```
Requiere el identificador como parametro de ruta y requiere bearer token, obtiene un usuario específico

```http
  GET https://api-ml.fly.dev/api/v1/users/get-role-by-user
```
No requiere parametros, requiere bearer token, obtiene el role por usuario

### Orders

```http
  GET https://api-ml.fly.dev/api/v1/orders
```
Requiere de bearer token, obtiene todas las ordenes

```http
  POST https://api-ml.fly.dev/api/v1/orders
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userId`      | `integer` | **Requerido**.  |

Requiere bearer token, crea un registro en la tabla orders

```http
  POST https://api-ml.fly.dev/api/v1/orders/add-item
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `productId`      | `integer` | **Requerido**.  |

Requiere bearer token, se encarga de la lógica para agregar un producto a la tabla pivot OrderProduct, aqui se maneja gran parte del conteo de las cantidades del producto para mantenerse actualizado, requiere de bearer token

El registro básicamente consiste en agregar la cantidad de un producto determinado que se está comprando y se agrega a la orden del usuario correspondiente.

```http
  GET https://api-ml.fly.dev/api/v1/orders/user
```

Endpoint para obtener los productos comprados por usuario, requiere de bearer token, maneja la lógica que resuelve la relación de users - orders, orders-product

### Products

```http
  POST https://api-ml.fly.dev/api/v1/products
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`     | `string` | **Requerido**. min 2 max 30 |
| `sku`      | `string` | **Requerido**. **Unico** |
| `amount`    | `integer` | **Requerido**. min 1 max 99 |
| `price`      | `integer` | **Requerido**. min 1 |

Crea un registro en la tabla de product con los datos especificados, requiere bearer token

```http
  PATCH https://api-ml.fly.dev/api/v1/products/:{id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`     | `integer` | **Requerido**. parametros de ruta |
| `amount`      | `integer` | **Requerido**. |
| `price`    | `integer` | Opcional |

Permite modificar el registro de un producto, requiere bearer token, vienen parametros en ruta (id) y en body (cuerpo del request)

```http
  DELETE https://api-ml.fly.dev/api/v1/products/:{id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`     | `integer` | **Requerido**. parametros de ruta |

Permite eliminar un registro de un producto, requiere bearer token, se debe mandar el id en parametro de ruta

```http
  GET https://api-ml.fly.dev/api/v1/products
```

Regresa la lista de todos los productos registrados, no requiere bearer token, es un endpoint sin protección

```http
  GET https://api-ml.fly.dev/api/v1/products/:{id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`     | `integer` | **Requerido**. parametros de ruta |

Permite obtener el registro de un producto, requiere bearer token, se debe mandar el id en parametro de ruta

```http
  GET https://api-ml.fly.dev/api/v1/products/user-id


Obtenemos los productos que pertenecen a un usuario (vendedor), requiere de bearer token

## Authors

- [@Jorgemunera](https://github.com/Jorgemunera)

Jorge Múnera
+57 3168234878
