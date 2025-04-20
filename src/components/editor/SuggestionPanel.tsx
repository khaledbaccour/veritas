import { useState } from 'react';
import { Card, Title, Text, Button, Group, Select, Badge, Box } from '@mantine/core';
import { BrainCircuit, CheckCircle2, X } from 'lucide-react';
import { Editor } from '@tiptap/react';
import { useToast } from '@/hooks/use-toast';

interface SuggestionPanelProps {
  editor: Editor | null;
  onRequestSuggestion: (type: string) => Promise<void>;
  suggestion: string | null;
  isLoading: boolean;
}

export function SuggestionPanel({ 
  editor, 
  onRequestSuggestion, 
  suggestion, 
  isLoading 
}: SuggestionPanelProps) {
  const [suggestionType, setSuggestionType] = useState('improve');
  const { toast } = useToast();
  
  const suggestionTypes = [
    { value: 'improve', label: 'Improve Writing' },
    { value: 'shorten', label: 'Make More Concise' },
    { value: 'expand', label: 'Expand Content' },
    { value: 'professional', label: 'Make More Professional' },
    { value: 'simplify', label: 'Simplify Language' },
  ];
  
  const handleRequestSuggestion = () => {
    onRequestSuggestion(suggestionType);
  };
  
  const applySuggestion = () => {
    if (editor && suggestion) {
      editor.commands.setContent(suggestion);
      toast({
        title: "Suggestion applied",
        description: "The AI suggestion has been applied to your document."
      });
    }
  };
  
  return (
    <Card withBorder padding="md">
      <Title order={4} mb="md">
        <Group>
          <BrainCircuit size={20} />
          <span>AI Assistant</span>
        </Group>
      </Title>
      
      <Select
        label="What would you like to do?"
        description="Select how you want to modify your content"
        data={suggestionTypes}
        value={suggestionType}
        onChange={(value) => setSuggestionType(value || 'improve')}
        mb="md"
      />
      
      <Button 
        onClick={handleRequestSuggestion} 
        loading={isLoading}
        mb="md"
        fullWidth
      >
        Get Suggestions
      </Button>
      
      {suggestion && (
        <Box>
          <Card withBorder padding="sm" mb="md">
            <Group justify="space-between" mb="xs">
              <Badge color="blue">AI Suggestion</Badge>
              <Group gap="xs">
                <Button 
                  size="xs" 
                  variant="light" 
                  leftSection={<CheckCircle2 size={14} />}
                  onClick={applySuggestion}
                >
                  Apply
                </Button>
                <Button 
                  size="xs" 
                  variant="subtle" 
                  color="gray"
                  leftSection={<X size={14} />}
                >
                  Dismiss
                </Button>
              </Group>
            </Group>
            <Text size="sm">{suggestion}</Text>
          </Card>
        </Box>
      )}
    </Card>
  );
}
