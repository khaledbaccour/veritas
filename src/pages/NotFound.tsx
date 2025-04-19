
import { 
  Title, 
  Text, 
  Button, 
  Group, 
  Container,
  Image,
  Box
} from '@mantine/core';
import { FileSearch, Home, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Container size="md" style={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 'calc(100vh - 200px)',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <FileSearch size={80} strokeWidth={1.5} style={{ marginBottom: '2rem', opacity: 0.6 }} />
      
      <Title order={1} size="2.5rem" mb="md">404 - Page Not Found</Title>
      
      <Text c="dimmed" size="lg" mb="xl" maw={500}>
        Sorry, we couldn't find the page you're looking for. It might have been moved, deleted,
        or perhaps never existed in the first place.
      </Text>
      
      <Group>
        <Button 
          component={Link} 
          to="/"
          leftSection={<Home size={18} />}
          size="lg"
        >
          Back to Dashboard
        </Button>
        <Button 
          variant="outline"
          leftSection={<ArrowLeft size={18} />}
          size="lg"
          onClick={() => window.history.back()}
        >
          Go Back
        </Button>
      </Group>
    </Container>
  );
}
