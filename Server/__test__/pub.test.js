const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { hashedPassword } = require("../helper/bcrypt");
const { Post, User, Category } = require("../models");

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

    let categories = require("../data/categories.json").map((el) => {
      el.createdAt = el.updatedAt = new Date();
      return el;
    });
    await sequelize.queryInterface.bulkInsert("Categories", categories);
    // console.log(await Category.findAll())

    let posts = require("../data/posts.json").map((el) => {
      el.createdAt = el.updatedAt = new Date();
      return el;
    });
    await sequelize.queryInterface.bulkInsert("Posts", posts);
    // console.log(await Post.findAll())
  } catch (error) {
    console.log(error);
  }
});

//>>>>>>> GET PUBLIC POST DETAIL
describe("Testing GET pub/posts", () => {
  //>> SUCCESS ALL
  test("succes get pub posts", async () => {
    const response = await request(app).get(`/pub/posts/`);

    const { body, status } = response;

    expect(status).toBe(200);
    expect(body).toMatchObject({
      page: 1,
      data: expect.any(Array),
      totalData: 20,
      totalPage: 2,
      dataPerPage: 10,
    });
  });

  //>> SUCCESS ALL WITH FILTER
  test("succes get pub posts with filter", async () => {
    const response = await request(app).get(`/pub/posts/`).query({ filter: 1 });

    const { body, status } = response;

    expect(status).toBe(200);
    expect(body).toMatchObject({
      page: 1,
      data: expect.any(Array),
      totalData: 6,
      totalPage: 1,
      dataPerPage: 10,
    });
  });

  //>> SUCCESS ALL WITH PAGINATION
  test("succes get pub posts with pagination", async () => {
    const response = await request(app)
      .get(`/pub/posts/`)
      .query({
        page: {
          size: 3,
          number: 2,
        },
      });

    const { body, status } = response;
    console.log(body);
    expect(status).toBe(200);
    expect(body).toMatchObject({
      page: 2,
      data: expect.any(Array),
      totalData: 20,
      totalPage: 7,
      dataPerPage: 3,
    });
  });
});

//>>>>>>> GET PUBLIC POST DETAIL
describe("Testing GET pub/posts/:id", () => {
  //>>SUCCES GET PUBLIC DETAIL
  test("succes get public detail", async () => {
    let testId = 1;

    const response = await request(app).get(`/pub/posts/${testId}`);

    const { body, status } = response;

    expect(status).toBe(200);
    expect(body).toMatchObject({
      id: 1,
      title: "The Ultimate Guide to Blogging",
      content:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      imgUrl: "https://example.com/image2.jpg",
      categoryId: 2,
      authorId: 1,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  //>>NOT FOUND
  test("data not found", async () => {
    let testId = 23; //>> id more than data in database

    const response = await request(app).get(`/pub/posts/${testId}`);

    const { body, status } = response;

    expect(status).toBe(404);
    expect(body).toHaveProperty("message", "Data not found.");
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
