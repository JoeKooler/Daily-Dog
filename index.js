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

const reply = async (reply_token, msg) => {
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.AUTH,
    },
  };

  let body = JSON.stringify({
    replyToken: reply_token,
    messages: [
      {
        type: "text",
        text: msg,
      },
    ],
  });
  if (msg === "RandomDog") {
    let imgRef = await axios
      .get("https://dog.ceo/api/breeds/image/random")
      .then((res) => {
        console.log(res.data);
        return res.data.message;
      });
    body = JSON.stringify({
      replyToken: reply_token,
      messages: [
        {
          type: "image",
          originalContentUrl: imgRef,
          previewImageUrl: imgRef,
        },
      ],
    });
    console.log("Got Dog " + imgRef);
  }
  console.log("Fine until last post");
  axios
    .post("https://api.line.me/v2/bot/message/reply", body, axiosConfig)
    .then((res) => console.log(res));
};
