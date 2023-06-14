const cookieController = {};


cookieController.setCookie = (req, res, next) => {
  const { id } = res.locals.userInfo
  res.cookie('user_id', id, { httpOnly: true })
  next()
}

module.exports = cookieController;