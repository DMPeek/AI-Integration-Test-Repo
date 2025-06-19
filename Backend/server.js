const express = require('express');
const dotenv = require('dotenv');
const openai = require('./services/openai');
const deepseek = require('./services/deepseek');
const claude = require('./services/claude');

dotenv.config();
const app = express();
app.use(express.json());

app.post('/ask', async (req, res) => {
    const {provider, prompt} = req.body;

    try {
        let response;

        switch (provider) {
            case 'openai':
                response = await openai(prompt);
                break;
            case 'deepseek':
                response = await deepseek(prompt);
                break;
            case 'claude':
                response = await claude(prompt);
                break;
            default:
                return res.status(400).json({error: 'Unsupported provider'});
        }

        res.json({provider, response})
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({error: 'Something went wrong with the LLM provider'});
    }
});

app.listen(3000, () => {
    console.log('LLM router running on http://localhost:3000');
})
