import { Configuration, OpenAIApi } from 'openai';
import readline from 'readline';

const openai = new OpenAIApi(
  new Configuration({
    organization: process.env.organisationId,
    apiKey: process.env.apiKey,
  }),
);

const MODELS = {
  GPT_35_TURBO: 'gpt-3.5-turbo',
};

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

userInterface.prompt();

userInterface.on('line', async (input) => {
  await openai
    .createChatCompletion({
      model: MODELS.GPT_35_TURBO,
      messages: [{ role: 'user', content: input }],
    })
    .then((res) => {
      console.log(res.data.choices[0].message.content);
      userInterface.prompt();
    })
    .catch((e) => {
      console.log(e);
    });
});
