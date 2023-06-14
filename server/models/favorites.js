const { Pool } = require('pg');

const PG_URI = 'postgres://heenrucd:9wDPQu0Ywh6eSHlelJAWmP4OG6CS2MFu@mahmud.db.elephantsql.com/heenrucd';

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI
});


module.exports = {
  query: (text, params, callback) => {
    // console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};
