import { faker } from '@faker-js/faker';
import fs from 'fs';
import path from 'path';

// Configuration
const NUM_CANDIDATES = 40;
const OUTPUT_DIR = './output';

// Indian names for realistic candidate generation
const INDIAN_FIRST_NAMES = [
  'Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Reyansh', 'Ayaan', 'Krishna', 'Ishaan', 'Shaurya',
  'Atharva', 'Advait', 'Pranav', 'Vedant', 'Kabir', 'Dhruv', 'Aryan', 'Yuvraj', 'Raghav', 'Aayush',
  'Aadhya', 'Saanvi', 'Ananya', 'Diya', 'Anika', 'Navya', 'Pari', 'Shanaya', 'Myra', 'Aarohi',
  'Sara', 'Kiara', 'Aditi', 'Kavya', 'Riya', 'Prisha', 'Avni', 'Zara', 'Ishika', 'Siya',
  'Rohan', 'Raj', 'Karan', 'Amit', 'Rahul', 'Nikhil', 'Varun', 'Siddharth', 'Akash', 'Harsh',
  'Priya', 'Neha', 'Sneha', 'Pooja', 'Anjali', 'Divya', 'Shruti', 'Megha', 'Nisha', 'Isha'
];

const INDIAN_LAST_NAMES = [
  'Sharma', 'Patel', 'Kumar', 'Singh', 'Mehta', 'Gupta', 'Reddy', 'Nair', 'Iyer', 'Rao',
  'Agarwal', 'Joshi', 'Desai', 'Shah', 'Kapoor', 'Malhotra', 'Chopra', 'Verma', 'Khanna', 'Bhatia',
  'Chatterjee', 'Banerjee', 'Mukhopadhyay', 'Das', 'Ghosh', 'Menon', 'Pillai', 'Krishnan', 'Srinivasan', 'Subramanian',
  'Gandhi', 'Modi', 'Thakur', 'Pandey', 'Tiwari', 'Mishra', 'Yadav', 'Chauhan', 'Jain', 'Saxena',
  'Kulkarni', 'Deshpande', 'Bhatt', 'Trivedi', 'Hegde', 'Shetty', 'Kamath', 'Bhat', 'Suryawanshi', 'Rathore'
];

// Skill categories for recycling production line managers
const SKILLS = [
  'Crisis Management',
  'Sustainability',
  'Team Leadership',
  'Quality Control',
  'Process Optimization',
  'Safety Management',
  'Waste Reduction',
  'Recycling Technology',
  'Regulatory Compliance',
  'Budget Management',
  'Conflict Resolution',
  'Performance Analytics'
];

const EDUCATION_LEVELS = [
  'Bachelor of Science in Environmental Engineering',
  'Bachelor of Science in Industrial Engineering',
  'Bachelor of Science in Business Administration',
  'Master of Science in Environmental Management',
  'Master of Business Administration (MBA)',
  'Bachelor of Science in Mechanical Engineering',
  'Master of Science in Sustainability',
  'Bachelor of Science in Chemical Engineering'
];

const CERTIFICATIONS = [
  'LEED Green Associate',
  'Certified Recycling Professional (CRP)',
  'Six Sigma Green Belt',
  'OSHA Safety Certification',
  'ISO 14001 Environmental Management',
  'Lean Manufacturing Certification',
  'Project Management Professional (PMP)',
  'Zero Waste Certification'
];

// Generate weighted random score (60-100 range with normal distribution)
function generateScore() {
  // Using Box-Muller transform for normal distribution
  const mean = 80;
  const stdDev = 10;
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  const num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  const score = num * stdDev + mean;
  return Math.max(60, Math.min(100, score)).toFixed(2);
}

// Generate a single candidate
function generateCandidate(id) {
  const firstName = INDIAN_FIRST_NAMES[Math.floor(Math.random() * INDIAN_FIRST_NAMES.length)];
  const lastName = INDIAN_LAST_NAMES[Math.floor(Math.random() * INDIAN_LAST_NAMES.length)];
  const name = `${firstName} ${lastName}`;
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`;
  const phone = faker.phone.number('+91-#####-#####');
  const yearsExperience = faker.number.int({ min: 1, max: 25 });

  // Select random skills (4-8 skills per candidate)
  const numSkills = faker.number.int({ min: 4, max: 8 });
  const candidateSkills = faker.helpers.arrayElements(SKILLS, numSkills);

  const education = faker.helpers.arrayElement(EDUCATION_LEVELS);

  // Select 2-4 certifications
  const numCerts = faker.number.int({ min: 2, max: 4 });
  const certs = faker.helpers.arrayElements(CERTIFICATIONS, numCerts);

  // Generate AI evaluation scores
  const crisisScore = generateScore();
  const sustainabilityScore = generateScore();
  const teamMotivationScore = generateScore();
  const totalScore = ((parseFloat(crisisScore) + parseFloat(sustainabilityScore) + parseFloat(teamMotivationScore)) / 3).toFixed(2);

  return {
    id,
    name,
    email,
    phone,
    years_experience: yearsExperience,
    education,
    certifications: certs,
    skills: candidateSkills,
    evaluation: {
      crisis_management_score: parseFloat(crisisScore),
      sustainability_score: parseFloat(sustainabilityScore),
      team_motivation_score: parseFloat(teamMotivationScore),
      total_score: parseFloat(totalScore)
    }
  };
}

// Generate all candidates
function generateAllCandidates() {
  const candidates = [];
  for (let i = 1; i <= NUM_CANDIDATES; i++) {
    candidates.push(generateCandidate(i));
  }
  // Sort by total score descending
  candidates.sort((a, b) => b.evaluation.total_score - a.evaluation.total_score);
  return candidates;
}

// Convert candidates to SQL INSERT statements
function generateSQL(candidates) {
  let sql = '-- Sample data for Recycling Production Line Manager Selection System\n';
  sql += '-- Generated with Faker.js\n\n';
  sql += 'USE recycling_manager_db;\n\n';

  // Insert candidates
  sql += '-- ============================================\n';
  sql += '-- INSERT CANDIDATES\n';
  sql += '-- ============================================\n';
  candidates.forEach(candidate => {
    const skillsJSON = JSON.stringify(candidate.skills).replace(/'/g, "''");
    const certsText = candidate.certifications.join(', ');
    sql += `INSERT INTO candidates (id, name, email, phone, years_experience, education, certifications, skills) VALUES\n`;
    sql += `(${candidate.id}, '${candidate.name.replace(/'/g, "''")}', '${candidate.email}', '${candidate.phone}', ${candidate.years_experience}, '${candidate.education.replace(/'/g, "''")}', '${certsText.replace(/'/g, "''")}', '${skillsJSON}');\n\n`;
  });

  // Insert evaluations
  sql += '\n-- ============================================\n';
  sql += '-- INSERT EVALUATIONS\n';
  sql += '-- ============================================\n';
  candidates.forEach(candidate => {
    const feedback = JSON.stringify({
      crisis_management: 'Strong decision-making capabilities in high-pressure situations',
      sustainability: 'Excellent understanding of recycling processes and environmental impact',
      team_motivation: 'Effective leadership style with focus on team engagement'
    }).replace(/'/g, "''");

    sql += `INSERT INTO evaluations (candidate_id, crisis_management_score, sustainability_score, team_motivation_score, ai_feedback) VALUES\n`;
    sql += `(${candidate.id}, ${candidate.evaluation.crisis_management_score}, ${candidate.evaluation.sustainability_score}, ${candidate.evaluation.team_motivation_score}, '${feedback}');\n\n`;
  });

  return sql;
}

// Main execution
async function main() {
  console.log('🎲 Generating 40 realistic candidate profiles...\n');

  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Generate candidates
  const candidates = generateAllCandidates();

  // Save as JSON
  const jsonPath = path.join(OUTPUT_DIR, 'candidates.json');
  fs.writeFileSync(jsonPath, JSON.stringify(candidates, null, 2));
  console.log(`✅ JSON data saved to: ${jsonPath}`);

  // Save as SQL
  const sqlContent = generateSQL(candidates);
  const sqlPath = path.join(OUTPUT_DIR, 'sample_data.sql');
  fs.writeFileSync(sqlPath, sqlContent);
  console.log(`✅ SQL data saved to: ${sqlPath}`);

  // Display summary
  console.log('\n📊 Generation Summary:');
  console.log(`   • Total candidates: ${candidates.length}`);
  console.log(`   • Average total score: ${(candidates.reduce((sum, c) => sum + c.evaluation.total_score, 0) / candidates.length).toFixed(2)}`);
  console.log(`   • Top score: ${candidates[0].evaluation.total_score} (${candidates[0].name})`);
  console.log(`   • Lowest score: ${candidates[candidates.length - 1].evaluation.total_score} (${candidates[candidates.length - 1].name})`);
  console.log('\n✨ Candidate generation complete!\n');
}

main();
