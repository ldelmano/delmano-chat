const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const zapfy = require("zapfy-sdk");

const { commands } = require("./commands");

const { ZapfySdk } = zapfy;

require("dotenv").config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/webhook", async (req, res) => {
  try {
    const { type, data } = req.body;
    // const senderPhoneNumber = req.body.From;

    let responseText = "";
    const messageText = data?.message?.conversation;

    if (type === "NEW-MESSAGE" && messageText) {
      if (!data?.key?.fromMe) {
        if (commands.hasOwnProperty(messageText)) {
          // If the message is a predefined command and has a fixed response
          if (commands[messageText].fixed) {
            responseText =
              typeof commands[messageText].response === "function"
                ? commands[messageText].response()
                : commands[messageText].response;
          } else {
            // Otherwise, process the command using the GPT-3 API with context
            responseText = await processMessage(
              messageText,
              commands[messageText].context
            );
          }
        } else {
          // If the message is not a command, process it using the GPT-3 API
          responseText = await processMessage(messageText);
        }
      } else if (messageText === "/help") {
        responseText = commands["/help"].response;
      }
    }

    await ZapfySdk.Message.sendTextMessage({
      instanceKey: process.env.ZAPFY_INSTANCE_KEY,
      instanceToken: process.env.ZAPFY_INSTANCE_TOKEN,
      text: responseText,
      destination: data.key.remoteJid,
    });

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
