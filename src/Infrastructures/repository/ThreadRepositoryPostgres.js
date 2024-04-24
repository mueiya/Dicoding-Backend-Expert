const ThreadRepository = require('../../Domains/threads/ThreadRepository');
const PostedThread = require('../../Domains/threads/entities/PostedThread');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');

class ThreadRepositoryPostgres extends ThreadRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async postThread(postThreadEntity) {
    const { title, body, owner } = postThreadEntity;
    const id = `thread-${this._idGenerator()}`;

    const query = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4) RETURNING id, title, owner',
      values: [id, title, body, owner],
    };

    const result = await this._pool.query(query);

    return new PostedThread({ ...result.rows[0] });
  }

  async verifyThreadAvailability(id) {
    const query = {
      text: 'SELECT * FROM threads WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError(`thread with id: ${id} not found`);
    }
  }
}

module.exports = ThreadRepositoryPostgres;
