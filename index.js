const express = require("express");
const request = require("request");
const app = express();
const port = process.env.PORT || 4000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.post("/webhook", (req, res) => {
  let reply_token = req.body.events[0].replyToken;
  reply(reply_token);
  res.sendStatus(200);
});

app.listen(port);
const reply = (reply_token) => {
  let headers = {
    "Content-Type": "application/json",
    Authorization:
      "Bearer {/D8XrAW3FkMhUhCjzg0DmverCN4M8ZnrgC+ZiMWw6Ib18WKyWM0TUlJ0XZVFiAs1a3bPXtXYmQWpexwgAy0LyqteuV51GvAQYZ+nE0Jo9b7BpQAc1LX67tWHGao0PEf6WmOsmXAgRDWTrGIsggEaiQdB04t89/1O/w1cDnyilFU=    }",
  };
  let body = JSON.stringify({
    replyToken: reply_token,
    messages: [
      {
        type: "text",
        text: "Hello",
      },
      {
        type: "text",
        text: "How are you?",
      },
    ],
  });
  request.post(
    {
      url: "https://api.line.me/v2/bot/message/reply",
      headers: headers,
      body: body,
    },
    (err, res, body) => {
      console.log("status = " + res.statusCode);
    }
  );
};
