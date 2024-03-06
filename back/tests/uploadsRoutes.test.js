const request = require('supertest');
const express = require('express');
const routes = require('../routes/services/uploadsRoutes')
const path = require('path');
/**
 * @author: badr
 */
const app = express();
app.use(express.json());
app.use('/', routes);


/**
 * Este test no soy capaz de hacerlo funcionar,
 * me da error 404, y no llega al ni al middleware y mucho menos al controlador,
 * por el consolog, me da a entender que /api/file no existe,
 * 
 * error:       error: Error: cannot POST / (404)
          at Response.Object.<anonymous>.Response.toError (/home/badr/Escritorio/dev/project/piscina/back/node_modules/superagent/src/node/response.js:110:17)
          at Response.toError [as _setStatusProperties] (/home/badr/Escritorio/dev/project/piscina/back/node_modules/superagent/src/response-base.js:107:48)
          at new _setStatusProperties (/home/badr/Escritorio/dev/project/piscina/back/node_modules/superagent/src/node/response.js:41:8)
          at Test.Object.<anonymous>.Request._emitResponse (/home/badr/Escritorio/dev/project/piscina/back/node_modules/superagent/src/node/index.js:953:20)
          at IncomingMessage._emitResponse (/home/badr/Escritorio/dev/project/piscina/back/node_modules/superagent/src/node/index.js:1166:38)
          at IncomingMessage.emit (node:events:530:35)
          at endReadableNT (node:internal/streams/readable:1696:12)
          at processTicksAndRejections (node:internal/process/task_queues:82:21) 

 * No tiene sentido, porque en cualquier cliente me funciona,
 * Me he metido en todos los foros que se hable de jest y supertest, pero no he encontrado nada...
 * 
*/

describe('POST /files', () => {
  it('POST /files debería retornar un código 200 con id y ruta', async () => {
    
    const image = path.resolve(__dirname, `../uploads/test/test-hasbullah.jpg`);
    const response = await request(app).post('/api/file').set('folder','test').attach('archivo', image)
    console.log(response)
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');

    });
});


