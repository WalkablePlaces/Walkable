const db = require('../models/favorites');
const bcrypt = require('bcrypt')
const moment = require('moment')

const loginController = {};

// INSERT INTO Users (first_name,last_name,email,password,img_url,walking_distance,location,created_at,updated_at,deleted_at)
// VALUES ('Vivek','Patel','v@gamil.com','1234','http://www.google.com',12,'paris','2023-06-13','2023-06-12','2023-06-11')

// const query = {text: `INSERT INTO resturants (resturantname, resturantaddress, distance, walktime, walktimenum)
// VALUES ($1, $2, $3, $4, $5)`, values: [name, address, distance, walkTime, walkTimeNum]}

const workFactor = 10

//need some sort of error handler for if email is already used
loginController.signUp = async (req, res, next) => {
  try {
    const { password, email, first_name, last_name, img_url, walking_distance, location } = req.body
    console.log(req.body)
    const created_at = moment().format('YYYY-MM-DD')
    console.log(created_at)
    const hashedPass = await (bcrypt.hash(password, workFactor))
    const walkingDistanceNum = Number(walking_distance)
    const queryText = {
      text: `INSERT INTO Users (first_name,last_name,email,password,img_url,walking_distance,location,created_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, values: [first_name, last_name, email, hashedPass, img_url, walkingDistanceNum, location, created_at]
    }
    const response = await db.query(queryText)
    next()
  } catch (error) {
    next({
      log: `Express error handler caught loginController.signUp middleware error, ${error}`,
      status: 400,
      message: { err: 'Problem in loginController.signUp middleware' },
    })
  }

}

//see what response will output so we cant see what to set res to
loginController.login = async (req, res, next) => {
  try {
    const { password, email } = req.body
    const queryText = { text: `SELECT Users.* FROM Users WHERE Users.email = $1`, values: [email] }
    const response = await db.query(queryText)

    const passwordMatch = await bcrypt.compare(password, response.rows[0].password)
    console.log(passwordMatch)
    if (!passwordMatch) {
      next({
        log: 'Express error handler caught loginController.login middleware error, password doesnt match',
        status: 400,
        message: { err: 'loginController error password doesnt match' },
      })
    }
    delete response.rows[0].password
    console.log(response.rows[0])
    res.locals.userInfo = response.rows[0]
    next()
  } catch (error) {
    next({
      log: `Express error handler caught loginController.login middleware error,${error}`,
      status: 400,
      message: { err: 'loginController error password doesnt match' },
    })
  }
}

module.exports = loginController;