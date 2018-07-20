exports.index = function (req, res) {
  res.render('article/index', {
    title: '首页',
    user: req.user
  })
}

exports.new = function (req, res) {
  res.render('article/new', {
    title: '新建博客',
    user: req.user
  })
}
