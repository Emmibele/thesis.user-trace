import express from "express"
import { appConfig } from "./app_config";
import https from "https";
import fs from "fs";
import bodyParser from 'body-parser';
import cors from 'cors';

const httpsOptions = {
  key: fs.readFileSync('./privatekey.pem'),
  cert: fs.readFileSync('./publiccert.pem')
}

const app = express();
app.use(bodyParser.text());
app.use(cors());

app.post(appConfig.getRouteLog(), (req,res)=>{
  if(req.headers.accept && req.headers.accept == 'application/json'){
    console.log(req.body);
    res.send();
  }
  else{
    console.log('invalid data received');
    res.status(400).send();
  }
})

https.createServer(httpsOptions, app).listen(appConfig.getAppPort(),  () => {console.log(`listening on ${appConfig.getAppPort()}:${appConfig.getRouteLog()}`)});
