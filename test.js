const express = require("express");
const app = express();
const port = 3000;
const axios = require("axios");

app.get("/", async (req, res) => {
  let imgRef = await axios
    .get("https://dog.ceo/api/breeds/image/random")
    .then((res) => {
      console.log(res.data);
      return res.data.message;
    });
  res.send(imgRef);
});
app.listen(port, () => console.log(`Example app listening on port port!`));
