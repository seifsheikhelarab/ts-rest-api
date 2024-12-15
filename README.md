# User Auth REST API with TS

A TypeScript-based REST API for user authentication and management with JWT-based authentication, bcrypt password hashing, and secure session handling.

## Features

- **User Registration and Login**: Allows users to register and log in, with password hashing and JWT-based session tokens.
- **JWT Authentication**: Routes protected by JWT authentication middleware.
- **User Management**: Users can be created, updated, and deleted through the API.
- **Session Tokens**: Uses JWT for maintaining secure user sessions.
- **Database**: MongoDB is used for persistent data storage.

## Requirements

- Node.js
- MongoDB (for data storage)

## Installation

### 1. Clone the repository:

```bash
git clone https://github.com/seifsheikhelarab/ts-rest-api.git
cd ts-rest-api
```

### 2. Install dependencies:

```bash
npm install
```

### 3. Set up environment variables:

Create a `.env` file in the root of the project and add the following environment variables:

```bash
PORT=8080           
MONGO_URL=mongodb://localhost:27017/yourdbname
NODE_ENV = DEVELOPMENT 
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION = exp_time_in_ms
```

### 4. Start the application:

To run the application in development mode:

```bash
npm run dev
```

The server will start on `http://localhost:8080` (or any port you configure in `.env`).

## API Endpoints

### Authentication

- **POST `/auth/register`**: Register a new user.
  
  **Request body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "username": "user123"
  }
  ```

  **Response**:
  ```json
  {
    "_id": "user-id",
    "email": "user@example.com",
    "username": "user123",
    "authentication": {
      "password": "hashed-password",
      "sessionToken": "jwt-token"
    }
  }
  ```

- **POST `/auth/login`**: Log in to get a valid token.

  **Request body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

  **Response**:
  ```json
  {
    "authentication": {
        "password": "hashedpassword"
    },
    "_id": "id",
    "username": "username",
    "email": "example@gmail.com",
    "__v": 0
  }
  ```

### User Management

- **GET `/users`**: Get a list of all users. (Protected route)

  **Response**:
  ```json
  [
    {
      "_id": "user-id",
      "email": "user@example.com",
      "username": "user123",
      "authentication": {
        "password": "hashed-password",
        "sessionToken": "jwt-token"
      }
    }
  ]
  ```



- **PATCH `/users/:id`**: Update a user's details (only if the logged-in user is the owner).

  **Request body**:
  ```json
  {
    "username": "newUsername"
  }
  ```

  **Response**:
  ```json
  {
    "_id": "user-id",
    "email": "user@example.com",
    "username": "newUsername",
    "authentication": {
      "password": "hashed-password",
      "sessionToken": "jwt-token"
    }
  }
  ```

- **DELETE `/users/:id`**: Delete a user (only if the logged-in user is the owner).

  **Response**:
  ```json
  {
    "_id": "user-id",
    "username": "Username",
    "email": "example1@gmail.com",
    "__v": 0
  }

## Postman Collection

For easier usage and testing of the API, I have included a Postman collection. This collection contains all the necessary API endpoints along with sample requests and responses to help you interact with the application without needing to manually configure each request.

### How to Use the Postman Collection:
1. Download the [Postman Collection](https://github.com/seifsheikhelarab/postman_collection/ts-rest-api.postman_collection.json) file.
2. Import the collection into Postman by clicking on **Import** in the top-left corner of the Postman app and selecting the collection file.
3. Ensure your API server is running locally (or on the specified environment).
4. Use the pre-configured endpoints in Postman to test the API.

The collection includes:
- **Authentication Endpoints**: Register, login, and obtain a JWT token.
- **User Endpoints**: Get all users, update user details, and delete users.
- **Error Handling**: Examples of responses for invalid or expired tokens.

By using the Postman collection, you can quickly test and interact with the API, making development and debugging more efficient.



## Middleware

### isAuthenticated

This middleware ensures that the user is authenticated by checking the JWT token in the cookies. If valid, it attaches the user identity to the `req` object.

### isOwner

This middleware ensures that the user is trying to update or delete their own data. It compares the logged-in user's ID to the ID in the route parameters.


## Error Handling

The API returns appropriate HTTP status codes and JSON error messages in case of failure:

- **400**: Bad Request (e.g., invalid input)
- **401**: Unauthorized (e.g., invalid token)
- **403**: Forbidden (e.g., unauthorized access)
- **404**: Not Found (e.g., missing token)
- **500**: Internal Server Error

## Modules Used

### 1. `dotenv`
- **Functionality**: Loads environment variables from a `.env` file into `process.env`, allowing you to securely manage sensitive data like API keys and database credentials.
  
### 2. `express`
- **Functionality**: Web framework for building the REST API. It handles HTTP requests, routes, middleware, and responses.

### 3. `http`
- **Functionality**: Provides Node.js's built-in HTTP server functionality, used to create and manage the server for the application.

### 4. `body-parser`
- **Functionality**: Middleware used to parse incoming request bodies in JSON format. This is necessary for handling POST requests with JSON data.

### 5. `cookie-parser`
- **Functionality**: Middleware for parsing cookies attached to the request. It is used to retrieve the JWT token from the cookies in order to authenticate requests.

### 6. `compression`
- **Functionality**: Middleware for gzip compression, reducing the size of the response body, improving API performance by minimizing the data transferred over the network.

### 7. `cors`
- **Functionality**: Cross-Origin Resource Sharing (CORS) middleware, allowing or restricting resources to be requested from another domain. It helps prevent security risks when making cross-origin requests.

### 8. `mongoose`
- **Functionality**: ODM (Object Data Modeling) library for MongoDB, used to define schemas and interact with the MongoDB database. It simplifies database operations and queries.

### 9. `morgan`
- **Functionality**: HTTP request logger middleware for logging requests in the console. It helps monitor and debug the API by providing a log of incoming requests.

### 10. `bcrypt`
- **Functionality**: A library for hashing and comparing passwords securely. It is used to hash passwords before storing them in the database and to compare plain-text passwords during login.

### 11. `crypto`
- **Functionality**: Built-in Node.js module used for generating secure random values, such as random strings for session tokens.

### 12. `jsonwebtoken`
- **Functionality**: Used for creating and verifying JSON Web Tokens (JWT). It enables authentication by issuing a JWT upon login and validating the token for protected routes.

### 13. `lodash`
- **Functionality**: A utility library providing helper functions for common tasks like deep object merging, getting nested values, and performing operations on collections.

### 14. `express-async-handler`
- **Functionality**: Simplifies error handling in asynchronous Express routes by wrapping functions in a try/catch block, automatically passing errors to the next middleware.

---

Each of these modules contributes to the structure and functionality of your API, making it easier to implement secure authentication, database interactions, and efficient API responses.

