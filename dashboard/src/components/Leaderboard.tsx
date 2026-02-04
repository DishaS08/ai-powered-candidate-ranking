import { Table, Badge, Group, Text, ScrollArea, Paper } from '@mantine/core';
import { IconTrophy, IconMedal, IconAward } from '@tabler/icons-react';
import type { Candidate } from '../types';

interface LeaderboardProps {
    candidates: Candidate[];
    onSelectCandidate: (candidate: Candidate) => void;
}

export function Leaderboard({ candidates, onSelectCandidate }: LeaderboardProps) {
    // Sort by total score and take top 10
    const topCandidates = [...candidates]
        .sort((a, b) => b.evaluation.total_score - a.evaluation.total_score)
        .slice(0, 10);

    const getRankIcon = (rank: number) => {
        if (rank === 1) return <IconTrophy size={20} color="gold" />;
        if (rank === 2) return <IconMedal size={20} color="silver" />;
        if (rank === 3) return <IconAward size={20} color="#CD7F32" />;
        return null;
    };

    const getRankColor = (rank: number) => {
        if (rank === 1) return 'yellow.1';
        if (rank === 2) return 'gray.1';
        if (rank === 3) return 'orange.1';
        return undefined;
    };

    const getScoreColor = (score: number) => {
        if (score >= 90) return 'green';
        if (score >= 80) return 'teal';
        if (score >= 70) return 'blue';
        return 'gray';
    };

    return (
        <Paper shadow="sm" p="md" radius="md" withBorder>
            <Group justify="space-between" mb="md">
                <Text size="xl" fw={700}>🏆 Top 10 Candidates</Text>
                <Badge color="green" size="lg">Leaderboard</Badge>
            </Group>

            <ScrollArea>
                <Table striped highlightOnHover>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Rank</Table.Th>
                            <Table.Th>Name</Table.Th>
                            <Table.Th>Experience</Table.Th>
                            <Table.Th>Crisis Mgmt</Table.Th>
                            <Table.Th>Sustainability</Table.Th>
                            <Table.Th>Team Motivation</Table.Th>
                            <Table.Th>Total Score</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {topCandidates.map((candidate, index) => (
                            <Table.Tr
                                key={candidate.id}
                                onClick={() => onSelectCandidate(candidate)}
                                style={{
                                    cursor: 'pointer',
                                    backgroundColor: getRankColor(index + 1),
                                }}
                            >
                                <Table.Td>
                                    <Group gap="xs">
                                        {getRankIcon(index + 1)}
                                        <Text fw={500}>#{index + 1}</Text>
                                    </Group>
                                </Table.Td>
                                <Table.Td>
                                    <Text fw={600}>{candidate.name}</Text>
                                </Table.Td>
                                <Table.Td>
                                    <Badge variant="light" color="violet">
                                        {candidate.years_experience} yrs
                                    </Badge>
                                </Table.Td>
                                <Table.Td>
                                    <Badge color={getScoreColor(candidate.evaluation.crisis_management_score)}>
                                        {candidate.evaluation.crisis_management_score.toFixed(1)}
                                    </Badge>
                                </Table.Td>
                                <Table.Td>
                                    <Badge color={getScoreColor(candidate.evaluation.sustainability_score)}>
                                        {candidate.evaluation.sustainability_score.toFixed(1)}
                                    </Badge>
                                </Table.Td>
                                <Table.Td>
                                    <Badge color={getScoreColor(candidate.evaluation.team_motivation_score)}>
                                        {candidate.evaluation.team_motivation_score.toFixed(1)}
                                    </Badge>
                                </Table.Td>
                                <Table.Td>
                                    <Badge size="lg" color={getScoreColor(candidate.evaluation.total_score)} variant="filled">
                                        {candidate.evaluation.total_score.toFixed(2)}
                                    </Badge>
                                </Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </ScrollArea>
        </Paper>
    );
}
