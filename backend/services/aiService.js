// Helper for skills normalization: Lowercase, trim
const normalize = (skill) => {
  if (typeof skill !== 'string') return '';
  return skill.toLowerCase().trim();
};

exports.performGapAnalysis = async (resumeText, jdText) => {
  // 1. Pre-process texts: Split by comma and normalize
  const tokenize = (text) => text.split(',').map(normalize).filter(t => t.length > 0);
  
  // Create unique sets of skills
  const resumeSkillsArray = tokenize(resumeText);
  const jdSkillsArray = tokenize(jdText);
  
  const resumeSkillsSet = new Set(resumeSkillsArray);
  const jdSkillsSet = new Set(jdSkillsArray);

  // 2. Identify matches (Case-insensitive comparison via normalization)
  // We'll use the original formatting for display if possible, but for comparison we use the normalized versions.
  // To keep it simple, we'll just use the normalized versions for everything since the user is providing them.
  
  const matchedSkills = jdSkillsArray.filter(skill => resumeSkillsSet.has(skill));
  const missingSkills = jdSkillsArray.filter(skill => !resumeSkillsSet.has(skill));
  
  // Avoid duplicates in the final list (if user input same skill multiple times)
  const uniqueMatched = [...new Set(matchedSkills)];
  const uniqueMissing = [...new Set(missingSkills)];

  const readinessScore = jdSkillsArray.length > 0 
    ? Math.round((matchedSkills.length / jdSkillsArray.length) * 100) 
    : 0;

  const weakSkills = []; // For this simple logic, we don't have "weak" skills, only matched or missing.

  const roadmap = uniqueMissing.map((skill, index) => ({
    id: index + 1,
    skill: skill.charAt(0).toUpperCase() + skill.slice(1), // Capitalize for display
    duration: '2-4 weeks',
    resources: [
      `Learn ${skill} on YouTube`,
      `Official ${skill} Documentation`
    ],
    project: `Build a small application using ${skill}`
  }));

  return {
    matchedSkills: uniqueMatched.map(s => s.charAt(0).toUpperCase() + s.slice(1)),
    missingSkills: uniqueMissing.map(s => s.charAt(0).toUpperCase() + s.slice(1)),
    weakSkills,
    readinessScore,
    roadmap
  };
};

exports.getChatReply = async (message, context) => {
  const msg = message.toLowerCase();
  if (msg.includes('how') || msg.includes('roadmap') || msg.includes('step')) {
    return "The roadmap I generated focuses on your missing skills. You should start with the first step and build a small project to solidify your learning.";
  }
  if (msg.includes('score') || msg.includes('readiness')) {
    return `Your current readiness score is ${context.readinessScore}%. Adding more skills from the job description to your resume will increase this score.`;
  }
  return "I'm here to help you bridge your skill gaps. Focus on the missing skills in your roadmap to become more ready for this role!";
};

