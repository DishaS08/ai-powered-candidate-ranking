# Recycling Production Line Manager Selection System

A comprehensive candidate ranking system for recycling production line manager positions, featuring database design, AI evaluation prompts, and an interactive dashboard.

## 🎯 Project Overview

This system evaluates and ranks candidates based on three key criteria:
- **Crisis Management** (30% weight)
- **Sustainability Knowledge** (30% weight)
- **Team Motivation** (30% weight)

## 📁 Project Structure

```
recycling-manager-selection/
├── database/               # MySQL database schema and sample data
│   ├── schema.sql         # Database structure with triggers
│   └── sample_data.sql    # 40 generated candidate records
├── generator/             # Candidate data generation
│   ├── generate-candidates.js
│   └── package.json
├── ai-prompts/            # AI evaluation prompts
│   └── evaluation-prompts.md
├── dashboard/             # React + Vite dashboard
│   └── src/
│       ├── components/
│       ├── data/
│       └── App.tsx
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MySQL (optional, for database testing)

### 1. Generate Candidate Data

```bash
cd generator
npm install
npm run generate
```

This creates:
- `output/candidates.json` - JSON data for dashboard
- `output/sample_data.sql` - SQL INSERT statements

### 2. Set Up Database (Optional)

```bash
mysql -u root -p
CREATE DATABASE recycling_manager_db;
USE recycling_manager_db;
SOURCE database/schema.sql;
SOURCE database/sample_data.sql;
```

### 3. Run Dashboard

```bash
cd dashboard
npm install
npm run dev
```

Visit `http://localhost:5173` to view the dashboard.

## 📊 Dashboard Features

### Leaderboard
- Top 10 candidates ranked by total score
- Color-coded performance indicators
- Sortable columns
- Click to view detailed profiles

### Skills Heatmap
- Visual representation of evaluation scores
- Color gradient: Green (90+), Blue (80-89), Orange (70-79), Red (60-69)
- Interactive tooltips

### Candidate Cards
- Detailed profiles with contact information
- Progress bars for each evaluation category
- Skills and certifications
- **Share button** to copy candidate details

### Search & Filter
- Search by name or email
- Filter by specific skills
- Real-time results

## 🗄️ Database Design

### Tables

**candidates**
- Primary candidate information
- Skills stored as JSON
- Indexed on `years_experience` and `email`

**evaluations**
- AI-generated scores (0-100 scale)
- Three evaluation categories
- AI feedback stored as JSON
- Foreign key to `candidates`

**rankings**
- Auto-calculated total scores
- Rank position
- Updated via trigger

### Auto-Update Trigger

When a new evaluation is inserted, the `update_rankings_after_evaluation` trigger:
1. Calculates average of three scores
2. Updates/inserts into `rankings` table
3. Recalculates all rank positions

## 🤖 AI Evaluation Prompts

Located in `ai-prompts/evaluation-prompts.md`, featuring:

### 1. Crisis Management Prompt
- Scenario: 2 AM fire emergency
- Rubric: Decision-making (30%), Safety (25%), Resources (25%), Communication (20%)

### 2. Sustainability Knowledge Prompt
- Challenge: Reduce contamination & energy costs
- Rubric: Technical Knowledge (35%), Innovation (30%), Feasibility (35%)

### 3. Team Motivation Prompt
- Situation: Low morale team turnaround
- Rubric: Emotional Intelligence (30%), Engagement (35%), Results (35%)

Each prompt includes:
- Detailed scenario descriptions
- Scoring rubrics with point breakdowns
- Ideal response elements
- Integration guidelines

## 🛠️ Technology Stack

### Frontend
- **React** with TypeScript
- **Vite** for build tooling
- **Mantine UI** for components
- **Recharts** for visualizations
- **Tabler Icons** for iconography

### Data Generation
- **Faker.js** for realistic candidate profiles
- **Node.js** for scripting

### Database
- **MySQL** compatible schema
- Triggers and indexes for performance

## 📈 Data Statistics

- **40 candidates** generated
- Average score: ~80.19
- Score distribution: Normal curve (mean=80, σ=10)
- Skills: 12 categories (4-8 per candidate)
- Certifications: 8 types (2-4 per candidate)

## 🎨 Design Highlights

- **Gradient header** for visual appeal
- **Color-coded badges** for instant score recognition
- **Responsive grid** for candidate cards
- **Interactive elements** with hover states
- **Dark/Light mode** support (Mantine)

## 📝 Assignment Submission

### GitHub Repository Contents
1. Source code (this directory)
2. SQL schema files
3. AI prompts document
4. This README

### Demo Materials
- Run `npm run dev` in dashboard folder
- Take screenshots of:
  - Leaderboard view
  - Skills heatmap
  - Candidate card details
  - Search/filter functionality

### Evaluation Criteria Alignment

| Criterion | Weight | Implementation |
|-----------|--------|----------------|
| Database Design | 30% | ✅ Schema, triggers, indexes, 40 records |
| AI Prompting | 30% | ✅ 3 detailed prompts with rubrics |
| Dashboard | 20% | ✅ Leaderboard, heatmap, cards, filters |
| Random Data | 20% | ✅ Faker.js, realistic profiles |

## 🎁 Bonus Features

✅ **Share Candidate Button** - Copy details to clipboard  
✅ **Search & Filter** - Real-time candidate filtering  
✅ **Color-Coded Visualization** - Instant performance recognition  
✅ **Responsive Design** - Works on mobile and desktop

## 🧪 Testing

### Build Test
```bash
cd dashboard
npm run build
npm run preview
```

### Database Test
```bash
mysql -u root -p recycling_manager_db < database/schema.sql
mysql -u root -p recycling_manager_db < database/sample_data.sql
mysql -u root -p recycling_manager_db -e "SELECT * FROM candidate_leaderboard LIMIT 10;"
```

### Regenerate Data
```bash
cd generator
npm run generate
# Copy new candidates.json to dashboard/src/data/
```

## 📞 Support

For questions or issues:
1. Check the AI prompts documentation
2. Review SQL schema comments
3. Inspect component code in `dashboard/src/components/`

## 🏆 Features Summary

- ✅ MySQL database with auto-ranking triggers
- ✅ 40 realistic candidates via Faker.js
- ✅ 3 comprehensive AI evaluation prompts
- ✅ Interactive React dashboard with Mantine UI
- ✅ Sortable leaderboard
- ✅ Visual skill heatmap
- ✅ Detailed candidate cards
- ✅ Search and filter functionality
- ✅ Share candidate feature
- ✅ Responsive design
- ✅ Production-ready build

---

**Built with care for G CP assignment** 🌱♻️
