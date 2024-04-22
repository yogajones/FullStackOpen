/*
Against the principle of separation of concerns, a 2-in-1 test module
that contains tests for both blog and user related operations.
Running the tests from separate files with 'npm test -concurrency=1'
produces unexpected and variable errors, which hint that there is some
unwanted interference between the two test modules.
*/

const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const User = require("../models/user");
const helper = require("./test_helper");

let authHeader = null;

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);

  await User.deleteMany({});
  await api.post("/api/users").send({ username: "dumdum", password: "dummy" });
  const res = await api
    .post("/api/login")
    .send({ username: "dumdum", password: "dummy" });
  const token = res.body.token;
  authHeader = "Bearer " + token;
});

// BLOG-RELATED TESTS START HERE

describe("GET /api/blogs", () => {
  test("returns JSON content", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
  test("returns the correct number of blogs", async () => {
    const response = await api.get("/api/blogs");
    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });
  test("returns blogs with an id field", async () => {
    const response = await api.get("/api/blogs");
    const blogs = response.body;

    blogs.forEach((blog) => {
      assert.notStrictEqual(blog.id, undefined);
    });
  });
});

describe("POST /api/blogs", () => {
  const newBlog = {
    title: "Titles and such",
    author: "A. Author",
    url: "http://www.google.com/",
    likes: 0,
  };
  test("increases the number of returned blogs by one", async () => {
    await api
      .post("/api/blogs")
      .set("Authorization", authHeader)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");
    assert.strictEqual(response.body.length, helper.initialBlogs.length + 1);
  });
  test("adds the proper content to the database", async () => {
    await api
      .post("/api/blogs")
      .set("Authorization", authHeader)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");

    const blogTitles = response.body.map((r) => r.title);
    assert(blogTitles.includes("Titles and such"));

    const blogAuthor = response.body.map((r) => r.author);
    assert(blogAuthor.includes("A. Author"));
  });
  test("sets likes to 0 if undefined", async () => {
    const undefinedLikesBlog = {
      title: "Where are my likes?",
      author: "Another Author",
      url: "http://www.google.fi/",
    };
    await api
      .post("/api/blogs")
      .set("Authorization", authHeader)
      .send(undefinedLikesBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");
    const savedBlog = response.body.find(
      (b) => b.title === "Where are my likes?",
    );
    assert.strictEqual(savedBlog.likes, 0);
  });
  test("returns 400 if title or url is undefined", async () => {
    const blogWithOnlyAuthor = {
      author: "Lonely Author",
    };
    await api
      .post("/api/blogs")
      .set("Authorization", authHeader)
      .send(blogWithOnlyAuthor)
      .expect(400);
  });
  test("returns 401 if token not in request", async () => {
    const blogsAtStart = await api.get("/api/blogs");
    await api.post("/api/blogs").send(newBlog).expect(401);
    const blogsAtEnd = await api.get("/api/blogs");
    assert.strictEqual(blogsAtStart.length, blogsAtEnd.length);
  });
});

describe("DELETE /api/blogs/:id", () => {
  test("succesfully deletes existing blog", async () => {
    const newBlog = {
      title: "Titles and such",
      author: "A. Author",
      url: "http://www.google.com/",
      likes: 0,
    };
    const res = await api
      .post("/api/blogs")
      .set("Authorization", authHeader)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    const blogToDelete = res.body;

    const blogsAtStart = await helper.blogsInDB();
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", authHeader)
      .expect(204);
    const blogsAtEnd = await helper.blogsInDB();

    const contents = blogsAtEnd.map((r) => r.title);
    assert(!contents.includes(blogToDelete.title));

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1);
  });
  test("returns 400 if blog to delete does not exist", async () => {
    const nonExistingId =
      "ItIsHighlyUnlikelyThatAnIdLikeThisGotGeneratedByMongo";
    await api
      .delete(`/api/blogs/${nonExistingId}`)
      .set("Authorization", authHeader)
      .expect(400);
  });
});

describe("PUT /api/blogs/:id", () => {
  test("succesfully updates existing blog", async () => {
    const blogsAtStart = await helper.blogsInDB();
    const blogToUpdate = blogsAtStart[0];
    const likesInStart = blogToUpdate.likes;
    blogToUpdate.likes += 1;

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set("Authorization", authHeader)
      .send({ blogToUpdate })
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");
    const updatedBlog = response.body.find((b) => b.id === blogToUpdate.id);
    assert.strictEqual(updatedBlog.likes, likesInStart);
  });
  test("returns 401 if using invalid id", async () => {
    const nonExistingId =
      "ItIsHighlyUnlikelyThatAnIdLikeThisGotGeneratedByMongo";
    await api.put(`/api/blogs/${nonExistingId}`).expect(401);
  });
});

// USER-RELATED TESTS START HERE

describe("GET /api/users", () => {
  test("succesfully returns all users", async () => {
    const response = await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(response.body.length, helper.initialUsers.length);
  });
});

describe("POST /api/users", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    await User.insertMany(helper.initialUsers);
  });

  test("succesfully creates a new user", async () => {
    const usersAtStart = helper.initialUsers;
    const newUser = {
      username: "deedee",
      name: "Dee Dee",
      password: "doodoo",
    };
    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDB();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });
  test("enforces unique usernames", async () => {
    const duplicateUsername = {
      username: "root",
      password: "root",
    };
    const res = await api
      .post("/api/users")
      .send(duplicateUsername)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDB();
    assert(res.body.error.includes("username is already taken"));
    assert.strictEqual(usersAtEnd.length, helper.initialUsers.length);
  });
  test("enforces usernames to be at least 3 characters", async () => {
    const shortUsername = {
      username: "d",
      name: "Dee Dee",
      password: "doodoo",
    };
    await api.post("/api/users").send(shortUsername).expect(400);

    const usersAtEnd = await helper.usersInDB();
    assert.strictEqual(usersAtEnd.length, helper.initialUsers.length);

    const usernames = usersAtEnd.map((u) => u.username);
    assert.strictEqual(
      usernames.filter((u) => u === shortUsername.username).length,
      0,
    );
  });
  test("enforces passwords at least 3 characters long", async () => {
    const emptyPassword = {
      username: "tootoo",
      password: "",
    };
    const shortPassword = {
      username: "poopoo",
      password: "d2",
    };

    await api.post("/api/users").send(emptyPassword).expect(400);
    await api.post("/api/users").send(shortPassword).expect(400);

    const usersAtEnd = await helper.usersInDB();
    assert.strictEqual(usersAtEnd.length, helper.initialUsers.length);

    const usernames = usersAtEnd.map((u) => u.username);
    assert.strictEqual(usernames.includes(emptyPassword.username), false);
    assert.strictEqual(usernames.includes(shortPassword.username), false);
  });
});

after(async () => {
  await mongoose.connection.close();
});
