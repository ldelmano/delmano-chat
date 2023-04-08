const openaipkg = require("openai");

require("dotenv").config();

const configuration = new openaipkg.Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new openaipkg.OpenAIApi(configuration);

async function processMessage(text) {
  // Send the text to the GPT-3 API and receive a response
  const prompt = `You received a message: "${text}". Please generate a response:`;
  const gptResponse = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 150,
    n: 1,
    stop: null,
    temperature: 0.8,
  });

  // Extract the response text from the GPT-3 API response
  const responseText = gptResponse.data.choices[0].text;

  return responseText;
}

module.exports = {
  processMessage,
};
