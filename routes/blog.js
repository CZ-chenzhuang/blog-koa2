const router = require('koa-router')()
const { 
    getBlogList, 
    getBlogDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/blog')

/* GET home page. */
router.get('/list', async function(ctx, next) {
    const { author, keyword } = ctx.query
    let listData = await getBlogList(author, keyword)
    ctx.body = new SuccessModel(listData, '请求成功')
});

router.get('/detail', async (ctx, next) => {
    let { id } = ctx.query
    let detailInfo = await getBlogDetail(id)
    ctx.body = new SuccessModel(detailInfo, '请求详情成功')
})

// 新建博客，需要loginCheck 中间件进行登陆验证
router.post('/new', loginCheck, async (ctx, next) => {
    let { body } = ctx.request
    body.author = ctx.session.username
    let data = await newBlog(body)
    ctx.body = new SuccessModel(data, '新建博客成功')
})

router.post('/update', loginCheck, async (ctx, next) => {
    let { id } = ctx.query
    let { body } = ctx.request
    let val = await updateBlog(id, body)
    if (val) {
        ctx.body = new SuccessModel('更新博客成功')
        return
    }
    ctx.body = new ErrorModel('更新博客失败')
})

router.post('/del', loginCheck, async (ctx, next) => {
    let author = ctx.session.username
    let { id } = ctx.query
    let val = await delBlog(id, author)
    if (val) {
        ctx.body = new SuccessModel('删除博客成功')
      return
    }
    ctx.body = new ErrorModel('删除博客失败')
})

module.exports = router
