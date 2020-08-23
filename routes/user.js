const router = require('koa-router')()
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/user')

/* GET home page. */
router.post('/login', async function(ctx, next) {
    const { username, password } = ctx.request.body
    const val = await login(username, password)
    if (val.username) {
        // 设置session
        ctx.session.username = val.username
        ctx.session.realname = val.realname
        ctx.session.test = 111
        ctx.body = new SuccessModel('登录成功')
        return
    }
    ctx.body = new ErrorModel('登陆失败')
});

// router.get('/session', async (ctx, next) => {
//     console.log(ctx.session, 'session')
//     if (ctx.session.viewCount === null) {
//         ctx.session.viewCount = 0
//     }
//     ctx.session.viewCount++
//     ctx.body = {
//         errorCode: 0,
//         viewCount: ctx.session.viewCount
//     }
// })

module.exports = router
