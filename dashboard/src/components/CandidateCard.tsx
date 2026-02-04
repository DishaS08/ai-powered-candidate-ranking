import { Card, Text, Badge, Group, Stack, Avatar, ActionIcon, Tooltip, Progress } from '@mantine/core';
import { IconMail, IconPhone, IconShare, IconCertificate } from '@tabler/icons-react';
import type { Candidate } from '../types';
import { notifications } from '@mantine/notifications';

interface CandidateCardProps {
    candidate: Candidate;
}

export function CandidateCard({ candidate }: CandidateCardProps) {
    const getScoreColor = (score: number) => {
        if (score >= 90) return 'green';
        if (score >= 80) return 'teal';
        if (score >= 70) return 'blue';
        return 'gray';
    };

    const handleShare = () => {
        const text = `Candidate: ${candidate.name}
Email: ${candidate.email}
Experience: ${candidate.years_experience} years
Total Score: ${candidate.evaluation.total_score.toFixed(2)}

Evaluation Scores:
- Crisis Management: ${candidate.evaluation.crisis_management_score.toFixed(1)}
- Sustainability: ${candidate.evaluation.sustainability_score.toFixed(1)}
- Team Motivation: ${candidate.evaluation.team_motivation_score.toFixed(1)}

Skills: ${candidate.skills.join(', ')}
Education: ${candidate.education}`;

        navigator.clipboard.writeText(text);
        notifications.show({
            title: 'Candidate Shared!',
            message: 'Candidate details copied to clipboard',
            color: 'green',
            icon: <IconShare size={16} />,
        });
    };

    const initials = candidate.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase();

    return (
        <Card shadow="md" padding="lg" radius="md" withBorder>
            <Card.Section withBorder inheritPadding py="xs" mb="md">
                <Group justify="space-between">
                    <Group>
                        <Avatar color="blue" radius="xl" size="lg">
                            {initials}
                        </Avatar>
                        <div>
                            <Text fw={700} size="lg">
                                {candidate.name}
                            </Text>
                            <Badge variant="light" color="violet">
                                {candidate.years_experience} years experience
                            </Badge>
                        </div>
                    </Group>
                    <Tooltip label="Share candidate">
                        <ActionIcon variant="light" color="blue" size="lg" onClick={handleShare}>
                            <IconShare size={20} />
                        </ActionIcon>
                    </Tooltip>
                </Group>
            </Card.Section>

            <Stack gap="sm">
                <Group gap="xs">
                    <IconMail size={16} />
                    <Text size="sm" c="dimmed">
                        {candidate.email}
                    </Text>
                </Group>

                <Group gap="xs">
                    <IconPhone size={16} />
                    <Text size="sm" c="dimmed">
                        {candidate.phone}
                    </Text>
                </Group>

                <div>
                    <Text size="sm" fw={500} mb={5}>
                        <IconCertificate size={16} style={{ verticalAlign: 'middle' }} /> Education
                    </Text>
                    <Text size="xs" c="dimmed">
                        {candidate.education}
                    </Text>
                </div>

                <div>
                    <Text size="sm" fw={500} mb={8}>
                        Evaluation Scores
                    </Text>
                    <Stack gap="xs">
                        <div>
                            <Group justify="space-between" mb={4}>
                                <Text size="xs">Crisis Management</Text>
                                <Badge size="sm" color={getScoreColor(candidate.evaluation.crisis_management_score)}>
                                    {candidate.evaluation.crisis_management_score.toFixed(1)}
                                </Badge>
                            </Group>
                            <Progress
                                value={candidate.evaluation.crisis_management_score}
                                color={getScoreColor(candidate.evaluation.crisis_management_score)}
                                size="sm"
                            />
                        </div>

                        <div>
                            <Group justify="space-between" mb={4}>
                                <Text size="xs">Sustainability</Text>
                                <Badge size="sm" color={getScoreColor(candidate.evaluation.sustainability_score)}>
                                    {candidate.evaluation.sustainability_score.toFixed(1)}
                                </Badge>
                            </Group>
                            <Progress
                                value={candidate.evaluation.sustainability_score}
                                color={getScoreColor(candidate.evaluation.sustainability_score)}
                                size="sm"
                            />
                        </div>

                        <div>
                            <Group justify="space-between" mb={4}>
                                <Text size="xs">Team Motivation</Text>
                                <Badge size="sm" color={getScoreColor(candidate.evaluation.team_motivation_score)}>
                                    {candidate.evaluation.team_motivation_score.toFixed(1)}
                                </Badge>
                            </Group>
                            <Progress
                                value={candidate.evaluation.team_motivation_score}
                                color={getScoreColor(candidate.evaluation.team_motivation_score)}
                                size="sm"
                            />
                        </div>
                    </Stack>

                    <Group justify="space-between" mt="md" p="xs" style={{ backgroundColor: '#f8f9fa', borderRadius: 8 }}>
                        <Text size="sm" fw={700}>
                            Total Score
                        </Text>
                        <Badge size="lg" color={getScoreColor(candidate.evaluation.total_score)} variant="filled">
                            {candidate.evaluation.total_score.toFixed(2)}
                        </Badge>
                    </Group>
                </div>

                <div>
                    <Text size="sm" fw={500} mb={8}>
                        Skills
                    </Text>
                    <Group gap={6}>
                        {candidate.skills.map((skill, index) => (
                            <Badge key={index} variant="dot" size="sm">
                                {skill}
                            </Badge>
                        ))}
                    </Group>
                </div>

                <div>
                    <Text size="sm" fw={500} mb={8}>
                        Certifications
                    </Text>
                    <Stack gap={4}>
                        {candidate.certifications.map((cert, index) => (
                            <Text key={index} size="xs" c="dimmed">
                                • {cert}
                            </Text>
                        ))}
                    </Stack>
                </div>
            </Stack>
        </Card>
    );
}
