import { Paper, Text, Group, Badge, Table } from '@mantine/core';
import type { Candidate } from '../types';

interface SkillHeatmapProps {
    candidates: Candidate[];
}

export function SkillHeatmap({ candidates }: SkillHeatmapProps) {
    // Get top 10 candidates
    const topCandidates = [...candidates]
        .sort((a, b) => b.evaluation.total_score - a.evaluation.total_score)
        .slice(0, 10);

    const getColor = (value: number) => {
        if (value >= 90) return '#2ecc71';
        if (value >= 80) return '#3498db';
        if (value >= 70) return '#f39c12';
        return '#e74c3c';
    };

    const getBackgroundColor = (value: number) => {
        if (value >= 90) return 'rgba(46, 204, 113, 0.2)';
        if (value >= 80) return 'rgba(52, 152, 219, 0.2)';
        if (value >= 70) return 'rgba(243, 156, 18, 0.2)';
        return 'rgba(231, 76, 60, 0.2)';
    };

    return (
        <Paper shadow="sm" p="md" radius="md" withBorder>
            <Group justify="space-between" mb="md">
                <Text size="xl" fw={700}>📊 Skills Heatmap</Text>
                <Badge color="blue" size="lg">Top 10 Candidates</Badge>
            </Group>

            <div style={{ overflowX: 'auto' }}>
                <Table highlightOnHover withTableBorder withColumnBorders>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th style={{ minWidth: 150, fontWeight: 700, fontSize: '14px' }}>Candidate</Table.Th>
                            <Table.Th style={{ textAlign: 'center', fontWeight: 700, fontSize: '14px' }}>Crisis Management</Table.Th>
                            <Table.Th style={{ textAlign: 'center', fontWeight: 700, fontSize: '14px' }}>Sustainability</Table.Th>
                            <Table.Th style={{ textAlign: 'center', fontWeight: 700, fontSize: '14px' }}>Team Motivation</Table.Th>
                            <Table.Th style={{ textAlign: 'center', fontWeight: 700, fontSize: '14px' }}>Total Score</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {topCandidates.map((candidate, idx) => (
                            <Table.Tr key={candidate.id}>
                                <Table.Td style={{ fontWeight: 600, fontSize: '14px' }}>
                                    {idx + 1}. {candidate.name}
                                </Table.Td>
                                <Table.Td
                                    style={{
                                        textAlign: 'center',
                                        backgroundColor: getBackgroundColor(candidate.evaluation.crisis_management_score),
                                        fontWeight: 600,
                                        fontSize: '14px',
                                        color: getColor(candidate.evaluation.crisis_management_score),
                                    }}
                                >
                                    {candidate.evaluation.crisis_management_score.toFixed(1)}
                                </Table.Td>
                                <Table.Td
                                    style={{
                                        textAlign: 'center',
                                        backgroundColor: getBackgroundColor(candidate.evaluation.sustainability_score),
                                        fontWeight: 600,
                                        fontSize: '14px',
                                        color: getColor(candidate.evaluation.sustainability_score),
                                    }}
                                >
                                    {candidate.evaluation.sustainability_score.toFixed(1)}
                                </Table.Td>
                                <Table.Td
                                    style={{
                                        textAlign: 'center',
                                        backgroundColor: getBackgroundColor(candidate.evaluation.team_motivation_score),
                                        fontWeight: 600,
                                        fontSize: '14px',
                                        color: getColor(candidate.evaluation.team_motivation_score),
                                    }}
                                >
                                    {candidate.evaluation.team_motivation_score.toFixed(1)}
                                </Table.Td>
                                <Table.Td
                                    style={{
                                        textAlign: 'center',
                                        backgroundColor: getBackgroundColor(candidate.evaluation.total_score),
                                        fontWeight: 700,
                                        fontSize: '15px',
                                        color: getColor(candidate.evaluation.total_score),
                                    }}
                                >
                                    {candidate.evaluation.total_score.toFixed(1)}
                                </Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </div>

            <Group mt="md" justify="center" gap="xl">
                <Group gap="xs">
                    <div style={{ width: 16, height: 16, backgroundColor: '#2ecc71', borderRadius: 4 }} />
                    <Text size="sm">90-100 (Exceptional)</Text>
                </Group>
                <Group gap="xs">
                    <div style={{ width: 16, height: 16, backgroundColor: '#3498db', borderRadius: 4 }} />
                    <Text size="sm">80-89 (Excellent)</Text>
                </Group>
                <Group gap="xs">
                    <div style={{ width: 16, height: 16, backgroundColor: '#f39c12', borderRadius: 4 }} />
                    <Text size="sm">70-79 (Good)</Text>
                </Group>
                <Group gap="xs">
                    <div style={{ width: 16, height: 16, backgroundColor: '#e74c3c', borderRadius: 4 }} />
                    <Text size="sm">60-69 (Acceptable)</Text>
                </Group>
            </Group>
        </Paper>
    );
}
