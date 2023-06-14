const db = require('../models/favorites');
const favoriteController = {};
// add a place to favorites db

favoriteController.addFavorite = async (req, res, next) => {
  try {
    const { name, address, distance, walkTime, walkTimeNum } = req.body;
    const query = {text: `INSERT INTO resturants (resturantname, resturantaddress, distance, walktime, walktimenum)
    VALUES ($1, $2, $3, $4, $5)`, values: [name, address, distance, walkTime, walkTimeNum]}
    db.query(query);
    console.log('Sucesfully Inserted!');
   next();
  } catch (e) {
    next({log: `Something wrong with addFavorite middleware, error: ${e}`})
  }
};
// delete a place from favorites db

favoriteController.deleteFavorite = async (req, res, next) => {
  try {
    const { name } = req.body;
    const query = {text: `DELETE FROM resturants WHERE resturantname = $1`, values: [name]};
    db.query(query);
    console.log('Deleted Sucesfully!')
    next()
  } catch (e) {
    next({log: `Something wrong with deleteFavorite middleware, error: ${e}`})
  }
}
// get all places from favorites db
favoriteController.getAllFavorites = async (req, res, next) => {
    try {
    const query = `SELECT * FROM resturants`;
    const response = await db.query(query);
    const arrOfObjs = response.rows;
    res.locals.data = arrOfObjs;
    console.log(res.locals.data);
    next()
    }
    catch (e) {
        console.log(e);
        next({log: `Something wrong with getAllFavorites middleware, error: ${e}`})
    }
};
// compares res.locals.rawData to database, adds a boolean property to rawData of whether item exists in database
favoriteController.checkDatabase = async (req, res, next) => {
    try {
    const { rawData } = res.locals;
        for (let i = 0; i < rawData.length; i++) {
          const {name} = rawData[i]
          console.log('name: ', name)
            const query = {
            text: `SELECT * FROM resturants WHERE resturantname = $1`,
            values: [name],
            }
            const response = await db.query(query);
            rawData[i].favorited = response.rows.length !== 0;
        };
        console.log(rawData);
        next();
    }
    catch (e) {
        console.log(e);
        next({log: `Something wrong with checkDataBase middleware, error: ${e}`})
    }
};
// INSERT INTO Favorites (name,address,photo,url,phone_number,opening_hours,ratings,distance,types,walktime,walktime_num,created_at,deleted_at,user_id)
//VALUES ('popeyes','123 front st','google.com','yahoo.com','607-687-0755','monday-friday','5','10','thai','walkingtime: 20min',20,'2023-06-11','2023-06-10',1)


module.exports = favoriteController;