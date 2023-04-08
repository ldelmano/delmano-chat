const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const twilio = require("twilio");
const processMessage = require("./chatgptstuff").processMessage;

require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/webhook", async (req, res) => {
  try {
    const messageText = req.body.Body;
    const senderPhoneNumber = req.body.From;

    const responseText = await processMessage(messageText);

    // Send the response using the Twilio client
    await client.messages.create({
      body: responseText,
      from: "whatsapp:+14155238886", // Replace with your Twilio WhatsApp sandbox number
      to: senderPhoneNumber,
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
