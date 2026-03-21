const aiService = require('../backend/services/aiService');


const test = async () => {
  const resumeText = "React, Node.js, SQL, Java";
  const jdText = "React, Docker, SQL, AWS, Python";

  console.log("Testing with:");
  console.log("Resume:", resumeText);
  console.log("JD:", jdText);

  const result = await aiService.performGapAnalysis(resumeText, jdText);
  
  console.log("\nResults:");
  console.log("Matched Skills:", result.matchedSkills);
  console.log("Missing Skills:", result.missingSkills);
  console.log("Readiness Score:", result.readinessScore + "%");
  
  if (result.matchedSkills.length === 2 && 
      result.missingSkills.length === 3 && 
      result.readinessScore === 40) {
    console.log("\nSUCCESS: Logic is correct!");
  } else {
    console.log("\nFAILURE: Logic is incorrect.");
    console.log("Expected: 2 matches, 3 missing, 40%");
  }
};

test();
