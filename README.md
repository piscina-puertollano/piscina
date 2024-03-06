# Club de Natación

Aplicación diseñada para el Club de Natación de Puertollano.

## Requisitos
Debemos tener instaladas las siguientes herramientas:
- NodeJS.
- Angular 17.
- Xampp para mysql
- MongoDB

## Atención

A la hora de montar la base de datos:
`npm run deploy-db`

Probablemente salte un error:  Validation error
Ejecutar tantas veces hasta que funcione:
`npm run refresh` (después de unas cuantas veces se realiza el seeding)

## Instalación
Para la instalación del proyecto deberemos de seguir los siguientes pasos.
- Añadiremos el archivo `.env` en el directorio llamado back.

- Crearemos una base de datos llamada `piscina`

- Desde la terminal entraremos en el directorio **back** y ejecutaremos el comando npm update para instalar todas las dependencias necesarias para el funcionamiento de la aplicación.
`npm update`

- Ejecutaremos el comando `npm run deploy-db` este comando refresca la base de datos, además lanza las migrations y los seeders.

- Para arrancar el Backend usaremos el comando `nodemon`.

- Desde la terminal entraremos en el directorio **front** y ejecutaremos de nuevo el comando `npm update`.

- Para arracar el servidor de Angular utilizaremos el comando `ng serve -o`
