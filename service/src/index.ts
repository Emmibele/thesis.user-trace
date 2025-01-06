import express from "express"
import { appConfig } from "./app_config";

const app = express();

app.post(appConfig.getRouteLog(), (req,res)=>{
  console.log(req);
  res.send()
})

app.listen(appConfig.getAppPort(), () => {console.log('listening')});
