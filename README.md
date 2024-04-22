# Dicoding Backend Expert Project

🚀 This repository contains my submission for the "Menjadi Back-End Developer Expert" course on Dicoding Indonesia.

## Project Starter Features (Provided by Dicoding)

🛠️ The starter project provided by Dicoding includes the following features:

- **User Authentication**
  - User registration, login, refresh access token, and logout functionalities are available.
  - Access to these features does not require additional authentication tokens.

- **Complete Testing**
  - The starter project includes comprehensive testing with 100% test coverage.
  - Testing covers all functionalities provided by the starter project.

- **Environment Configuration**
  - Configuration files such as `.env` are provided to facilitate environment setup.
  - Database testing configurations are included for easy testing setup.

## Features

🌟 In addition to the features provided by the starter project, the submission includes the following enhancements:

1. **Thread Creation**
   - Users can add new threads with a title and body content.
   - Access to this feature requires a valid access token.
   - Incomplete or incorrect requests are handled with appropriate status codes and error messages.

2. **Commenting on Threads**
   - Users can add comments to existing threads.
   - Access to this feature also requires a valid access token.
   - Non-existing or invalid threads result in proper error handling.

3. **Deleting Comments**
   - Users can delete their own comments on threads.
   - Only the comment owner can delete their comment.
   - Soft deletion is implemented, retaining data integrity.

4. **Viewing Thread Details**
   - Users can view detailed information about a thread.
   - No access token required for this feature.
   - Proper handling for non-existing or invalid threads.

5. **Optional Features for Forum API**

    - **Adding Replies to Thread Comments**
      - Users can add replies to comments on threads.
      - Access to this feature requires a valid access token.
      - Proper error handling for non-existing or invalid threads/comments.
      - Replies are displayed within the respective comment item when accessing thread details.

    - **Deleting Replies to Thread Comments**
      - Users can delete their own replies to comments on threads.
      - Only the reply owner can delete their reply.
      - Soft deletion is implemented, retaining data integrity.

6. **Automation Testing**
   - Unit testing is implemented for business logic in Entities and Use Cases.
   - Integration testing ensures database interactions are functioning correctly.

7. **Clean Architecture**
   - Source code is organized into four layers: Entities, Use Case, Interface Adapter, and Frameworks.
   - This architecture ensures separation of concerns and maintainability.

## Running the Program

🚀 Before running the program, ensure that you have the following installed:

- Node.js
- npm (Node Package Manager)
- PostgreSQL

### Setting Up Environment Variables

Before running the program, make sure to set up the environment variables. Create a `.env` file in the root directory of your project and populate it with the desired variables, here's the example:

```plaintext
# HTTP SERVER
HOST=localhost
PORT=8000

# POSTGRES
PGHOST=localhost
PGUSER=developer
PGDATABASE=forumapi
PGPASSWORD=supersecretpassword
PGPORT=5432

# POSTGRES TEST
PGHOST_TEST=localhost
PGUSER_TEST=developer
PGDATABASE_TEST=forumapi_test
PGPASSWORD_TEST=supersecretpassword
PGPORT_TEST=5432

# TOKENIZE
ACCESS_TOKEN_KEY=8b7b4ef375716ab08b2a3951b29d52fc00b1c855f9d1a847229b8c5935bef56d9d271e76a9cf08e614300395c3b90ebe559cf968a0741b18c9505549394b2c70
REFRESH_TOKEN_KEY=5078605e074a462b1460608fcbe0d0963c644402e04ad334455ff5a856cb43fd99825861dde02957d5e3184c90c532ca7d0249df20fe93d535632f3d11be7bad
ACCCESS_TOKEN_AGE=3000
```

⚠️ Replace the values with your desired configuration. Ensure that you have created the respective database and user in PostgreSQL manually.

### Setting Up Test Database

To enable testing with Jest, create a config/database/test.json file with the following content:

```json
{
  "user": "developer",
  "password": "supersecretpassword",
  "host": "localhost",
  "port": 5432,
  "database": "forumapi_test"
}
```
⚠️ Replace the values with your actual database credentials for the test environment.

### Running Migrations

Before starting the server, you need to run the database migrations. Use the following commands:

```bash
npm run migrate up
```

This command will run the migrations to set up the database schema.

### Running the Server

To run the program, follow these steps:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

3. For development with auto-reload, use:
   ```bash
   npm run start:dev
   ```

By following these steps, you'll be able to set up the environment, run the migrations, and start the server for your project.

⚠️ Make sure to replace the placeholder values in the `.env` example with your actual database credentials and keys.

⚠️ When they the program run with `npm run start:dev`, it's not using the test database environment.

## Tech Stack Overview

- 💻 **Framework**: Hapi.js
- 🔐 **Authentication**: JWT (JSON Web Tokens)
- 🛢️ **Database**: PostgreSQL
- 🔒 **Encryption**: bcrypt
- 🔧 **Environment Variables Management**: dotenv
- 🧪 **Testing**: Jest (with integration for environment variables using dotenv), ESLint
- 🛠️ **Development Utilities**: nodemon, node-pg-migrate
- 📝 **Language**: JavaScript

## Testing API

🧪 To facilitate API testing, Dicoding provides a Postman Collection and Environment Test. You can download the files from the following link:

[Forum API V1 Postman Collection + Environment Test](https://github.com/dicodingacademy/a276-backend-expert-labs/raw/099-shared-content/shared-content/03-submission-content/01-Forum-API-V1/Forum%20API%20V1%20Test.zip)
