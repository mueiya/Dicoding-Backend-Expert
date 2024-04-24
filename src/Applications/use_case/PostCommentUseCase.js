const PostComment = require('../../Domains/comments/entities/PostComment');

class PostCommentUseCase {
  constructor({ commentRepository }) {
    this._commentRepository = commentRepository;
  }

  async execute(useCasePayload) {
    const postCommentEntity = new PostComment(useCasePayload);
    return this._commentRepository.postComment(postCommentEntity);
  }
}

module.exports = PostCommentUseCase;
