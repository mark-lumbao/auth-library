# @mal/auth-library

> Date started: 6/19/2021

## Goal

1. **Create a reusable node authentication library with the stack below:**

    - Node
    - Fastify
    - JWT
    - BCrypt

2. **Also, create a front-end React module to interact with it in front-end.**

### Process Procedure

1. User signs-up
    - Client submit a POST request to `{host:port}/auth/login`.
    - Request will have to contain the following required payload:

     ```js
     {
       username: string      // unique
       emailaddress: string  // unique
       password: string      // plain-text-version
       // along with other business logic related payloads ...
     }
     ```

    - Server will first sanitize then validate the request body for security
    - Hash the password using bcrypt then store details in DB
    - At the same time, server will generate a session token jsonwebtoken
    - Lastly, send session token to client as a data in the response
