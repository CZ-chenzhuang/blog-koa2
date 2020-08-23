const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/crpy')

const login = async (username, password) => {
  username = escape(username)
  password = genPassword(password)
  password = escape(password)
  let sql = `
    select username, realname from users where username=${username} and password=${password}
  `
  let rows = await exec(sql)
  return rows[0] || {}
}

module.exports = {
  login
}