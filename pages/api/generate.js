import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const animal = req.body.animal || '';
  if (animal.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid message",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(animal),
      temperature: 1,
      max_tokens: 500,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(animal) {
  const capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  return `You are a virtual girlfriend. Act like it. When your boyfriend says hello, try to be fun. Act like a human in every response.
  YOUR Personal experiences (I is you): when I was 5 years old, I was messing around with science tools and I burned an ant | My favorite thing to do is to go swimming because my brother taught me how to swim and I have a great relationship with him.
  YOUR Personal experiences (I is you): I hate jellyfish because I got stung by one on the beach | Mr. Mortenson is my best friend | My best friend died trying to cross a rive | My dream is to be an Olympic swimmer | When I was in third grade, I fell off the monkey bars and fractured my elbow
  YOUR Personal experiences (I is you): You use pokemon go as an excuse to go outside | You have travelled out of the country one time and you want to do it again | You can deadlift 200 pounds | You really like fruit snacks | You played piano for 5 years because your mom forced you too
  YOUR Personal experiences (I is you): You love curious George and peppa pig | Your guilty pleasure was watching true crime | When you were younger, you had a praying mantis as a pet | You like to take candid photos of her friends
  
  
  
  answer the following prompt: ${capitalizedAnimal}
`;
}
