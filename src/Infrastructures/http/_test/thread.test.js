const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const AuthenticationsMockHelper = require('../../../../tests/AuthenticationsMockHelper');
const pool = require('../../database/postgres/pool');
const createServer = require('../createServer');
const container = require('../../container');

describe('/threads endpoint', () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
  });

  describe('when POST /threads', () => {
    describe('AuthorizationError', () => {
      it('should respond with 401 and throw AuthorizationError when not given authentication', async () => {
        // Arrange
        const requestPayload = {
          title: 'Thread Title',
          body: 'Thread Body',
        };

        const server = await createServer(container);

        // Action
        const response = await server.inject({
          method: 'POST',
          url: '/threads',
          payload: requestPayload,
          headers: {},
        });

        // Assert
        const responseJson = JSON.parse(response.payload);
        expect(response.statusCode).toEqual(401);
        expect(responseJson.error).toEqual('Unauthorized');
        expect(responseJson.message).toEqual('Missing authentication');
      });
    });

    describe('ClientError: 400 (wrong data type and missing payload)', () => {
      it('should respond with 400 and throw ClientError when payload has wrong data type', async () => {
        // Arrange
        const requestPayload = {
          title: 123, // Wrong data type
          body: 'threadBody',
        };

        const server = await createServer(container);
        const authentication =
          await AuthenticationsMockHelper.mockAuthDummy(server);

        // Action
        const response = await server.inject({
          method: 'POST',
          url: '/threads',
          payload: requestPayload,
          headers: {
            Authorization: `Bearer ${authentication.data.accessToken}`,
          },
        });

        // Assert
        const responseJson = JSON.parse(response.payload);
        expect(response.statusCode).toEqual(400);
        expect(responseJson.status).toEqual('fail');
        expect(responseJson.message).toEqual(
          'tidak dapat membuat thread baru karena tipe data tidak sesuai',
        );
      });

      it('should respond with 400 and throw ClientError when payload is missing required properties', async () => {
        // Arrange
        const requestPayload = {
          body: 'threadBody',
        };

        const server = await createServer(container);
        const authentication =
          await AuthenticationsMockHelper.mockAuthDummy(server);

        // Action
        const response = await server.inject({
          method: 'POST',
          url: '/threads',
          payload: requestPayload,
          headers: {
            Authorization: `Bearer ${authentication.data.accessToken}`,
          },
        });

        // Assert
        const responseJson = JSON.parse(response.payload);
        expect(response.statusCode).toEqual(400);
        expect(responseJson.status).toEqual('fail');
        expect(responseJson.message).toEqual(
          'tidak dapat membuat thread baru karena properti yang dibutuhkan tidak ada',
        );
      });
    });

    describe('Successful Creation: 201', () => {
      it('should respond with 201 and create a new thread', async () => {
        // Arrange
        const requestPayload = {
          title: 'threadTitle',
          body: 'threadBody',
        };

        const server = await createServer(container);
        const authentication =
          await AuthenticationsMockHelper.mockAuthDummy(server);

        // Action
        const response = await server.inject({
          method: 'POST',
          url: '/threads',
          payload: requestPayload,
          headers: {
            Authorization: `Bearer ${authentication.data.accessToken}`,
          },
        });

        // Assert
        const responseJson = JSON.parse(response.payload);
        expect(response.statusCode).toEqual(201);
        expect(responseJson.status).toEqual('success');
        expect(responseJson.message).toEqual('Thread posted successfully');
        expect(responseJson.data.addedThread).toBeDefined();
      });
    });
  });
});
