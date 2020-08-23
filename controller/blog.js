const xss = require('xss')
const { exec } = require('../db/mysql')
// 获取博客列表
const getBlogList = async (author = '', keyword = '') => {
  let sql = `select * from blogs where 1=1 `
  if (author) {
    sql += `and author='${author}' `
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createtime desc;`
  return await exec(sql)
}

// 获取博客详情
const getBlogDetail = async (id = '') => {
  let sql = `select * from blogs where id='${id}'`
  let rows = await exec(sql)
  return rows[0]
}

// 新建博客
const newBlog = async (blogData = {}) => {
  let { title, content, author } = blogData
  title = xss(title)
  let createtime = Date.now()
  let sql = `insert into blogs (title, content, createtime, author)
    values ('${title}', '${content}', ${createtime}, '${author}')
  `
  let insertData = await exec(sql)
  return {
    id: insertData.insertId
  }
}

// 更新博客
const updateBlog = async (id, blogData = {}) => {
  const { title, content } = blogData
  let sql = `
    update blogs set title='${title}', content='${content}' where id=${id}
  `
  let updateData = await exec(sql)
  if (updateData.affectedRows > 0) {
    return true
  }
  return false 
}

// 删除博客
const delBlog = async (id = '', author = '') => {
  let sql = `
    delete from blogs where id='${id}' and author='${author}'
  `
  let delData = await exec(sql)
  if (delData.affectedRows > 0) {
    return true
  }
  return false
}

module.exports = {
  getBlogList,
  getBlogDetail,
  newBlog,
  updateBlog,
  delBlog
}
