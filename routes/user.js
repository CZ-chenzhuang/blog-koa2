const router = require('koa-router')()

router.prefix('/api/user')

router.post('/login', async (ctx, next) => {
    const body = ctx.request.body
    ctx.body = {
        errorCode: 0,
        body,
        msg: 'login'
    }
})

module.exports = router
