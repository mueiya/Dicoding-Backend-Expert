const PostedComment = require('../../../Domains/comments/entities/PostedComment');
const PostComment = require('../../../Domains/comments/entities/PostComment');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const PostCommentUseCase = require('../PostCommentUseCase');

describe('PostCommentUseCase', () => {
  it('should orchestrating the add comment action correctly', async () => {
    // Arrange
    const useCasePayload = {
      content: 'stringContent',
      owner: 'stringOwnerId',
    };

    const mockPostedComment = new PostedComment({
      id: 'stringCommentId',
      content: useCasePayload.content,
      owner: useCasePayload.owner,
    });

    const mockCommentRepository = new CommentRepository();

    mockCommentRepository.postComment = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockPostedComment));

    const postCommentUseCase = new PostCommentUseCase({
      commentRepository: mockCommentRepository,
    });

    // Action
    const postedComment = await postCommentUseCase.execute(useCasePayload);

    // Assert
    expect(postedComment).toStrictEqual(
      new PostedComment({
        id: 'stringCommentId',
        content: useCasePayload.content,
        owner: useCasePayload.owner,
      }),
    );
    expect(mockCommentRepository.postComment).toBeCalledWith(
      new PostComment({
        content: useCasePayload.content,
        owner: useCasePayload.owner,
      }),
    );
  });
});
