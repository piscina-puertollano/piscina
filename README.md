# Club de Natación

Aplicación diseñada para el Club de Natación de Puertollano.

## Requisitos
Debemos tener instaladas las siguientes herramientas:
- NodeJS.
- Angular 17.
- Xampp
- MongoDB

## Instalación
Para la instalación del proyecto deberemos de seguir los siguientes pasos.
- Añadiremos el archivo `.env` en el directorio llamado back.
- Crearemos una base de datos llamada `piscina`
- Desde la terminal entraremos en el directorio **back** y ejecutaremos el comando npm update para instalar todas las dependencias necesarias para el funcionamiento de la aplicación.
- Ejecutaremos el comando `npm run refresh` este comando refresca la base de datos, además lanza las migrations y los seeders.
- Para arrancar el Backend usaremos el comando `nodemon`.
- Desde la terminal entraremos en el directorio **front** y ejecutaremos de nuevo el comando `npm update`.
- Para arracar el servidor de Angular utilizaremos el comando `ng serve -o`