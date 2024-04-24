/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const ThreadsTableTestHelper = {
  async addComment({
    id = 'stringThreadId',
    content = 'stringContent',
    thread = 'stringThreadId',
    owner = 'stringOwnerId',
  }) {
    const query = {
      text: 'INSERT INTO comments VALUES($1, $2, $3, $4)',
      values: [id, content, thread, owner],
    };

    await pool.query(query);
  },

  async findCommentById(id) {
    const query = {
      text: 'SELECT * FROM comments WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM comments WHERE 1=1');
  },
};

module.exports = ThreadsTableTestHelper;
