const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { hashedPassword } = require("../helper/bcrypt");
const { Post, User, Category } = require("../models");

let adminToken;
let staffToken;
//>>>> BEFORE <<<<
beforeAll(async () => {
  try {
    let users = require("../data/users.json").map((perData) => {
      perData.password = hashedPassword(perData.password);
      perData.createdAt = perData.updatedAt = new Date();
      return perData;
    });
    // console.log(users)
    await sequelize.queryInterface.bulkInsert("Users", users);

    let cat = await Category.create({
      name: "News",
    });
    // console.log(await Category.findAll())

    let post = await Post.create({
      title: "Ini bencana banget",
      content:
        "semua takkan hilang dengan semudah itu, banyak berdoa dan beribadah agar sehat dan selamat",
      imgUrl:
        "https://res.cloudinary.com/dmyrcfkr6/image/upload/v1711545444/BlogC1/0-8MM-EN10111-DD13-hot-rolled-carbon.jpg_350x350.jpg.jpg",
      categoryId: 1,
      authorId: 1,
    });
    // console.log(await Post.findAll())
  } catch (error) {
    console.log(error.message);
  }
});

//>>>>>>>>> LOGIN
describe("Testing POST /login", () => {
  //>>SUCCESS LOGIN
  test("success login", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: "go@gmail.com", password: "12345" });
    const { body, status } = response;
    adminToken = body.access_token;

    const responseStaff = await request(app)
      .post("/login")
      .send({ email: "bro@gmail.com", password: "54321" });
    staffToken = responseStaff.body.access_token;

    expect(status).toBe(200);
    expect(body).toMatchObject({
      access_token: expect.any(String),
      email: expect.any(String),
      role: expect.any(String),
    });
  });

  //>> EMAIL NOT INPUT
  test("not inputted email", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: "", password: "12345" });

    const { body, status } = response;

    expect(status).toBe(400);
    expect(body).toHaveProperty("message", "Email/Password is required");
  });

  //>> PASSWORD NOT INPUT
  test("not inputted password", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: "go@gmail.com", password: "" });

    const { body, status } = response;

    expect(status).toBe(400);
    expect(body).toHaveProperty("message", "Email/Password is required");
  });

  //>> INVALID EMAIL
  test("invalid email", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: "aSD@gmail.com", password: "12345" });

    const { body, status } = response;

    expect(status).toBe(401);
    expect(body).toHaveProperty("message", "Invalid Email/Password");
  });

  //>> INVALID PASSWORD
  test("invalid password", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: "go@gmail.com", password: "qweqwe" });

    const { body, status } = response;

    expect(status).toBe(401);
    expect(body).toHaveProperty("message", "Invalid Email/Password");
  });
});

//>>>>>>> CREATE POST
describe("Testing POST /posts", () => {
  //>> SUCCESS
  test("success create posts", async () => {
    let dataInsert = {
      title: "Wakwakur",
      content:
        "semua hilang dengan mudah, kaw kaw banyak berdoa dan beribadah agar sehat dan selamat",
      imgUrl:
        "https://i.insider.com/5cf1b2d34cf2701b9c640ffa?width=800&format=jpeg&auto=webp",
      categoryId: 1,
      authorId: 1,
    };

    const response = await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(dataInsert);

    const { body, status } = response;

    expect(status).toBe(201);
    expect(body).toMatchObject({
      post: {
        id: 2,
        title: "Wakwakur",
        content:
          "semua hilang dengan mudah, kaw kaw banyak berdoa dan beribadah agar sehat dan selamat",
        imgUrl:
          "https://i.insider.com/5cf1b2d34cf2701b9c640ffa?width=800&format=jpeg&auto=webp",
        categoryId: 1,
        authorId: 1,
        updatedAt: expect.any(String),
        createdAt: expect.any(String),
      },
    });
  });

  //>> NOT LOGGED IN
  test("not logged in", async () => {
    let dataInsert = {
      title: "Wakwakur",
      content:
        "semua hilang dengan mudah, kaw kaw banyak berdoa dan beribadah agar sehat dan selamat",
      imgUrl:
        "https://i.insider.com/5cf1b2d34cf2701b9c640ffa?width=800&format=jpeg&auto=webp",
      categoryId: 1,
      authorId: 1,
    };

    const response = await request(app).post("/posts").send(dataInsert); //<< without authorization

    const { body, status } = response;

    expect(status).toBe(401);
    expect(body).toHaveProperty("message", "Unauthenticated");
  });

  ///>> INVALID TOKEN
  test("invalid token", async () => {
    let dataInsert = {
      title: "Wakwakur",
      content:
        "semua hilang dengan mudah, kaw kaw banyak berdoa dan beribadah agar sehat dan selamat",
      imgUrl:
        "https://i.insider.com/5cf1b2d34cf2701b9c640ffa?width=800&format=jpeg&auto=webp",
      categoryId: 1,
      authorId: 1,
    };

    const response = await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${adminToken}123`) //<< add random char
      .send(dataInsert);

    const { body, status } = response;

    expect(status).toBe(401);
    expect(body).toHaveProperty("message", "Unauthenticated");
  });

  ///>> INVALID INPUT
  test("invalid input", async () => {
    let dataInsert = {
      title: "",
      content: "",
      imgUrl:
        "https://i.insider.com/5cf1b2d34cf2701b9c640ffa?width=800&format=jpeg&auto=webp",
      categoryId: "",
      authorId: 1,
    };

    const response = await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(dataInsert);

    const { body, status } = response;

    expect(status).toBe(400);
    expect(body).toMatchObject({
      message: [
        "title is required",
        "content is required",
        "category is required",
      ],
    });
  });
});

//>>>>>>> UPDATE POST
describe("Testing PUT /posts/:id", () => {
  //>> SUCCESS UPDATE
  test("success update posts", async () => {
    let testId = 1;
    let dataInsert = {
      title: "TEST UPDATE",
      content:
        "semua takkan hilang dengan semudah itu, banyak berdoa dan beribadah agar sehat dan selamat",
      imgUrl:
        "https://res.cloudinary.com/dmyrcfkr6/image/upload/v1711545444/BlogC1/0-8MM-EN10111-DD13-hot-rolled-carbon.jpg_350x350.jpg.jpg",
      categoryId: 1,
      authorId: 1,
    };

    const response = await request(app)
      .put(`/posts/${testId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send(dataInsert);

    const { body, status } = response;

    expect(status).toBe(200);
    expect(body).toMatchObject({
      post: {
        id: 1,
        title: "TEST UPDATE",
        content:
          "semua takkan hilang dengan semudah itu, banyak berdoa dan beribadah agar sehat dan selamat",
        imgUrl:
          "https://res.cloudinary.com/dmyrcfkr6/image/upload/v1711545444/BlogC1/0-8MM-EN10111-DD13-hot-rolled-carbon.jpg_350x350.jpg.jpg",
        categoryId: 1,
        authorId: 1,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    });
  });

  //>> NOT LOGGED IN
  test("not logged in", async () => {
    let testId = 1;
    let dataInsert = {
      title: "TEST UPDATE",
      content:
        "semua takkan hilang dengan semudah itu, banyak berdoa dan beribadah agar sehat dan selamat",
      imgUrl:
        "https://res.cloudinary.com/dmyrcfkr6/image/upload/v1711545444/BlogC1/0-8MM-EN10111-DD13-hot-rolled-carbon.jpg_350x350.jpg.jpg",
      categoryId: 1,
      authorId: 1,
    };

    const response = await request(app)
      .put(`/posts/${testId}`) //>> no .set authorization
      .send(dataInsert);

    const { body, status } = response;

    expect(status).toBe(401);
    expect(body).toHaveProperty("message", "Unauthenticated");
  });

  //>> INVALID TOKEN
  test("invalid token", async () => {
    let testId = 1;
    let dataInsert = {
      title: "TEST UPDATE",
      content:
        "semua takkan hilang dengan semudah itu, banyak berdoa dan beribadah agar sehat dan selamat",
      imgUrl:
        "https://res.cloudinary.com/dmyrcfkr6/image/upload/v1711545444/BlogC1/0-8MM-EN10111-DD13-hot-rolled-carbon.jpg_350x350.jpg.jpg",
      categoryId: 1,
      authorId: 1,
    };

    const response = await request(app)
      .put(`/posts/${testId}`)
      .set("Authorization", `Bearer ${adminToken}123`) //>> add random char
      .send(dataInsert);

    const { body, status } = response;

    expect(status).toBe(401);
    expect(body).toHaveProperty("message", "Unauthenticated");
  });

  //>> DATA NOT FOUND
  test("data not found", async () => {
    let testId = 23; //>> id more than data in database
    let dataInsert = {
      title: "TEST UPDATE",
      content:
        "semua takkan hilang dengan semudah itu, banyak berdoa dan beribadah agar sehat dan selamat",
      imgUrl:
        "https://res.cloudinary.com/dmyrcfkr6/image/upload/v1711545444/BlogC1/0-8MM-EN10111-DD13-hot-rolled-carbon.jpg_350x350.jpg.jpg",
      categoryId: 1,
      authorId: 1,
    };

    const response = await request(app)
      .put(`/posts/${testId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send(dataInsert);

    const { body, status } = response;

    expect(status).toBe(404);
    expect(body).toHaveProperty("message", "Data not found.");
  });

  //>> UNAUTHORIZED
  test("unauthorized", async () => {
    let testId = 1;
    let dataInsert = {
      title: "TEST UPDATE",
      content:
        "semua takkan hilang dengan semudah itu, banyak berdoa dan beribadah agar sehat dan selamat",
      imgUrl:
        "https://res.cloudinary.com/dmyrcfkr6/image/upload/v1711545444/BlogC1/0-8MM-EN10111-DD13-hot-rolled-carbon.jpg_350x350.jpg.jpg",
      categoryId: 1,
      authorId: 1,
    };

    const response = await request(app)
      .put(`/posts/${testId}`)
      .set("Authorization", `Bearer ${staffToken}`)
      .send(dataInsert);

    const { body, status } = response;

    expect(status).toBe(403);
    expect(body).toHaveProperty("message", "You are not authorized");
  });

  //>> INVALID INPUT
  test("invalid input", async () => {
    let testId = 1;
    let dataInsert = {
      title: "",
      content: "",
      imgUrl:
        "https://res.cloudinary.com/dmyrcfkr6/image/upload/v1711545444/BlogC1/0-8MM-EN10111-DD13-hot-rolled-carbon.jpg_350x350.jpg.jpg",
      categoryId: "",
      authorId: 1,
    };

    const response = await request(app)
      .put(`/posts/${testId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send(dataInsert);

    const { body, status } = response;

    expect(status).toBe(400);
    expect(body).toMatchObject({
      message: [
        "title is required",
        "content is required",
        "category is required",
      ],
    });
  });
});

//>>>>>>> DELETE POST
describe("Testing DELETE /posts/:id", () => {
  //>> SUCCESS DELETE
  test("success delete post", async () => {
    let testId = 1;
    const post = await Post.findByPk(testId);

    const response = await request(app)
      .delete(`/posts/${testId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    const { body, status } = response;

    expect(status).toBe(200);
    expect(body).toHaveProperty("message", `${post.title} success to delete`);
  });

  //>> NOT LOGGED IN
  test("not logged in", async () => {
    let testId = 1;
    const post = await Post.findByPk(testId);

    const response = await request(app).delete(`/posts/${testId}`); //>> no .set authorization

    const { body, status } = response;

    expect(status).toBe(401);
    expect(body).toHaveProperty("message", "Unauthenticated");
  });

  //>> INVALID TOKEN
  test("invalid token", async () => {
    let testId = 1;
    const post = await Post.findByPk(testId);

    const response = await request(app)
      .delete(`/posts/${testId}`)
      .set("Authorization", `Bearer ${adminToken}123`); //>> add random char

    const { body, status } = response;

    expect(status).toBe(401);
    expect(body).toHaveProperty("message", "Unauthenticated");
  });

  //>> DATA NOT FOUND
  test("data not found", async () => {
    let testId = 23; //>> id more than data in database
    const post = await Post.findByPk(testId);

    const response = await request(app)
      .delete(`/posts/${testId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    const { body, status } = response;

    expect(status).toBe(404);
    expect(body).toHaveProperty("message", "Data not found.");
  });

  //>> UNAUTHORIZED
  test("unauthorized", async () => {
    let testId = 2;
    const post = await Post.findByPk(testId);

    const response = await request(app)
      .delete(`/posts/${testId}`)
      .set("Authorization", `Bearer ${staffToken}`);

    const { body, status } = response;

    expect(status).toBe(403);
    expect(body).toHaveProperty("message", "You are not authorized");
  });
});

//>>>> AFTER <<<<
afterAll(async () => {
  try {
    await sequelize.queryInterface.bulkDelete("Users", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
    await sequelize.queryInterface.bulkDelete("Categories", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
    await sequelize.queryInterface.bulkDelete("Posts", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  } catch (error) {
    console.log(error);
  }
});
