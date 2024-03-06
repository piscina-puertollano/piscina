/**
 * @author Marina Laguna
 */
const request = require('supertest');
const express = require('express');
const routesEjercicioEntrenamiento = require('../routes/training/ejercicioEntrenamientosRoutes');

const app = express();
app.use(express.json());
app.use('/ejercicio-entrenamientos', routesEjercicioEntrenamiento);

describe('Rutas de EjercicioEntrenamientos ', () => {
    let token;

    beforeAll(() => {
        token = 'tokenAqui';
    })

    it('GET / debería retornar los entrenamientos y código 200 con token', async () => {
        const response = await request(app)
            .get('/ejercicioEntrenamiento')
            .set('Authorization', `Bearer ${token}`)
            .expect(response).toBe(200);
    });

    it('GET /:id deberia de retornar el entrenamiento correspondiente al id y código 200 con token', async () => {
        const id = 1;
        const response = await request(app)
            .get(`/ejercicioEntrenamiento/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(response).toBe(200);
    });

    it('POST /crear-entrenamientos debe retornar el entrenamiento creado y e¡código 200 con token', async () => {
        const entrenamiento = {
            nombre: "Nombre del entrenamiento de prueba",
            descripcion: "Descripción del entrenamiento de prueba",
            ejercicios: [
                {
                    descripcion: "Descripción del 1 ejercicio",
                    idTipo: 1
                },
                {
                    descripcion: "Descripción del 2 ejercicio",
                    idTipo: 2 
                },
                {
                    descripcion: "Descripción del 3 ejercicio",
                    idTipo: 3
                }
            ]
        }

        const response = await request(app)
            .post('/ejercicioEntrenamiento/crear-entrenamiento')
            .set('Authorization', `Bearer ${token}`)
            .send(entrenamiento)
            .expect(response).toBe(200)
    });

    it('PUT /:id deberia de retornar el entrenamiento modificado y código 200 con token', async () => {
        const id = 1;
        const updatedEntrenamiento = {
            nombre: "Nombre del entrenamiento actualizado",
            descripcion: "Descripción del entrenamiento actualizado",
        };
    
        const response = await request(app)
            .put(`/ejercicio-entrenamientos/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedEntrenamiento)
            .expect(200);
    });

    it('DELETE /:id deberia de retornar un mensaje de que el entrenamiento ha sido eliminado y código 200 con token', async () => {
        const id = 1; 
    
        const response = await request(app)
            .delete(`/ejercicio-entrenamientos/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
    });
})