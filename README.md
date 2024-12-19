# Assignment: Build a RESTful API using Node.js and Express 

## Objective
Create a simple RESTful API for managing a list of users. This assignment tests your understanding of routing, middleware, HTTP methods, status codes, error handling, and interaction with a data source.

---

## Requirements

### 1. Initialize a Node.js Project 
- Set up a new Node.js project.
- Install Express.

---

### 2. Define a REST API with the Following Routes 
- **GET /users**: Fetch the list of all users.
- **GET /users/:id**: Fetch details of a specific user by ID.
- **POST /user**: Add a new user.
- **PUT /user/:id**: Update details of an existing user.
- **DELETE /user/:id**: Delete a user by ID.

---

### 3. Sample User Object Structure
```json
{
    "id": "1",
    "firstName": "Anshika",
    "lastName": "Agarwal",
    "hobby": "Teaching"
}
```

---

## 4. Middleware

### Logging Middleware 
- Log details of each request, including:
  - HTTP method
  - URL
  - Status code

### Validation Middleware 
- Validate required fields (`firstName`, `lastName`, `hobby`) in the `POST` and `PUT` routes.
- Return a `400 Bad Request` response for invalid or missing input.

---

## 5. Error Handling 
- Return appropriate HTTP status codes:
  - `200 OK` for successful operations.
  - `201 Created` for resource creation.
  - `400 Bad Request` for invalid input.
  - `404 Not Found` for missing resources.
- Handle errors such as:
  - User not found (`404 Not Found`).
  - Invalid input (`400 Bad Request`).
- Respond with meaningful error messages.

---

## 6. Data Source
- Use an **in-memory data source** (an array) to store user information for simplicity.

---

## Submission Guidelines 

### Code Comments 
- Include clear, concise comments explaining the logic and functionality of your code.

### API Testing 
- Test your API using **Postman** or **ThunderClient**.
- Include screenshots of the test results as proof.

---

## Deliverables
1. A **zip folder** containing your code.
2. A **document** with screenshots of your API test results.

---