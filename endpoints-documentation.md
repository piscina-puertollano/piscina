# Documentación de la API - Piscina

## Autenticación

Para acceder a la mayoría de los endpoints, es necesario incluir un token de autenticación en el encabezado `x-token`. Este token se utiliza para verificar la identidad del usuario y autorizar el acceso a los recursos.

## Categorías de Endpoints

### Usuarios

- **Login**: Autentica al usuario y devuelve un token de acceso.
 - Método: `POST`
 - URL: `http://localhost:9292/api/login`
 - Cuerpo:
    ```json
    {
      "email": "admin@piscina.com",
      "password": "1234"
    }
    ```

- **Mi Perfil**: Obtiene la información del perfil del usuario autenticado.
 - Método: `GET`
 - URL: `http://localhost:9292/api/my-profile`

- **Actualizar Usuario**: Actualiza la información de un usuario.
 - Método: `PUT`
 - URL: `http://localhost:9292/api/user`
 - Cuerpo:
    ```json
    {
      "id": "2",
      "roles": []
    }
    ```

- **Restablecer Contraseña**: Permite restablecer la contraseña de un usuario.
 - Método: `PUT`
 - URL: `http://localhost:9292/api/user`
 - Cuerpo:
    ```json
    {
      "id": "6",
      "password": "1234"
    }
    ```

- **Registrarse**: Crea un nuevo usuario.
 - Método: `POST`
 - URL: `http://localhost:9292/api/user`
 - Cuerpo:
    ```json
    {
      "email": "fran17@gmail.com",
      "firstName": "Fran",
      "lastName": "Álvarez",
      "password": "admin123"
    }
    ```

### Contactos

- **Mostrar Todos**: Lista todos los contactos.
 - Método: `GET`
 - URL: `http://localhost:9292/api/contact`

- **Nuevo Contacto**: Crea un nuevo contacto.
 - Método: `POST`
 - URL: `http://localhost:9292/api/contact`
 - Cuerpo:
    ```json
    {
      "tag": "galeria"
    }
    ```

### Tutores y Socios

- **Ver Socios de un Tutor**: Lista los socios asociados a un tutor específico.
 - Método: `GET`
 - URL: `http://localhost:9292/api/socios/2`

- **Mostrar Todos los Socios**: Lista todos los socios.
 - Método: `GET`
 - URL: `http://localhost:9292/api/socios`

- **Asignar Socio a un Tutor**: Asigna un socio a un tutor.
 - Método: `POST`
 - URL: `http://localhost:9292/api/user/asign/`
 - Cuerpo:
    ```json
    {
      "id_tutor": 2,
      "id_socio": []
    }
    ```

### Club y Assets

- **Obtener Club**: Obtiene información sobre un club específico.
 - Método: `POST`
 - URL: `http://localhost:9292/api/show/`
 - Cuerpo:
    ```json
    {
      "tag": "galeria"
    }
    ```

- **Obtener Todos los Campos del Club**: Lista todos los campos de un club.
 - Método: `GET`
 - URL: `http://localhost:9292/api/club/`

- **Actualizar Campo del Club por ID**: Actualiza un campo específico de un club.
 - Método: `PUT`
 - URL: `http://localhost:9292/api/club/65cb83ed84b87f16ebb41f4b`
 - Cuerpo:
    ```json
    {
      "assets": [12, 13, 14]
    }
    ```

- **Obtener Assets de un Usuario por ID**: Lista los assets asociados a un usuario específico.
 - Método: `GET`
 - URL: `http://localhost:9292/api/assets/1`

- **Subir Archivo**: Permite subir un archivo a un directorio específico.
 - Método: `POST`
 - URL: `http://localhost:9292/api/file/`
 - Encabezados:
    ```
    folder: landing
    ```
 - Cuerpo:
    ```
    archivo: /home/badr/Descargas/istockphoto-465383082-612x612.jpg
    ```

### Noticias

- **Mostrar Noticias**: Lista las noticias disponibles.
 - Método: `GET`
 - URL: `http://localhost:9292/api/news/5/10`

- **Crear Noticia**: Crea una nueva noticia.
 - Método: `POST`
 - URL: `http://localhost:9292/api/new`
 - Cuerpo:
    ```json
    {
      "title": "prueba",
      "body": "Al contrario del pensamiento popular, el texto de Lorem Ipsum no es simplemente texto aleatorio. Tiene sus raices en una pieza cl´sica de la literatura del Latin, que data del año 45 antes de Cristo, haciendo que este adquiera mas de 2000 años de antiguedad. Richard McClintock, un profesor de Latin de la Universidad de Hampden-Sydney en Virginia, encontró una de las palabras más oscuras de la lengua del latín, \""
    }
    ```

- **Actualizar Noticia**: Actualiza una noticia existente.
 - Método: `PUT`
 - URL: `http://localhost:9292/api/new/4`
 - Cuerpo:
    ```json
    {
      "title": "prueba",
      "body": "updated"
    }
    ```

### Alergias

- **Mostrar Todas las Alergias**: Lista todas las alergias disponibles.
 - Método: `GET`
 - URL: `http://localhost:9292/api/alergias/1`

### Búsqueda y Otras Operaciones

- **Buscar Usuario**: Busca un usuario por su ID.
 - Método: `POST`
 - URL: `http://localhost:9292/api/search`
 - Cuerpo:
    ```json
    {
      "id": "4"
    }
    ```

- **Mostrar Usuarios**: Lista todos los usuarios.
 - Método: `GET`
 - URL: `http://localhost:9292/api/users`

- **Mostrar Usuario por ID**: Obtiene la información de un usuario específico por su ID.
 - Método: `GET`
 - URL: `http://localhost:9292/api/user/1`

- **Eliminar Asset**: Elimina un asset específico.
 - Método: `DELETE`
 - URL: `http://localhost:9292/api/file/bd3dc407-d10f-487e-9b5e-b220e69e5a6d.jpg/landing`

- **Mostrar Roles**: Lista todos los roles disponibles.
 - Método: `GET`
 - URL: `http://localhost:9292/api/rols`

- **Comentarios de Noticia**: Obtiene los comentarios asociados a una noticia específica.
 - Método: `GET`
 - URL: `http://localhost:9292/api/comments/1`

- **Noticias Populares**: Lista las noticias más populares.
 - Método: `GET`
 - URL: `http://localhost:9292/api/afin-news`


## Categorias

- **Cliente:** Thunder Client
- **Nombre de la Colección:** Categorias
- **Fecha de Exportación:** 2024-03-06T19:37:50.987Z
- **Versión:** 1.1

### Requests

1. **getCategorias**
   - **URL:** http://127.0.0.1:9090/api/categorias/
   - **Método:** GET

2. **getCategoria**
   - **URL:** http://127.0.0.1:9090/api/categorias/2
   - **Método:** GET

3. **insertCategoria**
   - **URL:** http://127.0.0.1:9090/api/categorias/
   - **Método:** POST
   - **Body:**
     ```json
     {
       "nombre": "Cadetes"
     }
     ```

4. **updateCategoria**
   - **URL:** http://127.0.0.1:9090/api/categorias/5
   - **Método:** PUT
   - **Body:**
     ```json
     {
       "nombre": "Juvenil"
     }
     ```

5. **deleteCategoria**
   - **URL:** http://127.0.0.1:9090/api/categorias/5
   - **Método:** DELETE

## Eventos

- **Cliente:** Thunder Client
- **Nombre de la Colección:** Eventos
- **Fecha de Exportación:** 2024-03-06T19:38:22.574Z
- **Versión:** 1.1

### Requests

1. **getEventos**
   - **URL:** http://127.0.0.1:9292/api/eventos
   - **Método:** GET

2. **getEvento**
   - **URL:** http://127.0.0.1:9090/api/eventos/2
   - **Método:** GET

3. **insertEvento**
   - **URL:** http://127.0.0.1:9292/api/eventos/
   - **Método:** POST
   - **Body:**
     ```json
     {
       "nombre": "NadarMucho",
       "fecha": "2024/05/12",
       "sede": "Toletum",
       "categoria": {
         "id": 3,
         "nombre": "TODOS"
       },
       "visible": true,
       "privado": false,
       "desc": "asdf"
     }
     ```

4. **updateEvento**
   - **URL:** http://127.0.0.1:9090/api/eventos/15
   - **Método:** PUT
   - **Body:**
     ```json
     {
       "nombre": "NadarPoco",
       "fecha": "2024/05/11",
       "sede": "Toledo",
       "categoria": "NADADOR",
       "visible": false,
       "privado": true
     }
     ```

5. **deleteEventos**
   - **URL:** http://127.0.0.1:9090/api/eventos/1
   - **Método:** DELETE

## EventoUsuario

- **Cliente:** Thunder Client
- **Nombre de la Colección:** EventoUsuario
- **Fecha de Exportación:** 2024-03-06T19:38:38.985Z
- **Versión:** 1.1

### Requests

1. **insertEventoUsuario**
   - **URL:** http://127.0.0.1:9090/api/eventoUsuarios/
   - **Método:** POST
   - **Body:**
     ```json
     {
       "idUsuario": 1,
       "idEvento": 2
     }
     ```

2. **getUsuariosConIdEvento**
   - **URL:** (No proporcionada)
   - **Método:** GET

## NoSocios

- **Cliente:** Thunder Client
- **Nombre de la Colección:** NoSocios
- **Fecha de Exportación:** 2024-03-06T19:38:29.869Z
- **Versión:** 1.1

### Requests

1. **getNoSocios**
   - **URL:** http://127.0.0.1:9090/api/noSocios/
   - **Método:** GET

2. **getNoSocio**
   - **URL:** http://127.0.0.1:9090/api/noSocios/1
   - **Método:** GET

3. **insertNoSocio**
   - **URL:** http://127.0.0.1:9090/api/noSocios/2
   - **Método:** POST
   - **Body:**
     ```json
     {
       "nombre": "José",
       "apellidos": "Bonaparte",
       "email": "pepe@asdf.com"
     }
     ```

4. **updateNoSocio**
   - **URL:** http://127.0.0.1:9090/api/noSocios/2
   - **Método:** PUT
   - **Body:**
     ```json
     {
       "nombre": "pepe",
       "apellidos": "botella",
       "email": "pepe@asdf.com"
     }
     ```

5. **deleteNoSocio**
   - **URL:** http://127.0.0.1:9090/api/noSocios/2
   - **Método:** DELETE

6. **getNoSociosConIdEvento**
   - **URL:** (No proporcionada)
   - **Método:** GET

## Ejercicio Entrenamiento

### Obtener todos los Entrenamientos

- **Descripción**: Obtener la lista de todos los entrenamientos.
- **Método**: GET
- **Ruta**: `localhost:9292/api/ejercicioEntrenamiento/`
- **Encabezados**:
  - `x-token`: Token de autenticación
- **Respuesta**: Lista de entrenamientos

### Obtener un Entrenamiento específico

- **Descripción**: Obtener detalles de un entrenamiento específico.
- **Método**: GET
- **Ruta**: `localhost:9292/api/ejercicioEntrenamiento/1`
- **Respuesta**: Detalles del entrenamiento

### Crear un nuevo Entrenamiento

- **Descripción**: Crear un nuevo entrenamiento.
- **Método**: POST
- **Ruta**: `localhost:9292/api/ejercicioEntrenamiento/crear-entrenamiento`
- **Encabezados**:
  - `x-token`: Token de autenticación
- **Cuerpo**: Datos del nuevo entrenamiento (nombre, descripción, ejercicios)
- **Respuesta**: Confirmación de la creación del entrenamiento
```json
{
    "nombre": "Nombre del entrenamiento de prueba2",
    "descripcion": "Descripción del entrenamiento de prueba2",
    "ejercicios": [
        {
            "descripcion": "Descripción del 1 ejercicio",
            "idTipo": 1
        },
        {
            "descripcion": "Descripción del 2 ejercicio",
            "idTipo": 2 
        },
        {
            "descripcion": "Descripción del 3 ejercicio",
            "idTipo": 3
        }
    ]
}
```

### Actualizar un Entrenamiento existente

- **Descripción**: Actualizar detalles de un entrenamiento existente.
- **Método**: PUT
- **Ruta**: `localhost:9292/api/ejercicioEntrenamiento/2`
- **Cuerpo**: Nuevos datos del entrenamiento (nombre, descripción, ejercicios)
- **Respuesta**: Confirmación de la actualización del entrenamiento
```json
{
    "nombre": "Nuevo nombre del entrenamiento",
    "descripcion": "Nueva descripción del entrenamiento",
    "ejercicios": [
        {
            "id": 9,  
            "descripcion": "Nueva descripción del Ejercicio 1",
            "idTipo": 1
        }
    ]
}

```

### Eliminar un Entrenamiento

- **Descripción**: Eliminar un entrenamiento existente.
- **Método**: DELETE
- **Ruta**: `localhost:9292/api/ejercicioEntrenamiento/2`
- **Encabezados**:
  - `x-token`: Token de autenticación
- **Respuesta**: Confirmación de la eliminación del entrenamiento

### Obtener Entrenamiento Asignado a un Usuario

- **Descripción**: Obtener el entrenamiento asignado a un usuario específico.
- **Método**: GET
- **Ruta**: `localhost:9292/api/ejercicioEntrenamiento/asignado/1`
- **Encabezados**:
  - `x-token`: Token de autenticación
- **Respuesta**: Detalles del entrenamiento asignado al usuario

## Puntuaciones

### Obtener Puntuaciones de Socios

- **Descripción**: Obtener las puntuaciones de todos los socios.
- **Método**: GET
- **Ruta**: `localhost:9292/api/puntuaciones/socios`
- **Encabezados**:
  - `x-token`: Token de autenticación
- **Respuesta**: Lista de puntuaciones de socios

### Obtener Todas las Puntuaciones

- **Descripción**: Obtener todas las puntuaciones registradas.
- **Método**: GET
- **Ruta**: `localhost:9292/api/puntuaciones`
- **Respuesta**: Lista de puntuaciones

### Obtener Puntuación Específica

- **Descripción**: Obtener detalles de una puntuación específica.
- **Método**: GET
- **Ruta**: `localhost:9292/api/puntuaciones/3`
- **Encabezados**:
  - `x-token`: Token de autenticación
- **Respuesta**: Detalles de la puntuación

### Crear una Nueva Puntuación

- **Descripción**: Crear una nueva puntuación.
- **Método**: POST
- **Ruta**: `localhost:9292/api/puntuaciones/crear-puntuacion`
- **Encabezados**:
  - `x-token`: Token de autenticación
- **Cuerpo**: Datos de la nueva puntuación (nota, userId, idEntrenamiento)
- **Respuesta**: Confirmación de la creación de la puntuación
```json
{
    "nota": 4,
    "userId": "4",
    "idEntrenamiento": 1
}
```

### Modificar una Puntuación existente

- **Descripción**: Modificar detalles de una puntuación existente.
- **Método**: PUT
- **Ruta**: `localhost:9292/api/puntuaciones/2`
- **Cuerpo**: Nuevos datos de la puntuación (nota, userId, idEntrenamiento)
- **Respuesta**: Confirmación de la modificación de la puntuación
```json
{
    "nota": 3,
    "userId": "4",
    "idEntrenamiento": 1
}
```

### Obtener Puntuación de un Socio específico

- **Descripción**: Obtener la puntuación de un socio específico.
- **Método**: GET
- **Ruta**: `localhost:9292/api/puntuaciones/socio/3`
- **Encabezados**:
  - `x-token`: Token de autenticación
- **Respuesta**: Puntuación del socio específico

### Obtener Notas de un Usuario específico

- **Descripción**: Obtener todas las notas de un usuario específico.
- **Método**: GET
- **Ruta**: `localhost:9292/api/puntuaciones/notas/3`
- **Encabezados**:
  - `x-token`: Token de autenticación
- **Respuesta**: Lista de notas del usuario

### Obtener Usuarios del Tutor

- **Descripción**: Obtener la lista de usuarios asociados a un tutor.
- **Método**: GET
- **Ruta**: `localhost:9292/api/puntuaciones/usuarios-tutor`

## Ejercicios

### Obtener Todos los Ejercicios

- **Descripción**: Obtener la lista de todos los ejercicios.
- **Método**: GET
- **Ruta**: `localhost:9292/api/ejercicios`
- **Respuesta**: Lista de ejercicios

### Obtener un Ejercicio específico

- **Descripción**: Obtener detalles de un ejercicio específico.
- **Método**: GET
- **Ruta**: `localhost:9292/api/ejercicios/1`
- **Respuesta**: Detalles del ejercicio

### Crear un nuevo Ejercicio

- **Descripción**: Crear un nuevo ejercicio.
- **Método**: POST
- **Ruta**: `localhost:9292/api/ejercicios`
- **Respuesta**: Confirmación de la creación del ejercicio

### Modificar un Ejercicio existente

- **Descripción**: Modificar detalles de un ejercicio existente.
- **Método**: PUT
- **Ruta**: `localhost:9292/api/ejercicios/1`
- **Respuesta**: Confirmación de la modificación del ejercicio

### Eliminar un Ejercicio existente

- **Descripción**: Eliminar un ejercicio existente.
- **Método**: DELETE
- **Ruta**: `localhost:9292/api/ejercicios`
- **Respuesta**: Confirmación de la eliminación del ejercicio

## Entrenamiento

### Obtener Todos los Entrenamientos

- **Descripción**: Obtener la lista de todos los entrenamientos.
- **Método**: GET
- **Ruta**: `localhost:9292/api/entrenamiento`
- **Respuesta**: Lista de entrenamientos

## Tipos de Ejercicios

### Obtener Todos los Tipos de Ejercicios

- **Descripción**: Obtener la lista de todos los tipos de ejercicios.
- **Método**: GET
- **Ruta**: `localhost:9292/api/tiposEjercicios`
- **Encabezados**:
  - `x-token`: Token de autenticación
- **Respuesta**: Lista de tipos de ejercicios

### Clases

#### Obtener clases

```http
  GET http://localhost:9292/api/clases
```

#### Obtener clases por id

```http
  GET http://localhost:9292/api/clases/{id}
```

#### Crear nueva clase

```http
  POST http://localhost:9292/api/clases
```

```json
{
  "id_categoria": 1,
  "nombre": "Viernes",
  "hora_inicio": "08:00",
  "hora_fin": "09:00",
  "descripcion": "djfdk"
}
```

#### Actualizar clase

```http
  PUT http://localhost:9292/api/clases/{id}
```

```json
{
  "id_categoria": 1,
  "nombre": "Viernes",
  "hora_inicio": "08:00",
  "hora_fin": "09:00",
  "descripcion": "djfdk"
}
```

#### Eliminar clases por id

```http
  DELETE http://localhost:9292/api/clases/{id}
```

### Relaciones Clases - Usuarios
#### Obtener relaciones

```http
  GET http://localhost:9292/api/obtener/clases
```

#### Crear nueva relacion

```http
  POST http://localhost:9292/api/asignar/clase/usuario
```

```json
{
    "id_usuario": 4,
    "id_clase": 1
}
```

#### Actualizar relacion

```http
  PUT http://localhost:9292/api/actualizar/clase/usuario/{id}
```

```json
{
    "id_usuario": 4,
    "id_clase": 1
}
```

#### Eliminar relaciones por id

```http
  DELETE http://localhost:9292/api/eliminar/clase/usuario/{id}
```

### Relaciones Faltas
#### Obtener faltas

```http
  GET http://localhost:9292/api/faltas/
```

#### Crear nueva falta

```http
  POST http://localhost:9292/api/faltas
```

```json
{
  "id_usuario": 2,
  "id_clase": 1,
  "fecha": "20/11/2023"
}
```

#### Actualizar faltas

```http
  PUT http://localhost:9292/api/faltas/{id}
```

```json
{
  "id_usuario": 2,
  "id_clase": 1,
  "fecha": "20/11/2023"
}
```

#### Eliminar faltas por id

```http
  DELETE http://localhost:9292/api/faltas/{id}
```

### Relaciones Categorias - Clases
#### Obtener categoria clases

```http
  GET http://localhost:9292/api/faltas/
```

#### Crear categoria de clase nueva

```http
  POST  http://localhost:9292/api/categorias/clase/{id}
```

```json
{
  "nombre":"Otra Categoria"
}
```

#### Actualizar categoria

```http
  PUT http://localhost:9292/api/categorias/clase/{id}
```

```json
{
  "nombre":"Otra Categoria"
}
```

#### Eliminar faltas por id

```http
  DELETE http://localhost:9292/api/categorias/clase/{id}
```