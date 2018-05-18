
const app = require('./index')

const userDb = { name: 'user database' }

const contentDb = { name: 'content database'}

app.useDatabase({userDb, contentDb});

app.createFunction('get', '/test', [test], { type: 'unit test' })

app.listen(3000)

function test({ userDb, contentDb }, { type }) {
  console.log(userDb)
  console.log(contentDb)
  console.log(type)
  return function(req, res) {
    res.status(200).send(`${userDb.name} + ${contentDb.name} + ${type}`)
  }
}

