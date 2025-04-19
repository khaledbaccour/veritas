import { useState } from 'react';
import { 
  Title, 
  Text, 
  Card, 
  Group, 
  Button, 
  TextInput, 
  Textarea, 
  Select,
  FileInput,
  Switch,
  Alert,
  Stack,
  Grid,
  Badge,
  Accordion,
  Divider,
  rem,
  Box
} from '@mantine/core';
import { 
  Shield, 
  FileText, 
  Upload, 
  AlertCircle, 
  Check, 
  Building, 
  Landmark, 
  Stethoscope, 
  Leaf, 
  Lock,
  User,
  FileQuestion,
  Building2
} from 'lucide-react';
import { notifications } from '@mantine/notifications';
import { 
  whistleblowerCategories, 
  journalistsBySpecialty,
} from '../data/whistleblowerData';

export default function Whistleblower() {
  const [step, setStep] = useState<number>(1);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [anonymousMode, setAnonymousMode] = useState<boolean>(true);
  const [securityLevel, setSecurityLevel] = useState<string>('enhanced');
  const [submissionComplete, setSubmissionComplete] = useState<boolean>(false);

  const getCategoryIcon = (iconName: string) => {
    const iconProps = { size: 16 };
    switch(iconName) {
      case 'Building': return <Building {...iconProps} />;
      case 'Landmark': return <Landmark {...iconProps} />;
      case 'Stethoscope': return <Stethoscope {...iconProps} />;
      case 'Leaf': return <Leaf {...iconProps} />;
      case 'Shield': return <Shield {...iconProps} />;
      default: return <FileQuestion {...iconProps} />;
    }
  };

  const handleSubmit = () => {
    if (!title || !description || !category) {
      notifications.show({
        title: 'Missing information',
        message: 'Please fill in all required fields',
        color: 'red',
        icon: <AlertCircle size={16} />
      });
      return;
    }
    
    setStep(3);
    
    setTimeout(() => {
      setSubmissionComplete(true);
    }, 2000);
  };

  const getJournalistsForCategory = () => {
    if (!category) return [];
    
    const selectedCategory = whistleblowerCategories.find(cat => cat.id === category);
    if (!selectedCategory) return [];
    
    return selectedCategory.journalistIds.map(id => 
      journalistsBySpecialty.find(j => j.id === id)
    ).filter(Boolean);
  };


  return (
    <div className="p-6">
      <Title order={2} mb="xs">Secure Whistleblower Portal</Title>
      <Text c="dimmed" mb="lg">Share sensitive information securely with our investigative journalists</Text>
      
      {!submissionComplete ? (
        <Grid gutter="lg">
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Card withBorder padding="lg">
              {step === 1 && (
                <>
                  <Title order={3} mb="md">Submit Information</Title>
                  
                  <TextInput
                    label="Title of your submission"
                    placeholder="Briefly describe the issue"
                    required
                    mb="md"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  
                  <Textarea
                    label="Detailed description"
                    placeholder="Provide as much relevant detail as possible"
                    required
                    minRows={5}
                    mb="md"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  
                  <Select
                    label="Category"
                    placeholder="Select the most relevant category"
                    required
                    mb="md"
                    data={whistleblowerCategories.map(cat => ({ 
                      value: cat.id, 
                      label: cat.name,
                      leftSection: getCategoryIcon(cat.icon)
                    }))}
                    value={category}
                    onChange={setCategory}
                  />
                  
                  <Group justify="flex-end" mt="xl">
                    <Button onClick={() => setStep(2)}>
                      Next
                    </Button>
                  </Group>
                </>
              )}
              
              {step === 2 && (
                <>
                  <Title order={3} mb="md">Evidence & Security</Title>
                  
                  <FileInput
                    label="Upload relevant files (optional)"
                    placeholder="Upload documents, images, or other evidence"
                    accept="image/png,image/jpeg,application/pdf,application/msword,text/plain"
                    multiple
                    mb="md"
                    leftSection={<Upload size={16} />}
                    value={files}
                    onChange={setFiles}
                  />
                  
                  <Text size="xs" c="dimmed" mb="md">
                    Accepted file types: PDF, DOCX, JPG, PNG, TXT. Maximum file size: 25MB per file.
                  </Text>
                  
                  <Divider my="lg" />
                  
                  <Title order={4} mb="md">Security Settings</Title>
                  
                  <Switch
                    label="Enhanced Anonymity Mode"
                    description="Remove metadata from uploads and mask your submission origin"
                    checked={anonymousMode}
                    onChange={(e) => setAnonymousMode(e.currentTarget.checked)}
                    mb="md"
                  />
                  
                  <Select
                    label="Security Level"
                    description="Higher security levels apply additional protection but may slow down processing"
                    mb="lg"
                    data={[
                      { value: 'standard', label: 'Standard' },
                      { value: 'enhanced', label: 'Enhanced' },
                      { value: 'maximum', label: 'Maximum' }
                    ]}
                    value={securityLevel}
                    onChange={(val) => setSecurityLevel(val || 'enhanced')}
                  />
                  
                  <Alert icon={<AlertCircle size={16} />} title="Important" color="yellow" mb="md">
                    Even with our security measures in place, please be aware that no system is 100% secure.
                    Consider using a VPN and a browser with enhanced privacy features for additional protection.
                  </Alert>
                  
                  <Group justify="space-between" mt="xl">
                    <Button variant="subtle" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button onClick={handleSubmit}>
                      Submit Securely
                    </Button>
                  </Group>
                </>
              )}
              
              {step === 3 && (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <Title order={3} mb="lg">Processing Your Submission</Title>
                  <Text>Please wait while we securely process your information...</Text>
                  <Text size="sm" c="dimmed" mt="md">This may take a moment as we apply security measures.</Text>
                </div>
              )}
            </Card>
          </Grid.Col>
          
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="lg">
              <Card withBorder padding="lg">
                <Group mb="md" align="center">
                  <Shield size={20} />
                  <Title order={4}>Your Privacy Matters</Title>
                </Group>
                
                <Text size="sm" mb="md">
                  Our secure system is designed to protect your identity. All submissions are encrypted
                  and transmitted through secure channels.
                </Text>
                
                <Group mb="xs">
                  <Lock size={16} />
                  <Text size="sm" fw={500}>End-to-end encryption</Text>
                </Group>
                
                <Group mb="xs">
                  <Building2 size={16} />
                  <Text size="sm" fw={500}>Anonymous routing</Text>
                </Group>
                
                <Group mb="xs">
                  <User size={16} />
                  <Text size="sm" fw={500}>Identity protection</Text>
                </Group>
              </Card>
              
              {category && (
                <Card withBorder padding="lg">
                  <Title order={4} mb="md">Expert Journalists</Title>
                  <Text size="sm" mb="md">
                    Your submission will be reviewed by specialists in this field:
                  </Text>
                  
                  {getJournalistsForCategory().map((journalist: any) => (
                    <Group key={journalist.id} mb="md">
                      <Box style={{ width: 36, height: 36, borderRadius: '50%', overflow: 'hidden' }}>
                        <img 
                          src={journalist.avatar} 
                          alt={journalist.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </Box>
                      <div>
                        <Text size="sm" fw={500}>{journalist.name}</Text>
                        <Text size="xs" c="dimmed">{journalist.expertise.join(', ')}</Text>
                      </div>
                    </Group>
                  ))}
                </Card>
              )}
            </Stack>
          </Grid.Col>
        </Grid>
      ) : (
        <Card withBorder padding="xl" style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <Shield size={60} color="green" style={{ margin: '0 auto 20px' }} />
          
          <Title order={2} mb="sm">Submission Complete</Title>
          <Text mb="xl">
            Your information has been securely received. Our journalists will review it promptly.
          </Text>
          
          <Alert color="blue" mb="lg">
            <Group mb="sm">
              <FileText size={20} />
              <Text fw={500}>Reference ID: WB-{Math.random().toString(36).substring(2, 10).toUpperCase()}</Text>
            </Group>
            <Text size="sm">
              Please save this reference ID. If you provided contact details, we'll reach out once the information has been reviewed.
            </Text>
          </Alert>
          
          <Button variant="outline" onClick={() => {
            setStep(1);
            setTitle('');
            setDescription('');
            setCategory(null);
            setFiles([]);
            setSubmissionComplete(false);
          }}>
            Submit Another Tip
          </Button>
        </Card>
      )}
    </div>
  );
}