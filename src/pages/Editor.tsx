import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Tabs } from '@mantine/core';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import { Link } from '@tiptap/extension-link';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import { MessageSquare, BrainCircuit, UserPlus } from 'lucide-react';

import { articles } from '../data/articlesData';
import { EditorHeader } from '../components/editor/EditorHeader';
import { TextEditor } from '../components/editor/TextEditor';
import { SidebarTabs } from '../components/editor/SidebarTabs';
import { SuggestionPanel } from '../components/editor/SuggestionPanel';
import { GeminiService } from '../services/GeminiService';

const GEMINI_API_KEY = 'AIzaSyBpo_fj5LX9-tsnnQ1083x6TtEiSPDGxWA';

export default function Editor() {
  const { id } = useParams();
  const articleId = id || '1';
  const article = articles.find(a => a.id === articleId) || articles[0];
  
  const [title, setTitle] = useState(article.title);
  const [status, setStatus] = useState<"draft" | "review" | "published">(article.status as "draft" | "review" | "published");
  const [colorPickerOpened, setColorPickerOpened] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [isLoadingSuggestion, setIsLoadingSuggestion] = useState(false);
  
  const geminiService = new GeminiService(GEMINI_API_KEY);
  
  const textColors = [
    '#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', 
    '#FF00FF', '#00FFFF', '#800000', '#008000', '#000080', 
    '#808000', '#800080', '#008080', '#808080', '#C0C0C0',
  ];

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus as "draft" | "review" | "published");
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder: 'Start writing your article...' }),
      Highlight,
      Link,
      TextStyle,
      Color.configure({ types: [TextStyle.name] })
    ],
    content: article.content,
  });
  
  const getSuggestionPrompt = (type: string): string => {
    switch (type) {
      case 'improve':
        return "Improve this writing while maintaining its original meaning. Make it more clear, professional, and effective. Return the entire improved text.";
      case 'shorten':
        return "Make this text more concise while keeping all important information. Return the entire shortened text.";
      case 'expand':
        return "Expand on this content by adding relevant details and examples. Return the entire expanded text.";
      case 'professional':
        return "Rewrite this in a more professional tone suitable for a formal publication. Return the entire rewritten text.";
      case 'simplify':
        return "Simplify this text to make it more accessible and easier to understand. Return the entire simplified text.";
      default:
        return "Improve this writing while maintaining its original meaning. Return the entire improved text.";
    }
  };
  
  const handleRequestSuggestion = async (type: string) => {
    if (!editor) return;
    
    // Get current content from the editor
    const content = editor.getHTML();
    
    setIsLoadingSuggestion(true);
    setSuggestion(null);
    
    try {
      const prompt = getSuggestionPrompt(type);
      const result = await geminiService.generateContent(`${prompt}\n\n${content}`);
      setSuggestion(result);
    } catch (error) {
      console.error("Error getting suggestions:", error);
    } finally {
      setIsLoadingSuggestion(false);
    }
  };

  return (
    <div className="p-6">
      <EditorHeader status={status} setStatus={handleStatusChange} />
      
      <Grid gutter="lg">
        <Grid.Col span={{ base: 12, md: 9 }}>
          <TextEditor 
            editor={editor} 
            title={title}
            setTitle={setTitle}
            colorPickerOpened={colorPickerOpened}
            setColorPickerOpened={setColorPickerOpened}
            textColors={textColors}
          />
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, md: 3 }}>
          <Tabs defaultValue="collaborate">
            <Tabs.List grow mb="md">
              <Tabs.Tab value="collaborate" leftSection={<UserPlus size={16} />}>
                Collaborate
              </Tabs.Tab>
              <Tabs.Tab value="assistant" leftSection={<BrainCircuit size={16} />}>
                AI Assistant
              </Tabs.Tab>
            </Tabs.List>
            
            <Tabs.Panel value="collaborate">
              <SidebarTabs article={article} />
            </Tabs.Panel>
            
            <Tabs.Panel value="assistant">
              <SuggestionPanel
                editor={editor}
                onRequestSuggestion={handleRequestSuggestion}
                suggestion={suggestion}
                isLoading={isLoadingSuggestion}
              />
            </Tabs.Panel>
          </Tabs>
        </Grid.Col>
      </Grid>
    </div>
  );
}

