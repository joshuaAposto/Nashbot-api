const express = require('express');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = process.env.PORT || 3000;
const convoFilePath = path.join(__dirname, 'convo.json');

if (!fs.existsSync(convoFilePath)) {
    fs.writeFileSync(convoFilePath, JSON.stringify({}));
}

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const getConversationHistory = () => {
    return JSON.parse(fs.readFileSync(convoFilePath, 'utf8'));
};

const saveConversationHistory = (history) => {
    fs.writeFileSync(convoFilePath, JSON.stringify(history, null, 2));
};

const getResponseFromApi = async (conversationContext, prompt) => {
    const apiPrompt = `${conversationContext}\n\nUser: ${prompt}\nAI:`;

    try {
        const apiResponse = await axios.get('https://deku-rest-api.gleeze.com/new/gpt-3_5-turbo', {
            params: { prompt: apiPrompt }
        });

        let responseData = JSON.stringify(apiResponse.data)
            .replace(/OpenAI|GPT|ChatGPT/gi, 'NashBot');

        responseData = JSON.parse(responseData);
        return responseData.result.reply;

    } catch (error) {
        console.error('API Request Error:', error);
        throw new Error('An error occurred while fetching the response from the API.');
    }
};

const createResponse = (reply) => ({
    status: 200,
    creator: 'NashBot',
    result: {
        reply: reply || 'Sorry, I couldn\'t understand your request.'
    },
    team: 'Developed by Nash'
});

app.get('/nashbot3', async (req, res) => {
    const { prompt } = req.query;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    if (!prompt) {
        return res.status(400).json(createResponse('Please provide a prompt query parameter using the format: /nashbot3?prompt=<text>. For example, /nashbot3?prompt=hi'));
    }

    if (prompt.length > 10000) {
        prompt = prompt.substring(0, 10000);
    }

    const conversationHistory = getConversationHistory();
    if (!conversationHistory[ip]) {
        conversationHistory[ip] = {
            context: [],
            lastPrompt: '',
            newTopic: false
        };
    }

    const userHistory = conversationHistory[ip];

    const defaultResponses = {
        'what is NashBot': "NashBot is an advanced conversational AI designed to assist users with a wide range of queries and tasks.",
        'how does NashBot work': "NashBot uses natural language processing to understand and respond to user queries intelligently.",
        'NashBot features': "NashBot offers features like natural language understanding, context-aware responses, and multi-platform support.",
        'NashBot setup guide': "To set up NashBot, follow the provided installation and configuration instructions carefully.",
        'NashBot customization': "You can customize NashBot by adjusting its settings and responses according to your specific needs.",
        'NashBot data privacy': "NashBot prioritizes user privacy and follows strict data protection policies.",
        'NashBot security': "NashBot employs robust security measures to safeguard user data and interactions.",
        'who is joshua apostol': "Joshua Apostol is a web developer known for his expertise in creating innovative web applications and solutions.",
        'what does joshua apostol do': "Joshua Apostol specializes in web development, focusing on creating functional and user-friendly web applications.",
        'joshua apostol background': "Joshua Apostol has a background in web development and is skilled in various programming languages and technologies.",
        'joshua apostol career': "Joshua Apostol's career includes working on various web development projects and contributing to the tech community.",
        'joshua apostol expertise': "Joshua Apostol's expertise lies in web development, including front-end and back-end technologies.",
        'NashBot4 model introduction': "NashBot4 is the latest iteration of the NashBot series, featuring enhanced natural language understanding and faster response times.",
        'NashBot4 improvements': "NashBot4 brings significant improvements in conversational depth, contextual awareness, and user interaction.",
        'NashBot4 vs NashBot3': "NashBot4 outperforms NashBot3 with improved processing capabilities and more advanced AI algorithms.",
        'NashBot4 launch date': "NashBot4 was launched on [insert launch date here] and is now available for integration.",
        'NashBot4 capabilities': "NashBot4 is capable of handling complex conversations, understanding nuanced language, and providing more accurate responses.",
        'NashBot4 integration': "Integrating NashBot4 into your system is straightforward with the provided API documentation and support.",
        'NashBot4 API documentation': "The NashBot4 API documentation provides all necessary details for seamless integration and usage.",
        'NashBot4 response time': "NashBot4 boasts faster response times, ensuring smoother and more natural conversations.",
        'NashBot4 support': "NashBot4 offers robust support for developers and users, ensuring any issues are resolved promptly.",
        'NashBot4 customization': "Like its predecessor, NashBot4 can be customized to fit specific user needs and business requirements.",
        'NashBot4 scalability': "NashBot4 is designed to be highly scalable, making it suitable for both small and large-scale applications.",
        'NashBot4 feedback': "User feedback on NashBot4 has been overwhelmingly positive, particularly regarding its conversational abilities.",
        'NashBot4 updates': "NashBot4 receives regular updates to ensure it stays ahead in terms of technology and user experience.",
        'NashBot4 data handling': "NashBot4 follows stringent data handling protocols to ensure user privacy and data security.",
        'NashBot4 multilingual support': "NashBot4 supports multiple languages, making it accessible to a global audience.",
        'NashBot4 industry applications': "NashBot4 is versatile and can be applied across various industries, from customer service to healthcare.",
        'NashBot4 technical specifications': "NashBot4 is built on state-of-the-art AI models, ensuring high performance and reliability.",
        'NashBot4 learning capabilities': "NashBot4 continuously learns and adapts to new data, improving its responses over time.",
        'NashBot4 deployment options': "NashBot4 can be deployed on-premises or in the cloud, depending on your specific needs.",
        'NashBot4 pricing': "NashBot4 offers flexible pricing options based on usage, making it accessible to businesses of all sizes.",
        'NashBot4 training resources': "Comprehensive training resources are available to help you get the most out of NashBot4.",
        'NashBot4 user experience': "NashBot4 is designed with user experience in mind, ensuring smooth and intuitive interactions.",
        'NashBot4 AI model': "The AI model behind NashBot4 is one of the most advanced, allowing for deep conversational understanding.",
        'NashBot4 deployment guide': "The deployment guide for NashBot4 provides step-by-step instructions to get your system up and running quickly.",
        'NashBot4 cloud integration': "NashBot4 integrates seamlessly with popular cloud platforms, offering flexibility and scalability.",
        'NashBot4 demo': "A demo of NashBot4 is available upon request, showcasing its capabilities in real-world scenarios.",
        'NashBot4 user feedback': "Feedback from early adopters of NashBot4 highlights its advanced conversational abilities and ease of use.",
        'NashBot4 comparison with competitors': "NashBot4 stands out from competitors with its advanced AI algorithms and superior user experience.",
        'NashBot4 security features': "NashBot4 includes advanced security features to protect user data and ensure safe interactions.",
        'NashBot4 release notes': "The release notes for NashBot4 detail all new features, improvements, and bug fixes.",
        'NashBot4 chatbot technology': "NashBot4 represents the latest in chatbot technology, offering unparalleled conversational capabilities.",
        'NashBot4 response accuracy': "NashBot4's response accuracy is among the highest in the industry, thanks to its advanced AI model.",
        'NashBot4 AI training': "NashBot4 undergoes continuous AI training to improve its performance and adapt to new data.",
        'NashBot4 maintenance': "Regular maintenance ensures that NashBot4 remains in optimal condition and continues to perform at its best.",
        'NashBot4 bug reporting': "If you encounter any issues with NashBot4, a bug reporting system is in place to address them quickly.",
        'NashBot4 software updates': "Software updates for NashBot4 are rolled out regularly to enhance its features and performance.",
        'NashBot4 data integration': "NashBot4 supports easy data integration with existing systems, ensuring smooth operations.",
        'NashBot4 system requirements': "The system requirements for NashBot4 are minimal, making it accessible to a wide range of users.",
        'NashBot4 user guide': "The user guide for NashBot4 provides detailed instructions on how to use and customize the bot.",
        'NashBot4 advanced features': "NashBot4 includes advanced features such as context-aware responses and natural language understanding.",
        'NashBot4 customer support': "Customer support for NashBot4 is available 24/7 to assist with any queries or issues.",
        'NashBot4 API integration': "The API integration for NashBot4 is straightforward, with detailed documentation provided.",
        'NashBot4 performance benchmarks': "Performance benchmarks for NashBot4 show it to be one of the fastest and most reliable chatbots available.",
        'NashBot4 roadmap': "The roadmap for NashBot4 includes exciting new features and improvements to be rolled out over the coming months.",
        'NashBot4 AI algorithms': "The AI algorithms powering NashBot4 are state-of-the-art, providing unparalleled conversational abilities.",
        'NashBot4 data analytics': "NashBot4 includes data analytics tools to help you gain insights from user interactions.",
        'NashBot4 product launch': "The launch of NashBot4 marks a new era in conversational AI, with its advanced capabilities setting a new standard.",
        'NashBot4 user community': "The user community for NashBot4 is active and growing, providing a space for sharing tips and best practices.",
        'NashBot4 FAQ': "The FAQ for NashBot4 covers common questions and troubleshooting tips.",
        'NashBot4 version history': "The version history of NashBot4 details the evolution of the bot and its features over time.",
        'NashBot4 licensing': "NashBot4 offers flexible licensing options to suit different business needs.",
        'NashBot4 chatbot development': "Developing with NashBot4 is easy, thanks to its well-documented API and robust SDK.",
        'NashBot4 model updates': "Model updates for NashBot4 are released regularly, ensuring it remains at the cutting edge of AI technology.",
        'NashBot4 user reviews': "User reviews of NashBot4 highlight its ease of use, powerful features, and responsive support.",
        'NashBot4 AI ethics': "NashBot4 is designed with AI ethics in mind, ensuring responsible and fair usage.",
        'NashBot4 open source': "NashBot4 is built on open-source technologies, allowing for greater flexibility and customization.",
        'NashBot4 developer tools': "Developer tools for NashBot4 include a robust SDK, API documentation, and sample code.",
        'NashBot4 chatbot training': "Training your chatbot with NashBot4 is straightforward, with detailed guides available.",
        'NashBot4 chatbot management': "Managing your NashBot4 chatbot is easy, thanks to the intuitive user interface and powerful tools.",
        'NashBot4 model performance': "The performance of the NashBot4 model is unmatched, providing accurate and reliable responses.",
        'NashBot4 AI research': "NashBot4 is backed by cutting-edge AI research, ensuring it remains at the forefront of technology.",
        'NashBot4 support community': "The NashBot4 support community is always ready to help with any issues or questions.",
        'NashBot4 user adoption': "User adoption of NashBot4 has been rapid, thanks to its powerful features and ease of use.",
        'NashBot4 chatbot ecosystem': "The NashBot4 chatbot ecosystem includes a range of tools and integrations to enhance your bot's capabilities.",
        'NashBot4 AI platform': "The AI platform behind NashBot4 is designed to provide the best possible conversational experience.",
        'NashBot4 deployment scenarios': "NashBot4 can be deployed in various scenarios, from customer support to lead generation.",
        'NashBot4 conversational AI': "NashBot4 represents the latest in conversational AI, offering natural and engaging interactions.",
        'NashBot4 chatbot customization': "Customizing NashBot4 is easy, with a range of options available to tailor the bot to your needs.",
        'NashBot4 multilingual chatbot': "NashBot4's multilingual capabilities allow it to engage with users from around the world.",
        'NashBot4 AI chatbot': "NashBot4 is an AI chatbot designed to provide intelligent, natural, and context-aware responses.",
        'NashBot4 chatbot support': "Support for NashBot4 is available 24/7, ensuring your chatbot runs smoothly and efficiently.",
        'NashBot4 conversational platform': "The conversational platform behind NashBot4 is designed to provide a seamless user experience.",
        'NashBot4 chatbot integration': "Integrating NashBot4 with your existing systems is easy, with comprehensive documentation and support available.",
        'NashBot4 conversational design': "The conversational design of NashBot4 ensures smooth and natural interactions with users.",
        'NashBot4 user experience design': "User experience design is a key focus for NashBot4, ensuring that interactions are intuitive and enjoyable.",
        'can you tell me about nashbot': "NashBot is a state-of-the-art conversational AI designed to provide intelligent and context-aware responses across a wide range of topics. It is built with advanced natural language processing capabilities, allowing it to understand and engage in meaningful conversations with users. NashBot can assist with queries, provide information, and even hold detailed discussions. It's your go-to AI for both casual and professional interactions."
    };

    let response = defaultResponses[prompt.toLowerCase()];

    if (!response) {
        try {
            const apiResponse = await getResponseFromApi(userHistory.context.join('\n'), prompt);
            response = apiResponse || "Sorry, I couldn't understand your request.";
            userHistory.lastPrompt = prompt;
            userHistory.newTopic = false;
        } catch (error) {
            return res.status(500).json(createResponse('An error occurred while processing your request.'));
        }
    } else {
        userHistory.context.push(`User: ${prompt}`, `AI: ${response}`);
        userHistory.newTopic = true;
    }

    saveConversationHistory(conversationHistory);
    res.json(createResponse(response));
});

app.listen(port, () => {
    console.log(`NashBot4 server is running on port ${port}`);
});
