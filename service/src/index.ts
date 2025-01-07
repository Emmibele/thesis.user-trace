import express from "express"
import { appConfig } from "./app_config";
import https from "https";
import fs from "fs";
import bodyParser from 'body-parser';
import cors from 'cors';
import { logData } from "./model/user_action";
import { logDatabase } from "./database/log_db";

const httpsOptions = {
  key: fs.readFileSync('./privatekey.pem'),
  cert: fs.readFileSync('./publiccert.pem')
}

const app = express();
app.use(cors());

const logDB = new logDatabase('sqlite.db'); // TODO move DB to configuration 

app.post(appConfig.getRouteLog(), bodyParser.json(), (req,res)=>{
  if(!req.body) res.sendStatus(400);

  const data = new logData(req.body.id, req.body.name, req.body.logType, req.body.timestamp, req.body.data)
  console.log(data)

  logDB.writeLog(data);
  logDB.printData();

  res.sendStatus(200)
})

https.createServer(httpsOptions, app).listen(appConfig.getAppPort(),  () => {console.log(`listening on ${appConfig.getAppPort()}:${appConfig.getRouteLog()}`)});
