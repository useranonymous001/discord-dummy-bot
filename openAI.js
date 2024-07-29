require("dotenv").config();

const { ModalSubmitFields } = require("discord.js");
const OpenAI = require("openai");

const openai = new OpenAI();

async function ask(prompt) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-turbo",
      prompt,
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const answer = response.choices[0];
    return answer;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  ask,
};
