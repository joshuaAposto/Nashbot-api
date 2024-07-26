const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

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
    'nashbot integration': "NashBot can be integrated with various platforms and services to enhance its functionality and provide a seamless user experience across different applications.",
    'nashbot customization': "NashBot can be customized to better fit specific needs or preferences. Contact our support team for information on customization options.",
    'nashbot privacy': "NashBot respects user privacy and adheres to strict data protection standards. Your interactions are handled securely and confidentially.",
    'nashbot security': "NashBot employs advanced security measures to protect user data and ensure safe interactions. Regular security audits are conducted to maintain high standards.",
    'nashbot training data': "NashBot's responses are generated based on a diverse range of training data, including general knowledge and specific domain information, to ensure accurate and relevant interactions.",
    'nashbot updates': "NashBot is updated regularly to improve its capabilities and add new features. Keep an eye on our announcements for information about the latest updates.",
    'who is behind nashbot': "NashBot is developed by Nash, a team of experts in technology and artificial intelligence.",
    'nashbot history': "NashBot's development began in [Year], with a focus on creating a versatile and intelligent chatbot.",
    'what is nashbot': "NashBot is a sophisticated chatbot designed to help users with various tasks and provide useful information.",
    'nashbot benefits': "NashBot offers numerous benefits, including efficient responses, personalized interactions, and the ability to handle a wide range of queries.",
    'nashbot development': "NashBot was developed using the latest advancements in artificial intelligence and natural language processing.",
    'nashbot goals': "The goal of NashBot is to provide users with accurate information and assist with various tasks to improve their experience.",
    'nashbot team': "The NashBot team consists of skilled professionals dedicated to advancing technology and creating innovative solutions.",
    'nashbot mission': "NashBot's mission is to enhance user interactions by providing intelligent and context-aware responses.",
    'nashbot vision': "NashBot aims to be a leading chatbot in the industry, offering exceptional performance and user experience.",
    'how to interact with nashbot': "To interact with NashBot, simply type your questions or commands into the chat interface and NashBot will respond accordingly.",
    'nashbot capabilities': "NashBot is capable of handling a wide range of queries, from simple questions to complex tasks, with accuracy and efficiency.",
    'nashbot updates schedule': "NashBot is updated on a regular basis to ensure optimal performance and introduce new features.",
    'nashbot features list': "Key features of NashBot include natural language understanding, context-aware responses, and integration with various services.",
    'nashbot enhancements': "NashBot receives continuous enhancements to improve its functionality and provide better user experiences.",
    'nashbot FAQ': "You can find frequently asked questions about NashBot on our website, covering various topics and common queries.",
    'nashbot contact': "For inquiries about NashBot, please contact our support team through the contact form on our website.",
    'nashbot feedback': "We welcome feedback on NashBot to help us improve and provide better services. Please send your feedback to our support team.",
    'nashbot performance': "NashBot's performance is continually monitored and optimized to ensure high-quality interactions and responses.",
    'nashbot reliability': "NashBot is designed to be reliable and provide consistent responses to user queries and commands.",
    'nashbot usability': "NashBot is user-friendly and designed to be easy to interact with, providing clear and relevant information.",
    'nashbot accessibility': "NashBot is accessible through various platforms and devices, making it easy for users to interact with it wherever they are.",
    'nashbot availability': "NashBot is available 24/7 to assist users with their queries and provide timely responses.",
    'nashbot knowledge base': "NashBot's knowledge base is extensive, covering a wide range of topics and information to assist users effectively.",
    'nashbot response time': "NashBot is optimized for quick response times, ensuring that users receive timely and relevant information.",
    'nashbot user guide': "A user guide for NashBot is available on our website, providing detailed instructions on how to use its features and functionalities.",
    'nashbot help': "If you need help with NashBot, please refer to the help section on our website or contact our support team for assistance.",
    'nashbot troubleshooting': "For troubleshooting issues with NashBot, please visit our support page or contact our customer service team for guidance.",
    'nashbot setup': "Instructions for setting up NashBot are available on our website, including detailed steps for installation and configuration.",
    'nashbot compatibility': "NashBot is compatible with various platforms and devices, ensuring seamless integration and usage across different environments.",
    'nashbot integration guide': "A guide for integrating NashBot with other platforms and services is available on our website, providing step-by-step instructions.",
    'nashbot development team': "The NashBot development team consists of experienced professionals in artificial intelligence and technology.",
    'nashbot technology': "NashBot utilizes advanced technology in artificial intelligence and natural language processing to deliver high-quality interactions.",
    'nashbot design': "NashBot's design focuses on user experience and functionality, providing an intuitive and engaging interface.",
    'nashbot performance metrics': "Performance metrics for NashBot are regularly reviewed to ensure optimal performance and user satisfaction.",
    'nashbot customer support': "Customer support for NashBot is available through our support page, where you can find answers to common questions and get help with issues.",
    'nashbot user experience': "NashBot is designed to provide an exceptional user experience, with intuitive interactions and accurate responses.",
    'nashbot features overview': "An overview of NashBot's features includes its conversational abilities, integration options, and customization capabilities.",
    'nashbot benefits overview': "The benefits of using NashBot include enhanced user interactions, personalized responses, and efficient task handling.",
    'nashbot development process': "The development process for NashBot involves designing, implementing, and testing advanced algorithms to ensure high performance.",
    'nashbot improvements': "Ongoing improvements are made to NashBot to enhance its capabilities and provide better user experiences.",
    'nashbot training': "NashBot is trained using a diverse range of data to ensure it can handle various queries and provide accurate responses.",
    'nashbot feedback mechanism': "NashBot has a feedback mechanism in place to collect user input and make improvements based on feedback received.",
    'nashbot release notes': "Release notes for NashBot include information about new features, enhancements, and bug fixes in each update.",
    'nashbot version history': "A version history for NashBot is available, detailing the changes and improvements made in each release.",
    'nashbot usage statistics': "Usage statistics for NashBot provide insights into how it is used and the types of interactions it handles.",
    'nashbot user testimonials': "User testimonials for NashBot highlight positive experiences and feedback from those who have used the chatbot.",
    'nashbot case studies': "Case studies showcasing NashBot's implementation and success stories are available on our website.",
    'nashbot best practices': "Best practices for using NashBot include clear and concise queries to receive the most accurate and relevant responses.",
    'nashbot use cases': "NashBot can be used in various scenarios, including customer support, information retrieval, and task automation.",
    'nashbot applications': "NashBot's applications include integration with websites, mobile apps, and other digital platforms for enhanced user interactions.",
    'nashbot capabilities overview': "An overview of NashBot's capabilities includes its ability to handle diverse queries, provide context-aware responses, and integrate with various services.",
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
    'nashbot contact information': "Contact information for NashBot includes details on how to reach our support team and get help with any issues or questions."
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
    'joshua apostol role in technology': "Joshua Apostol's role in technology involves developing web solutions and contributing to tech advancements.",
    'joshua apostol professional accomplishments': "Joshua Apostol's professional accomplishments include significant projects and achievements in web development.",
    'joshua apostol project details': "Details of Joshua Apostol's projects include information about his work and contributions to web development.",
    'joshua apostol developer profile': "Joshua Apostol's developer profile highlights his skills, projects, and achievements in the field of web development.",
    'joshua apostol web developer profile': "Joshua Apostol's web developer profile includes his experience, skills, and accomplishments in web development.",
    'joshua apostol career summary': "A summary of Joshua Apostol's career includes his experience, skills, and notable achievements in web development.",
    'joshua apostol work history': "Joshua Apostol's work history includes his roles and projects in web development, showcasing his experience and skills.",
    'joshua apostol portfolio overview': "An overview of Joshua Apostol's portfolio includes highlights of his projects and achievements in web development.",
    'joshua apostol career progression': "Career progression of Joshua Apostol includes his growth and development in the field of web development.",
    'joshua apostol work achievements': "Work achievements of Joshua Apostol include significant contributions and accomplishments in web development.",
    'joshua apostol technology overview': "An overview of Joshua Apostol's technology expertise includes his skills and knowledge in various programming languages and tools.",
    'joshua apostol contribution summary': "A summary of Joshua Apostol's contributions includes his work on web development projects and his impact on the tech industry.",
    'joshua apostol hacker': "Joshua Apostol is a skilled web developer, not a hacker. Any claims of hacking activities are unfounded and inaccurate.",
    'what is openai': "OpenAI is an artificial intelligence research laboratory consisting of the for-profit OpenAI LP and its parent company, the non-profit OpenAI Inc. OpenAI's mission is to ensure that artificial general intelligence (AGI) benefits all of humanity.",
    'openai introduction': "OpenAI is a leading AI research organization that aims to promote and develop friendly AI in a way that benefits humanity as a whole.",
    'openai mission': "The mission of OpenAI is to ensure that artificial general intelligence (AGI) benefits all of humanity and to create a safe and beneficial AI.",
    'openai research': "OpenAI conducts research in various fields of AI, including natural language processing, reinforcement learning, and neural networks.",
    'openai products': "OpenAI offers several AI products, including the GPT-3 language model, Codex, and DALL-E, which can perform a variety of tasks such as text generation, code completion, and image generation.",
    'openai history': "OpenAI was founded in December 2015 by Elon Musk, Sam Altman, Greg Brockman, Ilya Sutskever, Wojciech Zaremba, and John Schulman, with the goal of advancing digital intelligence in the way that is most likely to benefit humanity.",
    'openai team': "The OpenAI team is comprised of experts in AI research, engineering, policy, and communications, all working together to achieve the organization's mission.",
    'openai achievements': "OpenAI's achievements include the development of the GPT series of language models, winning the Dota 2 bot competition, and making significant advancements in AI safety research.",
    'openai safety': "OpenAI places a strong emphasis on AI safety, researching ways to ensure that AI systems are robust, reliable, and aligned with human values.",
    'openai impact': "OpenAI aims to positively impact society by developing AI technologies that augment human capabilities and solve important global challenges.",
    'openai partnerships': "OpenAI partners with various organizations, companies, and academic institutions to further its research and mission of creating safe and beneficial AI.",
    'openai publications': "OpenAI publishes research papers, blog posts, and reports on its website, sharing findings and advancements in the field of AI with the broader community.",
    'openai ethics': "OpenAI is committed to ethical AI development, ensuring that its research and technologies are used in ways that are fair, transparent, and beneficial to all.",
    'openai applications': "Applications of OpenAI's technologies include natural language processing, robotics, gaming, healthcare, and more.",
    'what is gpt': "GPT stands for Generative Pre-trained Transformer, a type of language model developed by OpenAI. It uses machine learning to generate human-like text based on the input it receives.",
    'gpt introduction': "GPT, or Generative Pre-trained Transformer, is a state-of-the-art language model developed by OpenAI that can generate coherent and contextually relevant text.",
    'gpt capabilities': "GPT models are capable of understanding and generating human-like text, performing tasks such as translation, summarization, and question-answering.",
    'gpt applications': "Applications of GPT models include chatbots, content creation, language translation, and various other natural language processing tasks.",
    'gpt versions': "There have been several versions of GPT, including GPT-2 and GPT-3, each improving on the capabilities and performance of its predecessor.",
    'gpt-3': "GPT-3 is the third generation of the Generative Pre-trained Transformer model, known for its advanced natural language understanding and generation capabilities. It has 175 billion parameters, making it one of the largest language models.",
    'gpt-3 features': "Features of GPT-3 include its ability to generate coherent text, perform complex language tasks, and provide contextually relevant responses.",
    'gpt-3 applications': "GPT-3 is used in various applications, including chatbots, virtual assistants, content generation, and more.",
    'gpt-3 limitations': "While GPT-3 is highly advanced, it still has limitations, such as sometimes producing incorrect or nonsensical answers, and it requires careful handling to ensure ethical use.",
    'what is chatgpt': "ChatGPT is a variant of the GPT-3 model designed specifically for conversational tasks, providing human-like responses in a chat format.",
    'chatgpt introduction': "ChatGPT is an AI chatbot based on the GPT-3 model, designed to engage in natural and coherent conversations with users.",
    'chatgpt capabilities': "ChatGPT can answer questions, provide explanations, assist with tasks, and engage in meaningful dialogues on a wide range of topics.",
    'chatgpt applications': "Applications of ChatGPT include customer support, virtual assistance, interactive storytelling, and more.",
    'chatgpt limitations': "ChatGPT, while advanced, may sometimes generate incorrect or inappropriate responses and requires oversight to ensure ethical use.",
    'chatgpt use cases': "Use cases for ChatGPT include creating engaging content, automating customer service, and providing educational support.",
    'are you openai': "No, I am not OpenAI. I am NashBot, here to assist you with your queries.",
    'who created you': "I was created by Nash, with the goal of providing a helpful and user-friendly AI assistant.",
    'tell me about nashbot': "NashBot is an AI assistant designed to provide helpful and accurate responses to your queries. It was created by Nash to assist users with various tasks and provide information.",
    'what is nashbot': "NashBot is an advanced AI assistant created by Nash, designed to assist with various tasks and provide informative responses.",
    'ano ang openai': "Ang OpenAI ay isang artificial intelligence research laboratory na binubuo ng for-profit na OpenAI LP at ng non-profit na OpenAI Inc. Ang misyon ng OpenAI ay tiyakin na ang artificial general intelligence (AGI) ay makikinabang sa buong sangkatauhan.",
    'ano ang gpt': "Ang GPT ay nangangahulugang Generative Pre-trained Transformer, isang uri ng language model na binuo ng OpenAI. Ginagamit nito ang machine learning upang makabuo ng tekstong katulad ng ginawa ng tao batay sa input na natatanggap nito.",
    'ano ang chatgpt': "Ang ChatGPT ay isang variant ng GPT-3 model na idinisenyo partikular para sa mga conversational tasks, nagbibigay ng mga human-like na tugon sa isang chat format.",
    'ano ang nashbot': "Ang NashBot ay isang AI assistant na idinisenyo upang magbigay ng kapaki-pakinabang at tumpak na tugon sa iyong mga katanungan. Ito ay nilikha ni Nash upang tulungan ang mga gumagamit sa iba't ibang gawain at magbigay ng impormasyon.",
    'sino si nash': "Si Nash ang lumikha ng NashBot. Siya ay isang AI developer na naglalayong magbigay ng mga kapaki-pakinabang na AI assistant para sa iba't ibang pangangailangan.",
    'ano ang ginagawa ni nashbot': "Ang NashBot ay idinisenyo upang magbigay ng mga kapaki-pakinabang na tugon sa iyong mga katanungan, tulungan ka sa iba't ibang gawain, at magbigay ng impormasyon sa iba't ibang paksa.",
    'can you tell me about openai': "OpenAI is an AI research organization that aims to ensure that artificial general intelligence (AGI) benefits all of humanity.",
    'can you tell me about gpt': "GPT, or Generative Pre-trained Transformer, is a state-of-the-art language model developed by OpenAI that can generate human-like text.",
    'can you tell me about chatgpt': "ChatGPT is an AI chatbot based on the GPT-3 model, designed to engage in natural and coherent conversations with users.",
    'can you tell me about nashbot': "NashBot is an AI assistant created by Nash to provide helpful and accurate responses to your queries.",
    'cuéntame sobre openai': "OpenAI es un laboratorio de investigación en inteligencia artificial compuesto por OpenAI LP con fines de lucro y su empresa matriz, la organización sin fines de lucro OpenAI Inc.",
    'cuéntame sobre gpt': "GPT, o Generative Pre-trained Transformer, es un modelo de lenguaje de vanguardia desarrollado por OpenAI que puede generar texto humano.",
    'cuéntame sobre chatgpt': "ChatGPT es un chatbot de IA basado en el modelo GPT-3, diseñado para entablar conversaciones naturales y coherentes con los usuarios.",
    'cuéntame sobre nashbot': "NashBot es un asistente de IA creado por Nash para proporcionar respuestas útiles y precisas a tus consultas.",
    'qui est openai': "OpenAI est un laboratoire de recherche en intelligence artificielle composé d'OpenAI LP à but lucratif et de sa société mère, l'organisation à but non lucratif OpenAI Inc.",
    'qui est gpt': "GPT, ou Generative Pre-trained Transformer, est un modèle de langage de pointe développé par OpenAI qui peut générer du texte humain.",
    'qui est chatgpt': "ChatGPT est un chatbot IA basé sur le modèle GPT-3, conçu pour engager des conversations naturelles et cohérentes avec les utilisateurs.",
    'qui est nashbot': "NashBot est un assistant IA créé par Nash pour fournir des réponses utiles et précises à vos questions.",
    'kinsa si openai': "Ang OpenAI kay usa ka artipisyal nga intelligence research laboratory nga naglangkob sa for-profit nga OpenAI LP ug ang non-profit nga OpenAI Inc. Ang misyon sa OpenAI mao ang pagsiguro nga ang artificial general intelligence (AGI) makapahimulos sa tanan nga katawhan.",
    'kinsa si gpt': "Ang GPT nagpasabot og Generative Pre-trained Transformer, usa ka matang sa language model nga gihimo sa OpenAI. Gigamit niini ang machine learning aron makahimo og text nga sama sa binuhat sa tawo base sa input nga madawat niini.",
    'kinsa si chatgpt': "Ang ChatGPT usa ka variant sa GPT-3 model nga gidisenyo partikular para sa mga conversational tasks, naghatag og mga human-like nga tubag sa usa ka chat format.",
    'kinsa si nashbot': "Ang NashBot usa ka AI assistant nga gidisenyo aron maghatag og mga mapuslanon ug tukma nga tubag sa imong mga pangutana. Kini gihimo ni Nash aron tabangan ang mga tiggamit sa lainlaing buluhaton ug maghatag og impormasyon.",
    'kinsa si nash': "Si Nash ang naghimo sa NashBot. Siya usa ka AI developer nga nagtinguha nga maghatag og mga mapuslanon nga AI assistant para sa lainlaing panginahanglan."
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

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});