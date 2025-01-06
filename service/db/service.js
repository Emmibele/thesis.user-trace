//TODO Typescriptify

const sqlite3 = require('sqlite3').verbose();

async function openDB(dbName) {
  return new sqlite3.Database('sqlite.db');
}

module.exports.DBsetup = async() => {
  const db = await openDB();
  await db.run('create table if not exists tbl_log (id INTEGER PRIMARY KEY, timestamp INTEGER, message TEXT)');
  return db;
}

/**
 * 
 * @param {Database} db 
 * @param {string} message 
 */
module.exports.DBwrite = async(db, message) => {
  var statement = db.prepare('insert into tbl_log (timestamp, message) values (?, ?)');
  statement.run(123, message);
  statement.finalize();
  db.each('select * from tbl_log', (err, row) => {
    console.log(row.id, row.message);
  });
}
