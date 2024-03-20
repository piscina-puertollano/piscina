//Gonzalo Martinez Haro
const request = require('supertest');
const express = require('express');
const routes = require('../routes/events/eventoRoutes');

const app = express();
app.use(express.json());
app.use('/eventos', routes);

describe('Rutas de Eventos', () => {
  describe('GET /eventos', () => {
    it('debería devolver un código 200 y una lista de eventos', async () => {
      const response = await request(app).get('/eventos');
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
    });
  });

  describe('GET /eventos/visibles', () => {
    it('debería devolver un código 200 y una lista de eventos visibles', async () => {
      const response = await request(app).get('/eventos/visibles');
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
    });
  });

  describe('POST /eventos', () => {
    it('debería crear un nuevo evento y devolver un código 200', async () => {
      const nuevoEvento = {
        nombre: 'Evento Test',
        fecha: '2023-01-01',
        sede: 'Sede Test',
        categoria: 'Categoria Test',
        visible: true
      };
      const response = await request(app).post('/eventos').send(nuevoEvento);
      expect(response.statusCode).toBe(200);
    });
  });

  describe('PUT /eventos/:id', () => {
    it('debería actualizar un evento existente y devolver un código 200', async () => {
      const eventoActualizado = {
        nombre: 'Evento Actualizado',
        fecha: '2023-01-02',
        sede: 'Sede Actualizada',
        categoria: 'Categoria Actualizada',
        visible: false
      };
      // Asumiendo que existe un evento con id 1 -Gonzalo
      const response = await request(app).put('/eventos/1').send(eventoActualizado);
      expect(response.statusCode).toBe(200);
    });
  });

  describe('DELETE /eventos/:id', () => {
    it('debería eliminar un evento existente y retornar un código 200', async () => {
      // Asumiendo que existe un evento con id 1 para eliminar -Gonzalo
      const response = await request(app).delete('/eventos/1');
      expect(response.statusCode).toBe(200);
    });
  });
});