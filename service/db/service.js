const sqlite3 = require('sqlite3');
const {open} = require('sqlite');

async function openDB(dbName) {
  return open({
    filename : ':memory:', // TODO in memory db for dev. to properly store data use a file
    driver : sqlite3.Database
  });
}

module.exports.doThings = (async () => {
  const db = await openDB();
  await db.exec('create table tbl_test (id INTEGER PRIMARY KEY, data TEXT)');
  await db.exec('insert into tbl_test (data) values ("test insert")');
  const result = await db.get('select * from tbl_test');
  console.log(result);
})();


// module.exports = async function readDB() {
//   return await db.get('select * from tbl_test');
// }