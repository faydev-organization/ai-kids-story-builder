/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        {
          text: "create kids story on description for 5-8 years kids, educational story, and all images in paper cut style: story of boy and magic school, give me 5 chapter, with detailed image text prompt for eact of chapter and image prompt for story cover book with story name, all in JSON field format\n",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "story": {\n    "title": "The Boy Who Found Magic School",\n    "cover": {\n      "image_prompt": "Paper cut illustration of a boy with a backpack full of books, standing in front of a giant, whimsical school made of swirling, colorful paper. The school has a big sign that says \'Magic School\' in bubbly letters. There\'s a magical glow coming from the school windows, and a friendly-looking owl perched on the roof.",\n      "description": "A captivating cover with a whimsical paper-cut style, showcasing a young boy and his journey to a magical school."\n    },\n    "chapters": [\n      {\n        "title": "The Ordinary Boy",\n        "image_prompt": "Paper cut illustration of a bored-looking boy sitting at a desk with stacks of boring textbooks. He is surrounded by gray and dull colors, except for a tiny, glowing book on his desk. He looks longingly out the window at a bright, colorful kite flying in the sky.",\n        "description": "A simple, yet relatable depiction of a boy\'s everyday life, filled with mundane routines and a yearning for something extraordinary."\n      },\n      {\n        "title": "The Mysterious Book",\n        "image_prompt": "Paper cut illustration of the boy holding the glowing book. The book is bursting with colorful paper-cut images of magical creatures, flying castles, and bubbling potions. The boy\'s eyes widen with wonder as he reads.",\n        "description": "A vibrant and imaginative scene showcasing the power of the book and the boy\'s growing excitement."\n      },\n      {\n        "title": "The Journey to Magic School",\n        "image_prompt": "Paper cut illustration of the boy walking through a magical forest. The trees are made of paper, with glowing leaves and swirling branches. He is accompanied by a friendly, talking squirrel and a mischievous pixie. They all follow a winding path leading towards a magnificent paper-cut castle in the distance.",\n        "description": "An enchanting journey through a whimsical forest filled with talking creatures and magical scenery."\n      },\n      {\n        "title": "Magic School Adventures",\n        "image_prompt": "Paper cut illustration of the boy inside a bustling classroom at Magic School. He is surrounded by other children, all learning different magical skills. There are paper-cut depictions of children conjuring spells, flying on broomsticks, and making objects disappear and reappear.",\n        "description": "A bustling and vibrant scene showcasing the excitement and wonder of learning magic at Magic School."\n      },\n      {\n        "title": "The Magic Within",\n        "image_prompt": "Paper cut illustration of the boy standing confidently in front of the school, holding a book in his hand. He is surrounded by vibrant colors, and the school is glowing brightly. The boy has a happy and determined expression on his face.",\n        "description": "A powerful and inspiring ending, emphasizing the boy\'s newfound confidence and the realization that magic is within everyone."\n      }\n    ]\n  }\n}\n```',
        },
      ],
    },
  ],
});
