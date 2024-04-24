const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const PostComment = require('../../../Domains/comments/entities/PostComment');
const PostedComment = require('../../../Domains/comments/entities/PostedComment');
const pool = require('../../database/postgres/pool');
const CommentRepositoryPostgres = require('../CommentRepositoryPostgres');

describe('CommentRepositoryPostgres', () => {
  afterEach(async () => {
    await CommentsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('postComment function', () => {
    it('should persist post comment and return posted comment correctly', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        id: 'stringOwnerId',
        username: 'stringUsername',
        password: 'stringPassword',
        fullname: 'stringFullname',
      }); // Add the user first

      await ThreadsTableTestHelper.addThread({
        id: 'stringThreadId',
        title: 'stringTitle',
        body: 'stringBody',
        owner: 'stringOwnerId',
      }); // Add the thread to comments on

      const postComment = new PostComment({
        content: 'stringContent',
        thread: 'stringThreadId',
        owner: 'stringOwnerId',
      });

      const fakeIdGenerator = () => 'stringCommentId'; // stub;
      const commentRepository = new CommentRepositoryPostgres(
        pool,
        fakeIdGenerator,
      );

      // Action
      await commentRepository.postComment(postComment);

      // Assert
      const comments = await CommentsTableTestHelper.findCommentById(
        'comment-stringCommentId',
      ); // Id Generator start with comment-
      expect(comments).toHaveLength(1);
    });

    it('should return posted comment correctly', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        id: 'stringOwnerId',
        username: 'stringUsername',
        password: 'stringPassword',
        fullname: 'stringFullname',
      }); // Add the user first

      await ThreadsTableTestHelper.addThread({
        id: 'stringThreadId',
        title: 'stringTitle',
        body: 'stringBody',
        owner: 'stringOwnerId',
      }); // Add the thread to comments on

      const postComment = new PostComment({
        content: 'stringContent',
        thread: 'stringThreadId',
        owner: 'stringOwnerId',
      });

      const fakeIdGenerator = () => 'stringCommentId'; // stub;
      const commentRepository = new CommentRepositoryPostgres(
        pool,
        fakeIdGenerator,
      );

      // Action
      const postedComment = await commentRepository.postComment(postComment);

      // Assert
      expect(postedComment).toStrictEqual(
        new PostedComment({
          id: 'comment-stringCommentId', // Id Generator start with comment-
          content: 'stringContent',
          owner: 'stringOwnerId',
        }),
      );
    });
  });
});
