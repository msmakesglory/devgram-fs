# Posts API Documentation

This document provides details about the Posts API endpoints for the DevGram application.

## Base URL

```
/api/posts
```

## Endpoints

### Get All Posts

Retrieves a paginated list of posts.

- **URL**: `/api/posts?page=0&size=5`
- **Method**: `GET`
- **Query Parameters**:
    - `page` (optional): Page number (zero-based indexing). Default is 0.
    - `size` (optional): Number of items per page. Default is 10.
- **Response**:
    - `200 OK`: Returns a list of posts
    - `204 No Content`: If no posts are found

#### Response Body Example:

```json
[
  {
    "postId": "123e4567-e89b-12d3-a456-426614174000",
    "title": "Building a Spring Boot Application",
    "description": "Learn how to create a RESTful API with Spring Boot",
    "timestamp": "2025-04-24T10:30:00",
    "createdById": {
      "id": 1,
      "username": "john_doe",
      "email": "john@example.com"
    },
    "skillIds": [1, 2, 3],
    "collaboratorIds": ["123e4567-e89b-12d3-a456-426614174001"]
  }
]
```

### Get Post by ID

Retrieves a specific post by its ID.

- **URL**: `/api/posts/{id}`
- **Method**: `GET`
- **Path Parameters**:
    - `id`: UUID of the post
- **Response**:
    - `200 OK`: Returns the post details
    - `404 Not Found`: If post with the specified ID does not exist

#### Response Body Example:

```json
{
  "postId": "123e4567-e89b-12d3-a456-426614174000",
  "title": "Building a Spring Boot Application",
  "description": "Learn how to create a RESTful API with Spring Boot",
  "timestamp": "2025-04-24T10:30:00",
  "createdById": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com"
  },
  "skillIds": [1, 2, 3],
  "collaboratorIds": ["123e4567-e89b-12d3-a456-426614174001"]
}
```

### Create New Post

Creates a new post.

- **URL**: `/api/posts`
- **Method**: `POST`
- **Request Body**: PostReqDto object
- **Response**:
    - `200 OK`: Post created successfully
    - `400 Bad Request`: Failed to create post

#### Request Body Example:

```json
{
  "title": "New Post Title",
  "description": "Description of the new post",
  "skillIds": [1, 2, 3],
  "collaboratorIds": ["123e4567-e89b-12d3-a456-426614174001"]
}
```

### Update Post

Updates an existing post.

- **URL**: `/api/posts/{id}`
- **Method**: `PUT`
- **Path Parameters**:
    - `id`: UUID of the post to update
- **Request Body**: PostReqDto object
- **Response**:
    - `200 OK`: Post updated successfully
    - `400 Bad Request`: Failed to update post

#### Request Body Example:

```json
{
  "title": "Updated Post Title",
  "description": "Updated description of the post",
  "skillIds": [1, 2, 3],
  "collaboratorIds": ["123e4567-e89b-12d3-a456-426614174001"]
}
```

### Delete Post

Deletes a post.

- **URL**: `/api/posts/{id}`
- **Method**: `DELETE`
- **Path Parameters**:
    - `id`: UUID of the post to delete
- **Response**:
    - `200 OK`: Post deleted successfully
    - `400 Bad Request`: Failed to delete post