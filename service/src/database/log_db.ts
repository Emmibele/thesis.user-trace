import sqlite3 from "sqlite3";
import { logData } from "../model/user_action";

export class logDatabase{
  private dbString: string;
  private database: sqlite3.Database;
  private readonly tbl_name: string = 'tbl_logs';

  constructor(dbString:string){
    this.dbString = dbString;
    this.database = this.dbSetup();
  }

  private dbSetup(){
    const db = new sqlite3.Database(this.dbString); // TODO maybe move setup script to sql file and read from file?
    db.run(`create table if not exists ${this.tbl_name} (id INTEGER PRIMARY KEY, element_id TEXT, element_name TEXT, log_type TEXT, log_timestamp INTEGER, data TEXT)`);
    return db;
  }
  
  writeLog(logData: logData){
    const statement = this.database.prepare(`insert into ${this.tbl_name} (element_id, element_name, log_type, log_timestamp, data) values (?,?,?,?,?)`);
    const logDataData = logData.data ? logData.data : '';
    statement.run(logData.id, logData.name, logData.logType, logData.timestamp, logDataData);
    statement.finalize();
  }

  printData(){
    // this.database.each(`select * from ${this.tbl_name}`, (err, res) => {
    //   console.log(row.id)
    // })
    this.database.all(
      `select * from ${this.tbl_name}`,
      (_, res) => console.log(res)
    )
  }
}