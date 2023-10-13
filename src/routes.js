const bodyParser = require('body-parser')


const users = require('./routes/userRoute')
const login = require('./routes/loginRoute')
const acls = require('./routes/securityRoute')
const roles = require('./routes/roleRouter')
const posts = require('./routes/postRoute')


module.exports = app => {
    app.use(
        bodyParser.json(),
        login,
        posts,
        users,
        roles,
        acls,
    )
}