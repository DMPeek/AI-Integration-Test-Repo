const axios = require('axios');

module.exports = async function(prompt) {
    const response = await axios.post(
    'https://api.anthropic.com/v1/messages',
        {
            model: 'claude-3-haiku-20240307',
            max_tokens: 1024,
            messages: [{role: 'user', content: prompt}]
        },
        {
            headers: {
                'x-api-key': process.env.CLAUDE_API_KEY,
                'anthropic-version': '2023-06-01',
                'Content-Type': 'application/json'
            }
        }
    );

    return response.data.content[0].text;
}

// this code don't work cause balance issues as well
