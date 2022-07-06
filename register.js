// const User = require('./prototypeMode/user')
// const SessionManager = require('./prototypeMode/sessionManager')

const User = require('./constructorMode/user')
const SessionManager = require('./constructorMode/sessionManager')


const Container = require('./container');

const container = new Container({ injectionMode: 'constructor' });
container.register({
    'User': container.asClass(User, ['SessionManager', 'port']),
    'SessionManager': container.asClass(SessionManager, ['User']),
    'config': container.asValue({
        hostname: '127.0.0.1',
        username: 'root',
        password: ''
    }),
    'port': container.asValue(3000)
})

module.exports = container