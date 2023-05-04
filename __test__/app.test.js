const app = require("../app");
const request = require("supertest");

// unit testing insert api
describe("POST /items", () => {
  it("returns status code 200 and inerts the user", async () => {
    const value = {
      prodtype: "book",
      prodname: "classmate",
      qty: 30,
      price: 40,
    };
    const res = await request(app).post("/items").send(value);
    expect(res.statusCode).toEqual(201);
  }, 10000);
  it("returns status code 500 if fail with message", async () => {
    const res = await request(app).post("/items").send({});
    expect(res.statusCode).toEqual(500);
    expect(res.body).toEqual({
      message:
        "item validation failed: price: Please enter price, qty: Please enter qty, prodname: Please enter prodname, prodtype: Please enter prodtype",
    });
  });
});

// unit testing fetch api
describe("GET /items", () => {
  it("returns status code 200 if pass", async () => {
    const res = await request(app).get("/items");
    expect(res.statusCode).toEqual(201);
  });
});

// unit testing update api for proper ID
describe("PUT /items", () => {
  it("returns status code 200 and updates user", async () => {
    const prodId = "645241aa8ee0a33d31daf30b";
    const update = { qty: 40 };
    const res = await request(app).put(`/items/${prodId}`).send(update);
    expect(res.statusCode).toEqual(201);
  });
});

// unit testing update api for improper ID
describe("PUT /items", () => {
  it("returns status code 404 if no id found", async () => {
    const prodId = "645239fb64ac14dc57ecfea7";
    const update = { qty: 40 };
    const res = await request(app).put(`/items/${prodId}`).send(update);
    expect(res.statusCode).toEqual(404);
  });
});
