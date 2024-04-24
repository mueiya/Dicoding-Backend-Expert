const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const AuthorizationError = require('../../Commons/exceptions/AuthorizationError');
const CommentRepository = require('../../Domains/comments/CommentRepository');
const PostedComment = require('../../Domains/comments/entities/PostedComment');

class CommentRepositoryPostgres extends CommentRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async postComment(postCommentEntity) {
    const { content, thread, owner } = postCommentEntity;
    const id = `comment-${this._idGenerator()}`;

    const query = {
      text: 'INSERT INTO comments VALUES($1, $2, $3, $4) RETURNING id, content, owner',
      values: [id, content, thread, owner],
    };

    const result = await this._pool.query(query);

    return new PostedComment({ ...result.rows[0] });
  }

  async verifyCommentAvailability(id, thread) {
    const query = {
      text: 'SELECT id FROM comments WHERE id = $1 AND thread = $2',
      values: [id, thread],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError(`thread with id = ${id} is not found`);
    }
  }

  async verifyCommentOwner(id, owner) {
    const query = {
      text: 'SELECT id FROM comments WHERE id = $1 AND owner = $2',
      values: [id, owner],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new AuthorizationError(
        `user with id = ${id} in not the owner of this comment`,
      );
    }
  }

  async deleteCommentById(id) {
    const query = {
      text: 'DELETE FROM comments WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError(`comment with id: ${id} not found`);
    }
  }
}

module.exports = CommentRepositoryPostgres;
