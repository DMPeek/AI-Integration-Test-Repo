const axios = require('axios');

module.exports = async function(prompt) {
    const response = await axios.post (
        'https://api.deepseek.com/v1/chat/completions',
        {
            model: 'deepseek-chat',
            messages: [{role: 'user', content: prompt}]
        },
        {
            headers: {
                'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
                'COntent-Type': 'application/json'
            }
        }
    );

    return response.data.choices[0].message.content;
}

// this code don't work cause balance issues
