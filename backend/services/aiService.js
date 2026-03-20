const OpenAI = require('openai');

let openai;
try {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
} catch (e) {
  console.warn("OpenAI API key is missing. AI Features will not work until it is configured.");
}

const checkKeys = () => {
  if (!openai || !process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
    throw new Error("OpenAI API Key is missing. Please configure OPENAI_API_KEY in the .env file.");
  }
};

exports.performGapAnalysis = async (resumeText, jdText) => {
  checkKeys();
  const prompt = `
    You are an expert technical recruiter and career coach.
    I will provide you with a candidate's Resume text and a Job Description text.
    Your task is to analyze them and extract:
    1. A normalized list of skills the candidate has.
    2. A Job Readiness Score (0-100%).
    3. Categorize the required skills into: Matched Skills, Missing Skills, and Weak Skills.

    Return the result STRICTLY as a JSON object with this structure:
    {
      "readinessScore": 85,
      "matchedSkills": ["React", "Node.js"],
      "missingSkills": ["AWS", "Docker"],
      "weakSkills": ["Python"]
    }

    Resume:
    ${resumeText}

    Job Description:
    ${jdText}
  `;

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.2,
    response_format: { type: 'json_object' }
  });

  return JSON.parse(response.choices[0].message.content);
};

exports.createLearningRoadmap = async (analysis) => {
  checkKeys();
  const prompt = `
    You are an expert technical career coach.
    Based on the following skill gap analysis, create a structured and personalized learning roadmap for the candidate to acquire the missing and weak skills.
    
    Analysis data:
    ${JSON.stringify(analysis)}

    Return the result STRICTLY as a JSON object with this structure:
    {
      "roadmap": [
        {
          "id": 1,
          "skill": "AWS",
          "title": "Learn AWS Basics",
          "duration": "2 weeks",
          "difficulty": "Beginner",
          "resources": [
            { "name": "AWS Certified Cloud Practitioner (YouTube)", "url": "https://youtube.com/..." }
          ],
          "miniProject": "Deploy a static site to S3"
        }
      ]
    }
  `;

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.2,
    response_format: { type: 'json_object' }
  });

  return JSON.parse(response.choices[0].message.content);
};

exports.getChatReply = async (message, context) => {
  checkKeys();
  const prompt = `
    You are an AI learning assistant for a candidate. 
    Here is the context of their current skill analysis and learning roadmap:
    ${JSON.stringify(context)}

    The user says: "${message}"

    Respond concisely and helpfully, tailoring your advice to the context above.
  `;

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  });

  return response.choices[0].message.content;
};
