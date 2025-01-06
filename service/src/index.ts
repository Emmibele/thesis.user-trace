import express from "express"
import { appConfig } from "./app_config";
import https from "https";
import fs from "fs";
import bodyParser from 'body-parser';
import cors from 'cors';
import { userAction } from "./model/user_action";

const httpsOptions = {
  key: fs.readFileSync('./privatekey.pem'),
  cert: fs.readFileSync('./publiccert.pem')
}

const app = express();
app.use(cors());

app.post(appConfig.getRouteLog(), bodyParser.json(), (req,res)=>{
  if(!req.body) res.sendStatus(400);
  // console.log(req.body)

  const data = new userAction(req.body.id, req.body.name, req.body.logType, req.body.data)
  console.log(data)

  res.sendStatus(200)
})

https.createServer(httpsOptions, app).listen(appConfig.getAppPort(),  () => {console.log(`listening on ${appConfig.getAppPort()}:${appConfig.getRouteLog()}`)});
