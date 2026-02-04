# AI Evaluation Prompts for Recycling Production Line Manager Selection

This document contains three comprehensive AI prompts designed to evaluate candidates for the Recycling Production Line Manager role. Each prompt includes scenario-based questions, evaluation rubrics, and scoring guidelines.

---

## Prompt 1: Crisis Management Evaluation

### Context
You are evaluating a candidate for a Recycling Production Line Manager position. This role requires exceptional crisis management skills as the manager will face equipment failures, safety incidents, and operational disruptions regularly.

### Prompt

```
Evaluate the following candidate's crisis management capabilities based on their response to this scenario:

SCENARIO:
It's 2 AM when you receive an emergency call. A fire has broken out in the sorting facility due to a lithium battery explosion in the recycling stream. The fire suppression system has activated, but smoke is spreading. Your night shift team of 12 workers is on-site, and the facility processes 200 tons of material daily. The facility must remain closed until cleared by fire safety inspectors.

QUESTIONS:
1. What are your immediate actions in the first 5 minutes?
2. How do you prioritize safety, communication, and damage control?
3. What steps would you take in the following 24 hours to address the situation?
4. How would you prevent similar incidents in the future?

CANDIDATE RESPONSE:
[Insert candidate's response here]

---

Please evaluate this response using the following rubric and provide a score out of 100:
```

### Scoring Rubric

| Criterion | Weight | Scoring Guidelines |
|-----------|--------|-------------------|
| **Decision-Making Speed** | 30% | - Immediate evacuation protocol (10 pts)<br>- Emergency services notification (10 pts)<br>- Clear command structure (10 pts) |
| **Safety Prioritization** | 25% | - Worker safety first (10 pts)<br>- Facility containment (8 pts)<br>- Environmental impact consideration (7 pts) |
| **Resource Allocation** | 25% | - Team deployment strategy (10 pts)<br>- Budget management for repairs (8 pts)<br>- Supply chain contingency (7 pts) |
| **Communication Clarity** | 20% | - Stakeholder updates (7 pts)<br>- Team briefings (7 pts)<br>- Regulatory reporting (6 pts) |

**Total Score: /100**

### Ideal Response Elements
-  Immediate evacuation and headcount verification
-  Fire department and hazmat team notification
-  Client communication about processing delays
-  Root cause analysis (lithium battery screening failure)
-  Implementation of enhanced battery detection systems
-  Staff training on hazardous material identification

---

## Prompt 2: Sustainability Knowledge Evaluation

### Context
The Recycling Production Line Manager must demonstrate deep understanding of sustainability principles, recycling regulations, and circular economy concepts.

### Prompt

```
Evaluate the candidate's sustainability knowledge and innovation capabilities based on their response to this challenge:

SCENARIO:
Your recycling facility currently has a contamination rate of 15% (industry average is 10%). This means 15% of incoming material cannot be recycled and must be sent to landfill, costing $50,000 annually in disposal fees. Additionally, your facility's energy consumption is 20% higher than comparable operations.

CHALLENGE:
1. Identify THREE specific strategies to reduce contamination rates to below 8%
2. Propose TWO energy efficiency improvements with estimated ROI
3. Design a waste-to-resource initiative that could generate new revenue
4. Explain how you would measure and track sustainability KPIs

CANDIDATE RESPONSE:
[Insert candidate's response here]

---

Please evaluate using the rubric below and provide a score out of 100:
```

### Scoring Rubric

| Criterion | Weight | Scoring Guidelines |
|-----------|--------|-------------------|
| **Technical Knowledge** | 35% | - Understanding of recycling processes (12 pts)<br>- Regulatory compliance awareness (12 pts)<br>- Industry best practices (11 pts) |
| **Innovation & Creativity** | 30% | - Novel contamination reduction methods (10 pts)<br>- Energy efficiency solutions (10 pts)<br>- Revenue generation ideas (10 pts) |
| **Implementation Feasibility** | 35% | - Realistic cost estimates (12 pts)<br>- Clear timelines (12 pts)<br>- Measurable KPIs (11 pts) |

**Total Score: /100**

### Ideal Response Elements
-  Source separation education programs
-  AI-powered optical sorting technology
-  Solar panel installation with 3-5 year payback
-  LED lighting retrofit with immediate savings
-  Composting program for organic contamination
-  Partnership with manufacturers for closed-loop recycling
-  Monthly contamination audits and dashboards

---

## Prompt 3: Team Motivation & Leadership Evaluation

### Context
Managing a recycling production line requires motivating teams through repetitive, physically demanding work while maintaining high safety and quality standards.

### Prompt

```
Evaluate the candidate's leadership and team motivation capabilities based on their approach to this situation:

SCENARIO:
You've just taken over as manager of a recycling facility with serious morale issues:
- 40% annual turnover rate (industry average is 25%)
- Productivity has declined 15% over the past 6 months
- Recent employee survey shows low engagement scores (3.2/10)
- Workers complain about lack of recognition, unsafe conditions, and poor communication
- You have a diverse team: 30% are recent immigrants, 25% are under 25 years old, average tenure is 18 months

CHALLENGE:
1. Outline your 90-day plan to improve team morale and engagement
2. Describe your leadership style and how you'd adapt it to this team
3. What specific initiatives would you implement to reduce turnover?
4. How would you measure success in team motivation?

CANDIDATE RESPONSE:
[Insert candidate's response here]

---

Please evaluate using the rubric below and provide a score out of 100:
```

### Scoring Rubric

| Criterion | Weight | Scoring Guidelines |
|-----------|--------|-------------------|
| **Emotional Intelligence** | 30% | - Understanding team pain points (10 pts)<br>- Empathy and cultural awareness (10 pts)<br>- Conflict resolution approach (10 pts) |
| **Engagement Strategies** | 35% | - Recognition programs (12 pts)<br>- Communication improvements (12 pts)<br>- Professional development opportunities (11 pts) |
| **Results Orientation** | 35% | - Data-driven approach (12 pts)<br>- Clear success metrics (12 pts)<br>- Realistic timeline (11 pts) |

**Total Score: /100**

### Ideal Response Elements
-  One-on-one listening sessions with all team members
-  Safety improvement task force
-  Monthly town halls with transparent communication
-  Recognition program (Employee of the Month, safety awards)
-  Career development pathways (operator → lead → supervisor)
-  Language training programs for diverse workforce
-  Team-building activities and shift competitions
-  Quarterly engagement surveys with action plans

---

## Using These Prompts

### For AI API Integration (Claude, GPT-4, etc.)

1. **Format candidate responses** from interviews or written submissions
2. **Send to AI model** with the complete prompt including scenario and rubric
3. **Request structured output**:
   ```json
   {
     "category": "Crisis Management",
     "score": 85.5,
     "breakdown": {
       "decision_making_speed": 27,
       "safety_prioritization": 22,
       "resource_allocation": 20,
       "communication_clarity": 16.5
     },
     "feedback": "Candidate demonstrated strong immediate response...",
     "strengths": ["Quick evacuation protocol", "Clear communication"],
     "improvements": ["Could enhance long-term prevention strategies"]
   }
   ```

### For Mock Responses (Development/Testing)

Use randomized scoring with weighted distributions:
- **Excellent candidates**: 85-95 range
- **Good candidates**: 75-84 range  
- **Average candidates**: 65-74 range
- **Below average**: 60-64 range

### Integration with Database

Store AI feedback in the `evaluations.ai_feedback` JSON column:
```sql
INSERT INTO evaluations (candidate_id, crisis_management_score, sustainability_score, team_motivation_score, ai_feedback)
VALUES (1, 87.5, 82.0, 90.5, '{
  "crisis_management": {
    "strengths": ["Immediate action", "Safety focus"],
    "improvements": ["Cost analysis depth"]
  },
  "sustainability": {
    "strengths": ["Innovative solutions", "ROI awareness"],
    "improvements": ["Regulatory detail"]
  },
  "team_motivation": {
    "strengths": ["Empathy", "Structured plan"],
    "improvements": ["Diversity inclusion depth"]
  }
}');
```

---

## Evaluation Standards

### Score Interpretation
- **90-100**: Exceptional - Top 10% candidate
- **80-89**: Excellent - Strong hire recommendation
- **70-79**: Good - Recommended with minor reservations
- **60-69**: Acceptable - Requires additional evaluation
- **Below 60**: Not recommended for this role

### Consistency Guidelines
- All three scores should be within 15 points for a balanced candidate
- Red flag if crisis management score is below 70 (critical for role)
- Sustainability score below 65 suggests insufficient technical knowledge
- Team motivation below 70 indicates potential retention risk
