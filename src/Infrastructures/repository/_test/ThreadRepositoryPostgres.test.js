const ThreadsTableTestHelper = require("../../../../tests/ThreadsTableTestHelper");
const UsersTableTestHelper = require("../../../../tests/UsersTableTestHelper");
const PostThread = require("../../../Domains/threads/entities/PostThread");
const PostedThread = require("../../../Domains/threads/entities/PostedThread")
const pool = require("../../database/postgres/pool");
const ThreadRepositoryPostgres = require("../ThreadRepositoryPostgres");

describe('ThreadRepositoryPostgres', () => {
    afterEach(async () => {
        await ThreadsTableTestHelper.cleanTable();
        await UsersTableTestHelper.cleanTable();
    })

    afterAll(async () => {
        await pool.end()
    })

    describe('postUser function', () => {
        it('should persist post thread and return posted thread correctly', async () => {
            // Arrange
            await UsersTableTestHelper.addUser({
                id: 'stringOwnerId',
                username: 'stringUsername',
                password: 'stringPassword',
                fullname: 'stringFullname'
            }) // Add the user first

            const postThread = new PostThread({
                title: 'stringTitle',
                body: 'stringBody',
                owner: 'stringOwnerId',
            })

            const fakeIdGenerator = () => 'stringThreaId' // stub;
            const threadRepository = new ThreadRepositoryPostgres(pool, fakeIdGenerator)

            // Action
            await threadRepository.postThread(postThread)

            // Assert
            const threads = await ThreadsTableTestHelper.findThreadById('thread-stringThreaId'); // Id Generator start with thread-
            expect(threads).toHaveLength(1);
        })

        it('should return posted thread correctly', async () => {
            // Arrange
            await UsersTableTestHelper.addUser({
                id: 'stringOwnerId',
                username: 'stringUsername',
                password: 'stringPassword',
                fullname: 'stringFullname'
            }) // Add the user first

            const postThread = new PostThread({
                title: 'stringTitle',
                body: 'stringBody',
                owner: 'stringOwnerId',
            })

            const fakeIdGenerator = () => 'stringThreaId' // stub;
            const threadRepository = new ThreadRepositoryPostgres(pool, fakeIdGenerator)

            // Action
            const postedThread = await threadRepository.postThread(postThread);

            //Assert
            expect(postedThread).toStrictEqual(new PostedThread({
                id: 'thread-stringThreaId', // Id Generator start with thread-
                title: 'stringTitle',
                owner: 'stringOwnerId',
            }))
        })
    })
})