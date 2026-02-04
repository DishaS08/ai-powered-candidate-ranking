import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { useState } from 'react';
import { MantineProvider, Container, Title, Text, Stack, Grid, Group, Badge, Paper, TextInput, Select } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { IconSearch, IconRecycle } from '@tabler/icons-react';
import { Leaderboard } from './components/Leaderboard';
import { SkillHeatmap } from './components/SkillHeatmap';
import { CandidateCard } from './components/CandidateCard';
import type { Candidate } from './types';
import candidatesData from './data/candidates.json';

function App() {
  const [candidates] = useState<Candidate[]>(candidatesData as Candidate[]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [filterSkill, setFilterSkill] = useState<string | null>(null);

  // Get all unique skills
  const allSkills = Array.from(
    new Set(candidates.flatMap((c) => c.skills))
  ).sort();

  // Filter candidates based on search and skill filter
  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      searchQuery === '' ||
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSkill = !filterSkill || candidate.skills.includes(filterSkill);

    return matchesSearch && matchesSkill;
  });

  // Calculate summary stats
  const avgScore = (
    candidates.reduce((sum, c) => sum + c.evaluation.total_score, 0) / candidates.length
  ).toFixed(2);
  const topScore = Math.max(...candidates.map((c) => c.evaluation.total_score)).toFixed(2);

  return (
    <MantineProvider defaultColorScheme="light">
      <Notifications position="top-right" />
      <Container size="xl" py="xl">
        <Stack gap="xl">
          {/* Header */}
          <Paper shadow="md" p="xl" radius="md" withBorder style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <Group gap="md" align="center">
              <IconRecycle size={48} color="white" />
              <div style={{ flex: 1 }}>
                <Title order={1} c="white">
                  Recycling Production Line Manager Selection
                </Title>
                <Text c="white" size="lg" mt={5}>
                  AI-Powered Candidate Ranking System
                </Text>
              </div>
              <Group gap="xl">
                <div style={{ textAlign: 'center' }}>
                  <Text c="white" size="sm" opacity={0.9}>
                    Total Candidates
                  </Text>
                  <Text c="white" size="xl" fw={700}>
                    {candidates.length}
                  </Text>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <Text c="white" size="sm" opacity={0.9}>
                    Avg Score
                  </Text>
                  <Text c="white" size="xl" fw={700}>
                    {avgScore}
                  </Text>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <Text c="white" size="sm" opacity={0.9}>
                    Top Score
                  </Text>
                  <Text c="white" size="xl" fw={700}>
                    {topScore}
                  </Text>
                </div>
              </Group>
            </Group>
          </Paper>

          {/* Leaderboard */}
          <Leaderboard candidates={candidates} onSelectCandidate={setSelectedCandidate} />

          {/* Skills Heatmap */}
          <SkillHeatmap candidates={candidates} />

          {/* Filters */}
          <Paper shadow="sm" p="md" radius="md" withBorder>
            <Group grow>
              <TextInput
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.currentTarget.value)}
                leftSection={<IconSearch size={16} />}
              />
              <Select
                placeholder="Filter by skill"
                data={allSkills}
                value={filterSkill}
                onChange={setFilterSkill}
                clearable
              />
            </Group>
            <Group mt="sm">
              <Text size="sm" c="dimmed">
                Showing {filteredCandidates.length} of {candidates.length} candidates
              </Text>
            </Group>
          </Paper>

          {/* Selected Candidate Detail */}
          {selectedCandidate && (
            <Paper shadow="sm" p="md" radius="md" withBorder>
              <Group justify="space-between" mb="md">
                <Text size="xl" fw={700}>
                  Selected Candidate Details
                </Text>
                <Badge color="blue" size="lg">
                  Featured
                </Badge>
              </Group>
              <CandidateCard candidate={selectedCandidate} />
            </Paper>
          )}

          {/* All Candidate Cards */}
          <div>
            <Group justify="space-between" mb="md">
              <Text size="xl" fw={700}>
                All Candidates
              </Text>
              <Badge color="grape" size="lg">
                {filteredCandidates.length} Profiles
              </Badge>
            </Group>
            <Grid>
              {filteredCandidates.map((candidate) => (
                <Grid.Col key={candidate.id} span={{ base: 12, sm: 6, lg: 4 }}>
                  <CandidateCard candidate={candidate} />
                </Grid.Col>
              ))}
            </Grid>
          </div>
        </Stack>
      </Container>
    </MantineProvider>
  );
}

export default App;
