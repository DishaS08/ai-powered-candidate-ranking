export interface Candidate {
    id: number;
    name: string;
    email: string;
    phone: string;
    years_experience: number;
    education: string;
    certifications: string[];
    skills: string[];
    evaluation: {
        crisis_management_score: number;
        sustainability_score: number;
        team_motivation_score: number;
        total_score: number;
    };
}
