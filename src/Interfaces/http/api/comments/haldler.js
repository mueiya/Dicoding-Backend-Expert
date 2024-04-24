const PostCommentUseCase = require('../../../../Applications/use_case/PostCommentUseCase');

class CommentHandler {
  constructor(container) {
    this._container = container;

    this.postCommentHandler = this.postCommentHandler.bind(this);
  }

  async postCommentHandler(request, h) {
    const { payload } = request;
    const { id: userId } = request.auth.credentials;
    const { threadId } = request.params;

    const useCasePayload = {
      content: payload.content,
      thread: threadId,
      owner: userId,
    };

    const postCommentUseCase = this._container.getInstance(
      PostCommentUseCase.name,
    );
    const postedComment = await postCommentUseCase.execute(useCasePayload);

    const response = h.response({
      status: 'success',
      message: 'Comment posted successfully',
      data: {
        addedCommment: postedComment,
      },
    });
    response.code(201);
    return response;
  }
}

module.exports = CommentHandler;
