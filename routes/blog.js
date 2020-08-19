const router = require('koa-router')()

router.prefix('/api/blog')

router.get('/list', async (ctx, next) => {
    const query = ctx.query
    ctx.body = {
        errorCode: 0,
        query,
        msg: 'list'
    }
})

module.exports = router
