Posts API Documentation
This API provides endpoints for managing posts in a Spring Boot application. It supports CRUD operations for posts, including pagination, and handles associations with skills and collaborators. All endpoints are prefixed with /api/posts.
Base URL
/api/posts

Authentication

Authentication is not explicitly defined in the provided code. Ensure appropriate security configurations (e.g., JWT, OAuth2) are implemented as needed.

Endpoints
1. Get All Posts (Paginated)
   Retrieve a paginated list of all posts.

Method: GET
Path: /api/posts
Query Parameters:
page (optional, default: 0): Page number (0-based).
size (optional, default: 10): Number of posts per page.


Response:
200 OK: Returns a list of posts.
204 No Content: No posts found.


Response Body (JSON):[
{
"postId": "UUID",
"title": "String",
"description": "String",
"timestamp": "ISO-8601 DateTime",
"createdById": {
"id": "UUID",
// Other user fields as defined in UserResDto
},
"repoLink": "String",
"skillIds": [Long],
"collaboratorIds": ["UUID"]
}
]


Example Request:GET /api/posts?page=0&size=10


Example Response:[
{
"postId": "123e4567-e89b-12d3-a456-426614174000",
"title": "Project X",
"description": "A collaborative project",
"timestamp": "2025-04-24T10:00:00",
"createdById": {
"id": "223e4567-e89b-12d3-a456-426614174001"
},
"repoLink": "https://github.com/user/repo",
"skillIds": [1, 2],
"collaboratorIds": ["323e4567-e89b-12d3-a456-426614174002"]
}
]



2. Get Post by ID
   Retrieve a specific post by its ID.

Method: GET
Path: /api/posts/{id}
Path Parameters:
id: UUID of the post.


Response:
200 OK: Post found.
404 Not Found: Post does not exist.


Response Body (JSON):{
"postId": "UUID",
"title": "String",
"description": "String",
"timestamp": "ISO-8601 DateTime",
"createdById": {
"id": "UUID",
// Other user fields as defined in UserResDto
},
"repoLink": "String",
"skillIds": [Long],
"collaboratorIds": ["UUID"]
}


Example Request:GET /api/posts/123e4567-e89b-12d3-a456-426614174000


Example Response:{
"postId": "123e4567-e89b-12d3-a456-426614174000",
"title": "Project X",
"description": "A collaborative project",
"timestamp": "2025-04-24T10:00:00",
"createdById": {
"id": "223e4567-e89b-12d3-a456-426614174001"
},
"repoLink": "https://github.com/user/repo",
"skillIds": [1, 2],
"collaboratorIds": ["323e4567-e89b-12d3-a456-426614174002"]
}



3. Create a New Post
   Create a new post with associated skills and collaborators.

Method: POST
Path: /api/posts
Request Body (JSON):{
"title": "String",
"description": "String",
"createdById": "UUID",
"skillIds": [Long],
"newSkills": ["String"],
"repoLink": "String",
"collaboratorIds": ["UUID"]
}


Constraints:
title: Required, max 100 characters.
description: Required, max 500 characters.
skillIds: Optional, list of existing skill IDs.
newSkills: Optional, list of new skill names to create.
collaboratorIds: Optional, list of user UUIDs.


Response:
200 OK: Post created successfully.
400 Bad Request: Invalid input or creation failed.


Response Body (JSON):"Post created successfully."


Example Request:POST /api/posts
Content-Type: application/json
{
"title": "New Project",
"description": "A new collaborative project",
"createdById": "223e4567-e89b-12d3-a456-426614174001",
"skillIds": [1, 2],
"newSkills": ["Python"],
"repoLink": "https://github.com/user/new-repo",
"collaboratorIds": ["323e4567-e89b-12d3-a456-426614174002"]
}


Example Response:"Post created successfully."



4. Update a Post
   Update an existing post by its ID.

Method: PUT
Path: /api/posts/{id}
Path Parameters:
id: UUID of the post.


Request Body (JSON):{
"title": "String",
"description": "String",
"skillIds": [Long],
"newSkills": ["String"],
"repoLink": "String",
"collaboratorIds": ["UUID"]
}


Constraints:
Same as POST endpoint.


Response:
200 OK: Post updated successfully.
400 Bad Request: Invalid input or post not found.


Response Body (JSON):"Post updated successfully."


Example Request:PUT /api/posts/123e4567-e89b-12d3-a456-426614174000
Content-Type: application/json
{
"title": "Updated Project",
"description": "Updated description",
"skillIds": [1],
"newSkills": [],
"repoLink": "https://github.com/user/updated-repo",
"collaboratorIds": []
}


Example Response:"Post updated successfully."



5. Delete a Post
   Delete a post by its ID.

Method: DELETE
Path: /api/posts/{id}
Path Parameters:
id: UUID of the post.


Response:
200 OK: Post deleted successfully.
400 Bad Request: Post not found.


Response Body (JSON):"Post deleted successfully."


Example Request:DELETE /api/posts/123e4567-e89b-12d3-a456-426614174000


Example Response:"Post deleted successfully."



Error Handling

400 Bad Request: Invalid input data or operation failure.
404 Not Found: Resource (post) not found.
500 Internal Server Error: Unexpected server errors (not explicitly handled in the code).

Data Models
PostReqDto
{
"title": "String",
"description": "String",
"createdById": "UUID",
"skillIds": [Long],
"newSkills": ["String"],
"repoLink": "String",
"collaboratorIds": ["UUID"]
}

PostResDto
{
"postId": "UUID",
"title": "String",
"description": "String",
"timestamp": "ISO-8601 DateTime",
"createdById": {
"id": "UUID",
// Other user fields as defined in UserResDto
},
"repoLink": "String",
"skillIds": [Long],
"collaboratorIds": ["UUID"]
}

Notes

The createdById in PostReqDto is not used in the addNewPost method, as the createdBy field is set using myUserService.getUser(). Ensure the authenticated user is correctly set in the service.
The fix() method in PostReqDto initializes null lists to prevent NullPointerExceptions.
The API uses UUIDs for post and user IDs, and Longs for skill IDs.
Pagination is implemented using Spring Data's Pageable interface.
The repoLink field is optional and can be null.

Dependencies

Spring Boot
Spring Data JPA
Lombok (for annotations like @Data)
Hibernate (for ORM)

For further details, refer to the provided source code or contact the development team.
