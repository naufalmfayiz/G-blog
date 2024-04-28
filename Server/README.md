[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=14451209&assignment_repo_type=AssignmentRepo)

# P2-Challenge-1 (Server Side)

# BlogC1 API Documentation

## Endpoints :

List of available endpoints:

- `POST /add-user`
- `POST /login`

- `POST /posts`
- `GET /posts`
- `GET /posts/:id`
- `PUT /posts/:id`
- `DELETE /posts/:id`

- `POST /categories`
- `GET /categories`
- `PUT /categories/:id`
- `DELETE /categories/:id`

- `GET /pub/posts`
- `GET /pub/posts/:id`

&nbsp;

## 1. POST /add-user

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  {
    "email": "string",
    "password": "string",
    "phoneNumber": "string",
    "address": "string"
  }
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "password length min. 5 character"
}
OR
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "Email already exists"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You are not authorized"
}
```

&nbsp;

## 2. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string",
  "email": "string",
  "role": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email/Password is required"
}
```

&nbsp;

## 3. POST /posts

Description:

- Create posts

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  {
    "title": "string",
    "content": "string",
    "imgUrl": "string",
    "categoryId": "integer"
}
}
```

_Response (201 - Created)_

```json
{
  {
    "post": {
        "id": "integer (required)",
        "title": "string",
        "content": "string",
        "imgUrl": "string",
        "categoryId": "integer",
        "authorId": "integer",
        "updatedAt": "date",
        "createdAt": "date"
    }
}
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "title is required"

}
OR
{
  "message": "content is required"
}
OR
{
  "message": "category is required"
}
```

&nbsp;

## 4. GET /posts

Description:

- Get all post from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "title": "The Ultimate Guide to Blogging",
    "content": "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "imgUrl": "https://example.com/image2.jpg",
    "categoryId": 2,
    "authorId": 1,
    "createdAt": "2024-03-29T06:29:56.189Z",
    "updatedAt": "2024-03-29T06:29:56.189Z",
    "User": {
      "id": 1,
      "email": "go@gmail.com",
      "role": "Admin",
      "phoneNumber": "0812345678",
      "address": "Jalan Bahagia 1 No.3",
      "createdAt": "2024-03-29T06:29:56.070Z",
      "updatedAt": "2024-03-29T06:29:56.070Z"
    }
  },
  {
    "id": 2,
    "title": "How to Monetize Your Blog",
    "content": "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "imgUrl": "https://example.com/image1.jpg",
    "categoryId": 2,
    "authorId": 2,
    "createdAt": "2024-03-29T06:29:56.189Z",
    "updatedAt": "2024-03-29T06:29:56.189Z",
    "User": {
      "id": 2,
      "email": "bro@gmail.com",
      "role": "Staff",
      "phoneNumber": "0812345677",
      "address": "Jalan Bahagia 1 No.5",
      "createdAt": "2024-03-29T06:29:56.168Z",
      "updatedAt": "2024-03-29T06:29:56.168Z"
    }
  },
  ...,
]
```

&nbsp;

## 5. GET /posts/:id

Description:

- Get post by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "id": "integer (required)",
  "title": "string",
  "content": "string",
  "imgUrl": "string",
  "categoryId": "integer",
  "authorId": "integer",
  "updatedAt": "date",
  "createdAt": "date",
  "User": {
    "id": "integer (required)",
    "email": "string",
    "role": "string",
    "phoneNumber": "string",
    "address": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found."
}
```

&nbsp;

## 6. PUT /posts/:id

Description:

- Edit post by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "id": "integer (required)",
  "title": "string",
  "content": "string",
  "imgUrl": "string",
  "categoryId": "integer",
  "authorId": "integer",
  "updatedAt": "date",
  "createdAt": "date"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "title is required"
}
OR
{
  "message": "content is required"
}
OR
{
  "message": "category is required"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found."
}
```

&nbsp;

## 7. DELETE /posts/:id

Description:

- Delete post by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "<post title> success to delete"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found."
}
```

&nbsp;

## 8. POST /categories

Description:

- Create category

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "name": "string"
}
```

_Response (201 - Created)_

```json
{
  "name": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "name is required"
}
```

&nbsp;

## 9. GET /categories

Description:

- Get all category from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
        "id": "integer (required)",
        "name": "string",
        "createdAt": "date",
        "updatedAt": "date"
    },
    {
        "id": "integer (required)",
        "name": "string",
        "createdAt": "date",
        "updatedAt": "date"
    },
  ...,
]
```

&nbsp;

## 10. PUT /categories/:id

Description:

- Edit category by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "id": "integer (required)",
  "name": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "name is required"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found."
}
```

&nbsp;

## 11. DELETE /categories/:id

Description:

- Delete category by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "<category name> deleted sucesfully"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found."
}
```

&nbsp;

## 12. GET pub//posts

Description:

- Get all post from database without authentication

_Response (200 - OK)_

```json
{
  "page": "integer",
  "data": "array",
  "totalData": "integer",
  "totalPage": "integer",
  "dataPerPage": "integer"
}
```

&nbsp;

## 13. GET pub/posts/:id

Description:

- Get post without authentication by id

Request:

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "id": "integer (required)",
  "title": "string",
  "content": "string",
  "imgUrl": "string",
  "categoryId": "integer",
  "authorId": "integer",
  "updatedAt": "date",
  "createdAt": "date"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found."
}
```

&nbsp;

## 14. GET /pub/categories

Description:

- Get all category without authentication from database

_Response (200 - OK)_

```json
[
  {
        "id": "integer (required)",
        "name": "string",
        "createdAt": "date",
        "updatedAt": "date"
    },
    {
        "id": "integer (required)",
        "name": "string",
        "createdAt": "date",
        "updatedAt": "date"
    },
  ...,
]
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Unauthenticated"
}
OR
{
  "message": "Invalid Email/Password"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
