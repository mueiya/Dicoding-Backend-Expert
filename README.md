# Dicoding Backend Expert Project

This repository contains my submission for the "Menjadi Back-End Developer Expert" course on Dicoding Indonesia.

## Project Starter Features (Provided by Dicoding)

The starter project provided by Dicoding includes the following features:

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

In addition to the features provided by the starter project, the submission includes the following enhancements:

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

Before running the program, ensure that you have the following installed:

- Node.js
- npm (Node Package Manager)
- PostgreSQL

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

## Tech Stack Overview

- **Framework**: Hapi.js
- **Authentication**: JWT (JSON Web Tokens)
- **Database**: PostgreSQL
- **Encryption**: bcrypt
- **Environment Variables Management**: dotenv
- **Testing**: Jest (with integration for environment variables using dotenv), ESLint
- **Development Utilities**: nodemon, node-pg-migrate
- **Language**: JavaScript

## Testing API

To facilitate API testing, Dicoding provides a Postman Collection and Environment Test. You can download the files from the following link:

[Forum API V1 Postman Collection + Environment Test](https://github.com/dicodingacademy/a276-backend-expert-labs/raw/099-shared-content/shared-content/03-submission-content/01-Forum-API-V1/Forum%20API%20V1%20Test.zip)
