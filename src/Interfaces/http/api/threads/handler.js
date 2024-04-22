class ThreadsHandler {
    constructor(container) {
        this._container = container;

        this.postThreadHandler = this.postThreadHandler.bind(this)
    }

    async postThreadHandler(request, h) {
        const response = h.response({
            status: 'success',
            message: 'Thread posted successfully',
            data: {
                addedThread,
            }
        })
        response.code(201);
        return response;
    }
}

module.exports = ThreadsHandler;