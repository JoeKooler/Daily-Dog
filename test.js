const express = require("express");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());

app.post("/webhook", (req, res) => {
  let reply_token = req.body.events[0].replyToken;
  let msg = req.body.events[0].message.text;

  reply(reply_token, msg);
  res.sendStatus(200);
});

app.listen(port);

const reply = (reply_token, msg) => {};
