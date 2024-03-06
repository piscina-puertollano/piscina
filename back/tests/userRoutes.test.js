const request = require('supertest');
const express = require('express');
const routes = require('../routes/users/userRoutes')
/**
 * @author: badr
 */
const app = express();
app.use(express.json());
app.use('/', routes);


describe('POST /login', () => {
  it('POST /login debería retornar un código 200 con token', async () => {
    
    const user = {
        email: "admin@piscina.com",
        password: "1234"
      }
      const response = await request(app).post('/login').send(user) 
      console.log(response.body)
      expect(response.statusCode).toBe(200);
      expect(response.body.token).toBeTruthy();

      const newUser = {
        firstName: "fernando",
        lastName: "zabe",
        email: "faranzabe@piscina.com",
        password: "1234",
        roles: [1]
      }

      //con token no tine que fallar - badr
      const response2 = await request(app).post('/user').send(newUser).set({'x-token':response.body.token})
      console.log(response2.body)
      expect(response2.statusCode).toBe(200);


    });


});

describe('POST /user', () => {
    //sin token tine que fallar - badr
    it('POST /user debería retornar un código 400', async () => {
      
      const user = {
          email: "admin@piscina.com",
          password: "1234"
        }
        const response = await request(app).post('/user').send(user) 
        console.log(response.body)
        expect(response.statusCode).toBe(401);
  
      });

      it('POST /user debe retornar 200', async () =>{

      })
  });
  
