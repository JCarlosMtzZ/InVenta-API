const db = require('./config/db.js');

db.query('SELECT NOW()', (err, res) => {
    if (err) console.error('Error');
    else console.log('Query result: ', res.rows[0]);
    db.end();
});