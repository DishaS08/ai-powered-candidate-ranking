-- Recycling Production Line Manager Selection System - Database Schema
-- MySQL-compatible database design with auto-updating rankings

-- Drop existing tables if they exist
DROP TABLE IF EXISTS rankings;
DROP TABLE IF EXISTS evaluations;
DROP TABLE IF EXISTS candidates;

-- ============================================
-- CANDIDATES TABLE
-- ============================================
CREATE TABLE candidates (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    years_experience INT NOT NULL,
    education VARCHAR(255),
    certifications TEXT,
    skills JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_years_experience (years_experience),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- EVALUATIONS TABLE
-- ============================================
CREATE TABLE evaluations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    candidate_id INT NOT NULL,
    crisis_management_score DECIMAL(5,2) NOT NULL CHECK (crisis_management_score >= 0 AND crisis_management_score <= 100),
    sustainability_score DECIMAL(5,2) NOT NULL CHECK (sustainability_score >= 0 AND sustainability_score <= 100),
    team_motivation_score DECIMAL(5,2) NOT NULL CHECK (team_motivation_score >= 0 AND team_motivation_score <= 100),
    ai_feedback JSON,
    evaluated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE,
    INDEX idx_candidate_id (candidate_id),
    INDEX idx_evaluated_at (evaluated_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- RANKINGS TABLE
-- ============================================
CREATE TABLE rankings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    candidate_id INT UNIQUE NOT NULL,
    total_score DECIMAL(6,2) NOT NULL,
    rank INT,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE,
    INDEX idx_total_score (total_score DESC),
    INDEX idx_rank (rank),
    INDEX idx_candidate_id (candidate_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- TRIGGER: Auto-update rankings after evaluation
-- ============================================
DELIMITER $$

CREATE TRIGGER update_rankings_after_evaluation
AFTER INSERT ON evaluations
FOR EACH ROW
BEGIN
    DECLARE total DECIMAL(6,2);
    DECLARE current_rank INT;
    
    -- Calculate total score (average of three evaluation scores)
    SET total = (NEW.crisis_management_score + NEW.sustainability_score + NEW.team_motivation_score) / 3;
    
    -- Insert or update ranking
    INSERT INTO rankings (candidate_id, total_score)
    VALUES (NEW.candidate_id, total)
    ON DUPLICATE KEY UPDATE 
        total_score = total,
        last_updated = CURRENT_TIMESTAMP;
    
    -- Recalculate all ranks based on total_score
    SET @rank_counter = 0;
    UPDATE rankings
    SET rank = (@rank_counter := @rank_counter + 1)
    ORDER BY total_score DESC;
END$$

DELIMITER ;

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
-- Additional composite index for common query patterns
CREATE INDEX idx_candidate_score ON rankings(candidate_id, total_score);

-- ============================================
-- VIEWS FOR EASY QUERYING
-- ============================================
CREATE VIEW candidate_leaderboard AS
SELECT 
    c.id,
    c.name,
    c.email,
    c.years_experience,
    c.skills,
    e.crisis_management_score,
    e.sustainability_score,
    e.team_motivation_score,
    r.total_score,
    r.rank
FROM candidates c
LEFT JOIN evaluations e ON c.id = e.candidate_id
LEFT JOIN rankings r ON c.id = r.candidate_id
ORDER BY r.rank ASC;
