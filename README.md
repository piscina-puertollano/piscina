
# Piscina 

Aqui añadimos una descripcion del proyecto




## API Reference

### Tabla Clases

#### Obtener Temporadas

```http
  GET http://localhost:9090/api/clases
```

#### Obtener Temporada por ID

```http
  GET  http://localhost:9090/api/clases/{id}
```

### Agregar nueva temporada

```http
  POST  http://localhost:9090/api/clases
```

### Actualizar temporada por ID

```http
  PUT  http://localhost:9090/api/clases/{id}
```
```json
{
  "temporada": "2022/23"
}
```

### Eliminar temporada por ID

```http
  DELETE http://localhost:9090/api/clases/{id}
```

### Tabla Faltas

#### Obtener Faltas

```http
  GET http://localhost:9090/api/faltas
```

#### Obtener Faltas por ID

```http
  GET  http://localhost:9090/api/faltas/{id}
```

### Agregar nueva falta

```http
  POST  http://localhost:9090/api/faltas
```
```json
{
  "id_usuario": 2,
  "id_clase": 1
}
```

### Actualizar faltas por ID

```http
  PUT  http://localhost:9090/api/faltas/{id}
```
```json
{
  "id_usuario": 2,
  "id_clase": 1
}
```

### Eliminar faltas por ID

```http
  DELETE http://localhost:9090/api/faltas/{id}
```
## Authors

- [Badrelddin Hamidou El Aadli](https://github.com/bhamidou)

- [Manuel García Díaz](https://github.com/bhamidou)

- [Marina Laguna Valdepeñas](https://github.com/demon-for-arcangel)

- [Gonzalo Martínez Haro](https://github.com/GonzaloMartinezHaro)