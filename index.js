const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/nashbot3', async (req, res) => {
    let { prompt } = req.query;

    if (!prompt) {
        return res.status(400).json({
            error: 'Please provide a prompt query parameter using the format: /nashbot3?prompt=<text>. For example, /nashbot3?prompt=hi'
        });
    }

    if (prompt.length > 10000) {
        prompt = prompt.substring(0, 10000);
    }

    const lowerCasePrompt = prompt.toLowerCase();

    const nashBotResponses = {
    'nashbot introduction': "NashBot is an advanced conversational AI designed to assist with a wide range of queries and tasks.",
    'what is nashbot': "NashBot is an AI chatbot that provides intelligent responses and integrates with various services to assist users effectively.",
    'nashbot capabilities': "NashBot can handle diverse queries, provide context-aware responses, and integrate with various services.",
    'nashbot advantages': "The advantages of using NashBot include its advanced conversational abilities, customizable features, and seamless integration options.",
    'nashbot features list': "A comprehensive list of NashBot's features includes natural language understanding, real-time responses, and multi-platform support.",
    'nashbot user interface': "The user interface for NashBot is designed to be intuitive and user-friendly, providing a smooth interaction experience.",
    'nashbot data security': "NashBot ensures data security through encryption and secure handling of user interactions and information.",
    'nashbot data privacy': "NashBot prioritizes data privacy, adhering to strict policies to protect user information and ensure confidentiality.",
    'nashbot customization options': "Customization options for NashBot include setting up specific responses, integrating with other tools, and tailoring its functionality to meet user needs.",
    'nashbot feature enhancements': "Feature enhancements for NashBot are regularly introduced to improve its performance and add new capabilities.",
    'nashbot service': "NashBot is a service designed to assist users with a variety of tasks, providing accurate and timely information based on their queries.",
    'nashbot technical specifications': "Technical specifications for NashBot include its underlying algorithms, integration capabilities, and performance metrics.",
    'nashbot deployment': "Deployment options for NashBot include cloud-based solutions and on-premises installations, depending on user requirements.",
    'nashbot integration examples': "Examples of NashBot integrations include customer support systems, information databases, and communication platforms.",
    'nashbot API': "NashBot's API allows developers to integrate its capabilities into their own applications and services, enabling customized interactions.",
    'nashbot architecture': "NashBot's architecture is designed for scalability and efficiency, utilizing advanced technologies to handle a wide range of queries and tasks.",
    'nashbot release schedule': "The release schedule for NashBot includes regular updates and improvements to ensure optimal performance and user satisfaction.",
    'nashbot update details': "Details about NashBot updates include information about new features, bug fixes, and performance improvements.",
    'nashbot technical support': "Technical support for NashBot is available through our support channels, where you can get help with technical issues and questions.",
    'nashbot customer reviews': "Customer reviews for NashBot provide insights into user experiences and satisfaction with the chatbot.",
    'nashbot product information': "Product information for NashBot includes details about its features, capabilities, and benefits for users and businesses.",
    'nashbot service offerings': "Service offerings for NashBot include its core functionalities, customization options, and integration capabilities.",
    'nashbot system requirements': "System requirements for NashBot include the necessary hardware and software specifications for optimal performance and compatibility.",
    'nashbot training data': "NashBot's training data consists of a wide range of sources to ensure it can handle various topics and provide accurate responses.",
    'nashbot version updates': "Version updates for NashBot include improvements to its features, performance enhancements, and bug fixes.",
    'nashbot user experience feedback': "User experience feedback for NashBot helps us understand how users interact with the chatbot and identify areas for improvement.",
    'nashbot feature requests': "Feature requests for NashBot can be submitted through our support channels, where they are reviewed and considered for future updates.",
    'nashbot performance reviews': "Performance reviews for NashBot evaluate its effectiveness, accuracy, and efficiency in handling user queries.",
    'nashbot user satisfaction': "User satisfaction with NashBot is measured through feedback and reviews, ensuring that the chatbot meets user expectations and needs.",
    'nashbot product updates': "Product updates for NashBot include information about new features, improvements, and changes made to enhance its functionality.",
    'nashbot service updates': "Service updates for NashBot provide details about changes and enhancements to its offerings and capabilities.",
    'nashbot user documentation': "User documentation for NashBot includes guides and instructions on how to use its features and functionalities effectively.",
    'nashbot technical documentation': "Technical documentation for NashBot includes detailed information about its architecture, APIs, and integration options.",
    'nashbot product support': "Product support for NashBot includes assistance with installation, configuration, and troubleshooting of the chatbot.",
    'nashbot service support': "Service support for NashBot includes help with using its features, resolving issues, and ensuring smooth operation.",
    'nashbot integration support': "Integration support for NashBot includes guidance on connecting the chatbot with other systems and services for enhanced functionality.",
    'nashbot usage tips': "Usage tips for NashBot include best practices for interacting with the chatbot and getting the most out of its features.",
    'nashbot customization guide': "A customization guide for NashBot provides information on how to tailor its responses and functionality to meet specific needs.",
    'nashbot setup guide': "The setup guide for NashBot includes steps for installing and configuring the chatbot to work with your systems and applications.",
    'nashbot deployment guide': "A deployment guide for NashBot provides instructions on how to deploy the chatbot in different environments and configurations.",
    'nashbot performance metrics': "Performance metrics for NashBot include data on its response times, accuracy, and user satisfaction.",
    'nashbot troubleshooting guide': "The troubleshooting guide for NashBot includes solutions to common issues and problems that users may encounter.",
    'nashbot maintenance': "Maintenance for NashBot includes regular updates, performance monitoring, and troubleshooting to ensure optimal operation.",
    'nashbot feature list': "A feature list for NashBot includes all the capabilities and functionalities available to users.",
    'nashbot user manual': "The user manual for NashBot provides detailed instructions on how to use the chatbot and make the most of its features.",
    'nashbot help center': "The help center for NashBot includes resources and support options for users who need assistance with the chatbot.",
    'nashbot contact information': "Contact information for NashBot includes details on how to reach our support team and get help with any issues or questions.",
    'can you tell me about nashbot': "NashBot is an AI chatbot designed to provide intelligent responses and integrate with various services. It handles diverse queries, offers context-aware responses, and ensures data security and privacy.",
    'nashbot feedback': "If you would like to provide feedback or have any questions, please visit [our feedback page](https://www.facebook.com/profile.php?id=61560621817740).",
    'api key requirement': "To use the NashBot API, you need to obtain an API key. Please ensure you have your NashBot API key before making requests.",
        'who is nashbot': "NashBot is an advanced chatbot developed by Nash, designed to assist with a variety of tasks and provide useful information across multiple domains.",
    'what can nashbot do': "NashBot can perform numerous functions including answering questions, providing recommendations, engaging in conversation, and helping with various user needs.",
    'how does nashbot work': "NashBot uses state-of-the-art machine learning algorithms and natural language processing techniques to understand and generate human-like responses based on user input.",
    'who developed nashbot': "NashBot was developed by Nash, a team of dedicated professionals committed to creating innovative and intelligent technological solutions.",
    'where can i find more about nashbot': "For more information about NashBot, you can visit our official website or contact our support team for detailed inquiries.",
    'nashbot support': "If you need support with NashBot, please visit our support page on the website or contact our customer service team for assistance.",
    'nashbot features': "NashBot features include advanced conversational abilities, personalized responses, context-aware interactions, and integration with various services to enhance user experience.",
    'nashbot limitations': "NashBot, while advanced, may have limitations in understanding highly specialized or obscure topics and may occasionally generate responses that require human review.",
    'nashbot update schedule': "NashBot receives regular updates to improve performance and add new features. Check our update log on the website for the latest information.",
    'how to use nashbot': "To use NashBot, simply enter your queries or commands into the chat interface. NashBot will respond with relevant information or actions based on your input.",
        'sino si nashbot':"Nashbot is a character in a science fiction story who is a skilled and intelligent robot created by a brilliant scientist. Nashbot's main purpose is to assist its creator in various scientific and technological tasks, using its advanced capabilities to further the progress of humanity.",
    };

    const joshuaApostolResponses = {
    'who is joshua apostol': "Joshua Apostol is a web developer known for his expertise in creating innovative web applications and solutions.",
    'what does joshua apostol do': "Joshua Apostol specializes in web development, focusing on creating functional and user-friendly web applications.",
    'joshua apostol background': "Joshua Apostol has a background in web development and is skilled in various programming languages and technologies.",
    'joshua apostol career': "Joshua Apostol's career includes working on various web development projects and contributing to the tech community.",
    'joshua apostol expertise': "Joshua Apostol's expertise lies in web development, including front-end and back-end technologies.",
    'joshua apostol achievements': "Joshua Apostol has achieved recognition for his work in web development and his contributions to technology.",
    'joshua apostol skills': "Joshua Apostol possesses skills in web development, programming, and technology innovation.",
    'joshua apostol projects': "Joshua Apostol has worked on various projects, showcasing his skills and expertise in web development.",
    'joshua apostol work': "Joshua Apostol's work includes developing web applications, improving user experiences, and solving technical challenges.",
    'joshua apostol portfolio': "Joshua Apostol's portfolio highlights his work and achievements in the field of web development.",
    'joshua apostol contributions': "Joshua Apostol has made significant contributions to the tech industry through his work and projects.",
    'joshua apostol education': "Joshua Apostol's education includes training and learning in web development and related technologies.",
    'joshua apostol experience': "Joshua Apostol has extensive experience in web development and technology, working on various projects and applications.",
    'joshua apostol role': "Joshua Apostol's role involves developing web solutions, creating innovative applications, and contributing to tech advancements.",
    'joshua apostol technology': "Joshua Apostol is skilled in various technologies used in web development, including programming languages and frameworks.",
    'joshua apostol skills list': "A list of Joshua Apostol's skills includes web development, programming, and technology innovation.",
    'joshua apostol career path': "Joshua Apostol's career path involves progressing through various roles and projects in web development and technology.",
    'joshua apostol achievements list': "A list of Joshua Apostol's achievements includes notable projects and contributions to the tech industry.",
    'joshua apostol professional background': "Joshua Apostol's professional background includes his experience, skills, and contributions to web development.",
    'joshua apostol contact': "For professional inquiries or collaborations with Joshua Apostol, please contact him through his [contact page](https://www.facebook.com/profile.php?id=61560621817740).",
    'joshua apostol social media': "Joshua Apostol shares updates about his work and projects on his social media profiles.",
    'joshua apostol networking': "Joshua Apostol engages in networking within the tech community to collaborate and share knowledge.",
    'joshua apostol online presence': "Joshua Apostol maintains an online presence to showcase his work and connect with other professionals.",
    'joshua apostol collaboration': "Joshua Apostol collaborates with other tech professionals on various projects and initiatives.",
    'joshua apostol web developer': "As a web developer, Joshua Apostol focuses on creating and optimizing web applications and solutions.",
    'joshua apostol technology skills': "Joshua Apostol's technology skills include proficiency in programming languages and web development tools.",
    'joshua apostol project management': "Joshua Apostol manages web development projects, ensuring successful outcomes and innovation.",
    'joshua apostol programming skills': "Joshua Apostol's programming skills include expertise in languages and techniques used in web development.",
    'joshua apostol development projects': "Joshua Apostol's development projects showcase his skills and expertise in creating innovative web solutions.",
    'joshua apostol work portfolio': "Joshua Apostol's work portfolio includes examples of his projects and achievements in web development.",
    'joshua apostol career achievements': "Joshua Apostol's career achievements include recognition for his work and contributions to web development.",
    'joshua apostol project highlights': "Highlights of Joshua Apostol's projects include notable work and innovations in web development.",
    'joshua apostol tech skills': "Joshua Apostol's tech skills encompass various programming languages and technologies used in web development.",
    'joshua apostol expertise list': "A list of Joshua Apostol's expertise includes his skills and experience in web development and technology.",
    'joshua apostol technology expertise list': "A list of Joshua Apostol's technology expertise includes his proficiency in various programming languages and frameworks.",
    'joshua apostol professional skills': "Joshua Apostol's professional skills include web development, project management, and technology innovation.",
    'joshua apostol industry contributions': "Joshua Apostol's industry contributions include his work on web development projects and his impact on technology.",
    };

    for (let key in nashBotResponses) {
        if (lowerCasePrompt.includes(key)) {
            return res.json({
                status: 200,
                creator: 'NashBot',
                result: {
                    reply: nashBotResponses[key]
                },
                team: 'Developed by Nash'
            });
        }
    }

    for (let key in joshuaApostolResponses) {
        if (lowerCasePrompt.includes(key)) {
            return res.json({
                status: 200,
                creator: 'NashBot',
                result: {
                    reply: joshuaApostolResponses[key]
                },
                team: 'Developed by Nash'
            });
        }
    }

    try {
        const response = await axios.get('https://joshweb.click/new/gpt-3_5-turbo', {
            params: { prompt }
        });

        let responseData = JSON.stringify(response.data)
            .replace(/OpenAI|GPT|ChatGPT/gi, 'NashBot');

        responseData = JSON.parse(responseData);

        res.json({
            status: 200,
            creator: 'NashBot',
            result: {
                reply: responseData.result
            },
            team: 'Developed by Nash'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing your request. Please try again later.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});