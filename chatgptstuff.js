const openai = require("openai");

require("dotenv").config();

const openaiApiKey = process.env.OPENAI_API_KEY;
openai.apiKey = openaiApiKey;

async function processMessage(text) {
  // Send the text to the GPT-3 API and receive a response
  const prompt = `You received a message: "${text}". Please generate a response:`;
  const gptResponse = await openai.Completion.create({
    engine: "davinci-codex",
    prompt: prompt,
    max_tokens: 150,
    n: 1,
    stop: null,
    temperature: 0.8,
  });

  // Extract the response text from the GPT-3 API response
  const responseText = gptResponse.choices[0].text.trim();

  return responseText;
}

module.exports = {
  processMessage,
};