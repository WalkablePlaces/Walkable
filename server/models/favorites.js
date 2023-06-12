const { Pool } = require('pg');

const PG_URI = 'postgres://mnuresqy:l7VE-o-HUUus8G41Xpakan8Q3NiL5j-j@mahmud.db.elephantsql.com/mnuresqy';

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI
});


module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};
