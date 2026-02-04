# Database Schema Documentation

## Overview
This MySQL database schema supports the Recycling Production Line Manager Selection System with auto-updating rankings.

## Tables

### 1. candidates
Stores primary candidate information.

**Columns:**
- `id` (INT, PRIMARY KEY, AUTO_INCREMENT)
- `name` (VARCHAR(255), NOT NULL)
- `email` (VARCHAR(255), UNIQUE, NOT NULL)
- `phone` (VARCHAR(20))
- `years_experience` (INT, NOT NULL)
- `education` (VARCHAR(255))
- `certifications` (TEXT)
- `skills` (JSON) - Array of skill strings
- `created_at` (TIMESTAMP)

**Indexes:**
- Primary key on `id`
- Unique index on `email`
- Index on `years_experience`

### 2. evaluations
Stores AI-generated evaluation scores.

**Columns:**
- `id` (INT, PRIMARY KEY, AUTO_INCREMENT)
- `candidate_id` (INT, FOREIGN KEY → candidates.id)
- `crisis_management_score` (DECIMAL(5,2), 0-100)
- `sustainability_score` (DECIMAL(5,2), 0-100)
- `team_motivation_score` (DECIMAL(5,2), 0-100)
- `ai_feedback` (JSON) - Detailed AI analysis
- `evaluated_at` (TIMESTAMP)

**Constraints:**
- CHECK scores between 0 and 100
- CASCADE delete with candidates

**Indexes:**
- Primary key on `id`
- Index on `candidate_id`
- Index on `evaluated_at`

### 3. rankings
Auto-calculated candidate rankings.

**Columns:**
- `id` (INT, PRIMARY KEY, AUTO_INCREMENT)
- `candidate_id` (INT, UNIQUE, FOREIGN KEY → candidates.id)
- `total_score` (DECIMAL(6,2))
- `rank` (INT)
- `last_updated` (TIMESTAMP, auto-update)

**Indexes:**
- Primary key on `id`
- Unique index on `candidate_id`
- DESC index on `total_score`
- Index on `rank`

## Trigger: update_rankings_after_evaluation

**Fires:** AFTER INSERT ON evaluations

**Logic:**
1. Calculate total score = AVG(crisis, sustainability, motivation)
2. INSERT or UPDATE rankings for candidate
3. Recalculate all ranks by ordering total_score DESC

**Example:**
```sql
INSERT INTO evaluations (candidate_id, crisis_management_score, sustainability_score, team_motivation_score)
VALUES (1, 85.5, 90.0, 88.3);
-- Trigger automatically updates rankings table
```

## Views

### candidate_leaderboard
Joins candidates, evaluations, and rankings for easy querying.

**Usage:**
```sql
SELECT * FROM candidate_leaderboard ORDER BY rank LIMIT 10;
```

## Sample Queries

### Top 10 Candidates
```sql
SELECT name, total_score, rank 
FROM rankings r
JOIN candidates c ON r.candidate_id = c.id
ORDER BY rank
LIMIT 10;
```

### Candidates by Skill
```sql
SELECT name, skills
FROM candidates
WHERE JSON_CONTAINS(skills, '"Crisis Management"');
```

### Average Scores
```sql
SELECT 
  AVG(crisis_management_score) as avg_crisis,
  AVG(sustainability_score) as avg_sustainability,
  AVG(team_motivation_score) as avg_motivation
FROM evaluations;
```

## Setup Instructions

1. Create database:
```bash
mysql -u root -p
CREATE DATABASE recycling_manager_db;
USE recycling_manager_db;
```

2. Import schema:
```bash
SOURCE schema.sql;
```

3. Import sample data:
```bash
SOURCE sample_data.sql;
```

4. Verify:
```sql
SELECT COUNT(*) FROM candidates;  -- Should return 40
SELECT * FROM rankings ORDER BY rank LIMIT 10;
```
