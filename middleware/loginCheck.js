const { ErrorModel } = require('../model/resModel')

module.exports = async (ctx, next) => {
    let { username } = ctx.session
    if (username) {
        next()
        return
    }
    ctx.body = new ErrorModel('未登陆！')
}