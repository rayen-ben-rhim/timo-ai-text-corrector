const express = require('express');
const cors = require('cors'); // Add this line
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors()); // Add this line
app.use(express.json());

// Initialize Google Generative AI with API Key
const genAI = new GoogleGenerativeAI("AIzaSyBHNKS7YYsuhidcMBv8p_v1PwmEVhalmhA");

// Define the model
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Function to generate content

// API Endpoint for text correction
app.post("/correct", async (req, res) => {
    const { prompt } = req.body;
    let improvedPrompt = `you are a text correction AI. The following text has some errors.you will get an html code just correct the text and give me a corrected text not hole html . Please correct them.\n\n${prompt} `;
    const result = await model.generateContent(improvedPrompt);
   
    res.json({ result: result.response.text() });
});

// API Endpoint for text completion
app.post("/complete", async (req, res) => {
    const { prompt } = req.body;
    let improvedPrompt = `you are a text completion AI. The following text is incomplete. you will get an html code just compleate the text and give me a compleated text not hole html .Please complete it.\n\n${prompt} `;
    const result = await model.generateContent(improvedPrompt);
    console.log(result.response.text());
    res.json({ result: result.response.text() });
});

// API Endpoint for text generation
app.post("/generate", async (req, res) => {
    const { prompt } = req.body;
    let improvedPrompt = `you are a text generation AI.you will get an html code just generate the text and give me a generated text not hole html ./The following text is a prompt for you to generate content.\n\n${prompt} `;
    const result = await model.generateContent(improvedPrompt);
    console.log(result.response.text());
    res.json({ result: result.response.text() });
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
