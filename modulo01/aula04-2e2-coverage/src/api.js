const http = require('http')
const DEFATUL_USER = {
    username: 'RafaelDaSilva',
    password: '123'
}

const { once } = require('events')
const routes = {
    /**
     * 
     * @param {Request} request 
     * @param {http.ServerResponse} response 
     */
    '/contact:get': (request, response) => {
        response.write('contact us page')
        return response.end();
    },
    /**
     * 
     * @param {http.IncomingMessage} request 
     * @param {http.ServerResponse} response 
     * 
     * curl -i -X POST --data '{"username":"rafaeldasilva", "password":"123"}' localhost:3000/login
     */
    '/login:post': async (request, response) => {

        const user = JSON.parse(await once(request, "data"))
        const toLower = (text) => text.toLowerCase()

        if (
            toLower(user.username) !== toLower(DEFATUL_USER.username)
            || user.password != DEFATUL_USER.password
        ) {
            response.writeHead(401)
            return response.end('Log in failed!')
        }

        return response.end('Log in succeeded!')
    },
    /**
     * 
     * @param {http.IncomingMessage} request 
     * @param {http.ServerResponse} response 
     */
    default(request, response) {
        response.writeHead(404)
        return response.end('not found!')
    }
}

function handler(request, response) {
    const { url, method } = request
    const routeKey = `${url.toLowerCase()}:${method.toLowerCase()}`
    const chosen = routes[routeKey] || routes.default
    return chosen(request, response)
}

const app = http.createServer(handler).listen(3000, () => console.log("running at 3000"))

module.exports = app;