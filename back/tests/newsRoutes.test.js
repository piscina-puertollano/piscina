const request = require("supertest");
const express = require("express");
const routes = require("../routes/news/newsRoutes");
const routeUser = require("../routes/users/userRoutes");

/**
 * @author: badr
 */
const app = express();
app.use(express.json());
app.use("/", routes);
app.use("/", routeUser);

describe("POST /news", () => {
  it("POST /news debería retornar un código 200 y la noticia creada", async () => {
    const user = {
      email: "admin@piscina.com",
      password: "1234",
    };
    const response = await request(app).post("/login").send(user);
    console.log(response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeTruthy();

    const newNoticia = {
      title: "Test Jest",
      body: "Nueva noticia de test",
      id_user: 1,
      main_image: 1,
      category: "test",
    };

    //con token no tine que fallar
    const response2 = await request(app)
      .post("/new")
      .send(newNoticia)
      .set({ "x-token": response.body.token });
    expect(response2.statusCode).toBe(200);
    expect(response2.body.title).toBe("Test Jest");
  });

  it("POST /news debería retorna código 400 - error validador - body", async () => {
    const user = {
      email: "admin@piscina.com",
      password: "1234",
    };
    const response = await request(app).post("/login").send(user);
    console.log(response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeTruthy();

    //le falta el body, para comprobar el validador
    const newNoticia = {
      title: "Test Jest",
      id_user: 1,
      main_image: 1,
      category: "test",
    };

    //con token no tine que fallar
    const response2 = await request(app)
      .post("/new")
      .send(newNoticia)
      .set({ "x-token": response.body.token });
    expect(response2.statusCode).toBe(400);
  });
});

describe("PUT /new", () => {
  it("PUT /new debería retornar un código 200 y la noticia actualizada", async () => {
    const user = {
      email: "admin@piscina.com",
      password: "1234",
    };
    const response = await request(app).post("/login").send(user);
    console.log(response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeTruthy();

    const newNoticia = {
      title: "Test Jest",
      body: "Nueva noticia de test",
      id_user: 1,
      main_image: 1,
      category: "test",
    };

    const response2 = await request(app)
      .post("/new")
      .send(newNoticia)
      .set({ "x-token": response.body.token });
    expect(response2.statusCode).toBe(200);
    expect(response2.body.title).toBe("Test Jest");

    const response3 = await request(app)
      .put("/new/" + response2.body.id)
      .send({ title: "Test Jest actualizado" })
      .set({ "x-token": response.body.token });

    expect(response3.statusCode).toBe(200);
  });
});

describe("DELETE /new", () => {
  it("DELETE /news debería retornar un código 200 y la noticia eliminada", async () => {
    const user = {
      email: "admin@piscina.com",
      password: "1234",
    };
    const response = await request(app).post("/login").send(user);
    console.log(response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeTruthy();

    const newNoticia = {
      title: "Test Jest",
      body: "Nueva noticia de test",
      id_user: 1,
      main_image: 1,
      category: "test",
    };

    const response2 = await request(app)
      .post("/new")
      .send(newNoticia)
      .set({ "x-token": response.body.token });
    expect(response2.statusCode).toBe(200);
    expect(response2.body.title).toBe("Test Jest");

    //con token no tine que fallar
    const response3 = await request(app)
      .delete("/new/" + response2.body.id)
      .set({ "x-token": response.body.token });

    expect(response3.statusCode).toBe(200);
  });
});
