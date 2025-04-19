
import { useState } from 'react';
import { 
  TextInput, 
  Button, 
  Group, 
  Title, 
  Text, 
  Card, 
  Badge, 
  Progress, 
  Divider, 
  Select, 
  RangeSlider,
  Checkbox,
  Grid,
  Box,
  Accordion,
  Tabs
} from '@mantine/core';
import { Search as SearchIcon, Filter, ChevronDown, AlertCircle } from 'lucide-react';
import { searchResults, SearchResult } from '../data/searchData';

export default function Search() {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<string | null>('all');
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>(searchResults);
  const [biasRange, setBiasRange] = useState<[number, number]>([-100, 100]);
  const [trustRange, setTrustRange] = useState<[number, number]>([0, 100]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([
    'article', 'study', 'data', 'opinion', 'press-release'
  ]);
  const [filtersVisible, setFiltersVisible] = useState(false);
  
  // Function to handle search
  const handleSearch = () => {
    let results = [...searchResults];
    
    // Filter by query if present
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      results = results.filter(
        result => 
          result.title.toLowerCase().includes(lowercaseQuery) || 
          result.snippet.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    // Filter by bias range
    results = results.filter(
      result => 
        result.biasRating.value >= biasRange[0] && 
        result.biasRating.value <= biasRange[1]
    );
    
    // Filter by trust range
    results = results.filter(
      result => 
        result.trustScore >= trustRange[0] && 
        result.trustScore <= trustRange[1]
    );
    
    // Filter by content type
    results = results.filter(result => selectedTypes.includes(result.type));
    
    // Filter by type tab
    if (activeTab !== 'all') {
      results = results.filter(result => result.type === activeTab);
    }
    
    setFilteredResults(results);
  };
  
  // Helper function to get bias color
  const getBiasColor = (value: number) => {
    if (value <= -60) return 'blue';
    if (value <= -20) return 'cyan';
    if (value < 20) return 'gray';
    if (value < 60) return 'orange';
    return 'red';
  };
  
  // Helper function to get trust score color
  const getTrustColor = (score: number) => {
    if (score >= 90) return 'green';
    if (score >= 70) return 'lime';
    if (score >= 50) return 'yellow';
    if (score >= 30) return 'orange';
    return 'red';
  };
  
  return (
    <div className="p-6">
      <Title order={2} mb="xs">Search Data</Title>
      <Text c="dimmed" mb="lg">
        Find articles, studies, and data with bias and trust analysis
      </Text>
      
      <Card withBorder mb="xl">
        <Group align="flex-end" mb="md">
          <TextInput
            placeholder="Search for topics, keywords, or sources..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ flex: 1 }}
            leftSection={<SearchIcon size={16} />}
          />
          <Button onClick={handleSearch}>Search</Button>
          <Button 
            variant="outline" 
            leftSection={<Filter size={16} />}
            onClick={() => setFiltersVisible(!filtersVisible)}
          >
            Filters
          </Button>
        </Group>
        
        {filtersVisible && (
          <div>
            <Divider my="md" />
            
            <Grid>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Text fw={500} mb="xs">Political Bias Range</Text>
                <RangeSlider
                  min={-100}
                  max={100}
                  value={biasRange}
                  onChange={setBiasRange}
                  marks={[
                    { value: -100, label: 'Left' },
                    { value: 0, label: 'Center' },
                    { value: 100, label: 'Right' },
                  ]}
                  mb="lg"
                />
                
                <Text fw={500} mb="xs">Trust Score (0-100)</Text>
                <RangeSlider
                  min={0}
                  max={100}
                  value={trustRange}
                  onChange={setTrustRange}
                  marks={[
                    { value: 0, label: '0' },
                    { value: 50, label: '50' },
                    { value: 100, label: '100' },
                  ]}
                />
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Text fw={500} mb="xs">Content Type</Text>
                <Checkbox.Group 
                  value={selectedTypes} 
                  onChange={setSelectedTypes}
                >
                  <Group mb="xs">
                    <Checkbox value="article" label="Articles" />
                    <Checkbox value="study" label="Studies" />
                    <Checkbox value="data" label="Data Sets" />
                  </Group>
                  <Group>
                    <Checkbox value="opinion" label="Opinion Pieces" />
                    <Checkbox value="press-release" label="Press Releases" />
                  </Group>
                </Checkbox.Group>
              </Grid.Col>
            </Grid>
            
            <Group mt="md">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setBiasRange([-100, 100]);
                  setTrustRange([0, 100]);
                  setSelectedTypes(['article', 'study', 'data', 'opinion', 'press-release']);
                }}
              >
                Reset Filters
              </Button>
              <Button 
                size="sm"
                onClick={handleSearch}
              >
                Apply Filters
              </Button>
            </Group>
          </div>
        )}
      </Card>
      
      <Tabs value={activeTab} onChange={setActiveTab} mb="md">
        <Tabs.List>
          <Tabs.Tab value="all">All Results</Tabs.Tab>
          <Tabs.Tab value="article">Articles</Tabs.Tab>
          <Tabs.Tab value="study">Studies</Tabs.Tab>
          <Tabs.Tab value="data">Data</Tabs.Tab>
          <Tabs.Tab value="opinion">Opinions</Tabs.Tab>
          <Tabs.Tab value="press-release">Press Releases</Tabs.Tab>
        </Tabs.List>
      </Tabs>
      
      <Text mb="lg">Found {filteredResults.length} results</Text>
      
      {filteredResults.length === 0 ? (
        <Card withBorder padding="xl" style={{ textAlign: 'center' }}>
          <AlertCircle size={48} style={{ margin: '0 auto 20px' }} />
          <Title order={3} mb="xs">No Results Found</Title>
          <Text c="dimmed">Try adjusting your search criteria or filters</Text>
        </Card>
      ) : (
        filteredResults.map((result) => (
          <Card key={result.id} withBorder mb="md" padding="lg">
            <Group align="flex-start" justify="space-between" mb="xs">
              <div>
                <Title order={3} size="h4">{result.title}</Title>
                <Group mt="xs">
                  <Text size="sm">{result.source}</Text>
                  <Text size="sm" c="dimmed">|</Text>
                  <Text size="sm">{result.date}</Text>
                  <Badge>{result.type}</Badge>
                </Group>
              </div>
              
              <Group>
                <div style={{ textAlign: 'center' }}>
                  <Text size="xs" mb="xs">Political Bias</Text>
                  <Badge 
                    color={getBiasColor(result.biasRating.value)}
                    size="lg"
                  >
                    {result.biasRating.label}
                  </Badge>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <Text size="xs" mb="xs">Trust Score</Text>
                  <Badge 
                    color={getTrustColor(result.trustScore)}
                    size="lg"
                  >
                    {result.trustScore}/100
                  </Badge>
                </div>
              </Group>
            </Group>
            
            <Text mt="md" mb="lg">{result.snippet}</Text>
            
            <Group mt="md">
              {result.topics.map((topic, index) => (
                <Badge key={index} variant="outline">{topic}</Badge>
              ))}
            </Group>
            
            {result.factCheck && (
              <Accordion variant="separated" mt="md">
                <Accordion.Item value="factcheck">
                  <Accordion.Control>
                    <Group>
                      <Text fw={500}>Fact Check</Text>
                      <Badge 
                        color={
                          result.factCheck.rating === 'True' ? 'green' :
                          result.factCheck.rating === 'Mostly True' ? 'teal' :
                          result.factCheck.rating === 'Mixed' ? 'yellow' :
                          result.factCheck.rating === 'Mostly False' ? 'orange' :
                          'red'
                        }
                      >
                        {result.factCheck.rating}
                      </Badge>
                    </Group>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Text fw={500} mb="xs">Claim:</Text>
                    <Text mb="md">{result.factCheck.claim}</Text>
                    <Text fw={500} mb="xs">Analysis:</Text>
                    <Text>{result.factCheck.explanation}</Text>
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion>
            )}
            
            <Group mt="lg">
              <Button variant="light">View Full Source</Button>
              <Button variant="outline">Save to Collection</Button>
              <Button variant="filled">Cite in Article</Button>
            </Group>
          </Card>
        ))
      )}
    </div>
  );
}
