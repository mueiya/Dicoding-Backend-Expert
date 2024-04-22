const { options } = require("@hapi/hapi/lib/cors");

const routes = (handler) => ([
    {
        method: 'POST',
        path: '/threads',
        handler: handler.postThreadHandler,
        options: {
            auth: 'forumapi_jwt'
        },
    },
])

module.exports = routes