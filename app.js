const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const zapfy = require("zapfy-sdk");

const { ZapfySdk } = zapfy;

require("dotenv").config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/webhook", async (req, res) => {
  try {
    // const messageText = req.body.Body;
    // const senderPhoneNumber = req.body.From;

    // const responseText = await processMessage(messageText);

    console.log(req.body);

    res.sendStatus(200);
  } catch (error) {
    console.error("Error handling message:", error);
    res.sendStatus(500);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
