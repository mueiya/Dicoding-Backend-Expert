const PostThreadUseCase = require("../../../../Applications/use_case/PostThreadUseCase");

class ThreadsHandler {
    constructor(container) {
        this._container = container;

        this.postThreadHandler = this.postThreadHandler.bind(this)
    }

    async postThreadHandler(request, h) {
        const payload = request.payload;
        const {id: userId} = request.auth.credentials;
        const useCasePayload = {
          title: payload.title,
          body: payload.body,
          owner: userId,
        };

        const postThreadUseCase = this._container.getInstance(PostThreadUseCase.name);
        const postedThread = await postThreadUseCase.execute(useCasePayload);
        const response = h.response({
            status: 'success',
            message: 'Thread posted successfully',
            data: {
                addedThread: postedThread,
            }
        })
        response.code(201);
        return response;
    }
}

module.exports = ThreadsHandler;