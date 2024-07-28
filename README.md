# Hospyta Community API

This API allows you to manage posts and comments, including features like filtering posts by categories and timestamps, replying to comments, and ensuring that only the user who created a post or comment can delete or update it.

## Endpoints

### Posts

#### Create a Post

**URL**: `/posts`  
**Method**: `POST`  
**Authentication**: `Bearer Token`

**Request Body**:
```json
{
  "categoryId": 1,
  "image": "https://example.com/image.jpg",
  "content": "This is a post content"
}
```
Response:

```json

{
  "id": 1,
  "categoryId": 1,
  "userId": 1,
  "image": "https://example.com/image.jpg",
  "content": "This is a post content",
  "createdAt": "2024-07-28T00:20:58.600Z",
  "updatedAt": "2024-07-28T00:20:58.600Z"
}
```
Get All Posts
URL: /posts
Method: GET

Response:

```json

[
  {
    "id": 1,
    "categoryId": 1,
    "userId": 1,
    "image": "https://example.com/image.jpg",
    "content": "This is a post content",
    "createdAt": "2024-07-28T00:20:58.600Z",
    "updatedAt": "2024-07-28T00:20:58.600Z",
    "author": {
      "id": 1,
      "name": "Billy Hayes",
      "username": "john_doe",
      "picture": "http://placeimg.com/640/480",
      "email": "Pedro_Zieme39@gmail.com"
    },
    "category": {
      "id": 1,
      "name": "Handmade Rubber Ball"
    }
  }
]
```
Get a Post by ID
URL: /posts/:id
Method: GET

Response:

```json

{
  "id": 1,
  "categoryId": 1,
  "userId": 1,
  "image": "https://example.com/image.jpg",
  "content": "This is a post content",
  "createdAt": "2024-07-28T00:20:58.600Z",
  "updatedAt": "2024-07-28T00:20:58.600Z",
  "author": {
    "id": 1,
    "name": "Billy Hayes",
    "username": "john_doe",
    "picture": "http://placeimg.com/640/480",
    "email": "Pedro_Zieme39@gmail.com"
  },
  "category": {
    "id": 1,
    "name": "Handmade Rubber Ball"
  }
}
```
Update a Post by ID
URL: /posts/:id
Method: PATCH
Authentication: Bearer Token

Request Body:

```json

{
  "categoryId": 1,
  "image": "https://example.com/image.jpg",
  "content": "Updated post content"
}
```

Response:

```json

{
  "id": 1,
  "categoryId": 1,
  "userId": 1,
  "image": "https://example.com/image.jpg",
  "content": "Updated post content",
  "createdAt": "2024-07-28T00:20:58.600Z",
  "updatedAt": "2024-07-28T00:20:58.600Z"
}
```
Delete a Post by ID
URL: /posts/:id
Method: DELETE
Authentication: Bearer Token

Response:

```json

{
  "message": "Post successfully deleted"
}
```
Get Posts by Category
URL: /posts/category/:categoryId
Method: GET

Response:

```json

[
  {
    "id": 1,
    "categoryId": 1,
    "userId": 1,
    "image": "https://example.com/image.jpg",
    "content": "This is a post content",
    "createdAt": "2024-07-28T00:20:58.600Z",
    "updatedAt": "2024-07-28T00:20:58.600Z",
    "author": {
      "id": 1,
      "name": "Billy Hayes",
      "username": "john_doe",
      "picture": "http://placeimg.com/640/480",
      "email": "Pedro_Zieme39@gmail.com"
    },
    "category": {
      "id": 1,
      "name": "Handmade Rubber Ball"
    }
  }
]
```
Get Posts by Timestamp
URL: /posts/timestamp
Method: GET

Query Parameters:

start: Start timestamp in ISO format (e.g., 2024-07-01T00:00:00.000Z)
end: End timestamp in ISO format (e.g., 2024-07-31T23:59:59.999Z)
Response:

```json

[
  {
    "id": 1,
    "categoryId": 1,
    "userId": 1,
    "image": "https://example.com/image.jpg",
    "content": "This is a post content",
    "createdAt": "2024-07-28T00:20:58.600Z",
    "updatedAt": "2024-07-28T00:20:58.600Z",
    "author": {
      "id": 1,
      "name": "Billy Hayes",
      "username": "john_doe",
      "picture": "http://placeimg.com/640/480",
      "email": "Pedro_Zieme39@gmail.com"
    },
    "category": {
      "id": 1,
      "name": "Handmade Rubber Ball"
    }
  }
]
```
Comments
Create a Comment
URL: /comments
Method: POST
Authentication: Bearer Token

Request Body:

```json

{
  "postId": 1,
  "content": "This is a comment content",
  "parentId": null // or a comment ID if this is a reply
}
```
Response:

```json

{
  "id": 1,
  "postId": 1,
  "userId": 1,
  "content": "This is a comment content",
  "createdAt": "2024-07-28T00:20:58.600Z",
  "updatedAt": "2024-07-28T00:20:58.600Z",
  "parentId": null
}
```
Get All Comments for a Post
URL: /comments/post/:postId
Method: GET

Response:

```json

[
  {
    "id": 1,
    "postId": 1,
    "userId": 1,
    "content": "This is a comment content",
    "createdAt": "2024-07-28T00:20:58.600Z",
    "updatedAt": "2024-07-28T00:20:58.600Z",
    "parentId": null,
    "replies": [
      {
        "id": 2,
        "postId": 1,
        "userId": 2,
        "content": "This is a reply",
        "createdAt": "2024-07-28T01:00:00.000Z",
        "updatedAt": "2024-07-28T01:00:00.000Z",
        "parentId": 1
      }
    ]
  }
]
```
Update a Comment by ID
URL: /comments/:id
Method: PATCH
Authentication: Bearer Token

Request Body:

```json

{
  "content": "Updated comment content"
}
```
Response:

```json
{
  "id": 1,
  "postId": 1,
  "userId": 1,
  "content": "Updated comment content",
  "createdAt": "2024-07-28T00:20:58.600Z",
  "updatedAt": "2024-07-28T00:20:58.600Z",
  "parentId": null
}

```

Delete a Comment by ID
URL: /comments/:id
Method: DELETE
Authentication: Bearer Token

Response:

```json
{
  "message": "Comment successfully deleted"
}
```
Swagger Documentation
The API includes Swagger documentation for all endpoints. You can access it at /api-docs.