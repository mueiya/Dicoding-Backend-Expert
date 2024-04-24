class PostComment {
  constructor(payload) {
    this._verifyPayload(payload);

    const { content, owner } = payload;

    this.content = content;
    this.owner = owner;
  }

  _verifyPayload({ content, owner }) {
    if (!content || !owner) {
      throw new Error('POST_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof content !== 'string' || typeof owner !== 'string') {
      throw new Error('POST_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = PostComment;
