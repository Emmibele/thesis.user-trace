
const express = require("express");
const cors = require('cors')
const config = require("./config");
const bodyParser = require('body-parser')
const https = require('https')
const fs = require('fs')

const httpsOptions = {
  key: fs.readFileSync('./privatekey.pem'),
  cert: fs.readFileSync('./publiccert.pem')
}

const app = express();
const root = config.app.route_root

app.use(bodyParser.text())
app.use(cors());

app.post(root+config.app.route_receive, (req, res) => {
  console.log(req.body);
  res.send('ok');
})

app.get(root+config.app.route_receive, (req, res) => {
	console.log("was gotten");
	res.send("ok, try post");
})

const server = https.createServer(httpsOptions, app).listen(config.app.port, () => {console.log('listening on port:', server.address().port)})
