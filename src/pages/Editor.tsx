import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@mantine/core';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import { Link } from '@tiptap/extension-link';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';

import { articles } from '../data/articlesData';
import { EditorHeader } from '../components/editor/EditorHeader';
import { TextEditor } from '../components/editor/TextEditor';
import { SidebarTabs } from '../components/editor/SidebarTabs';

export default function Editor() {
  const { id } = useParams();
  const articleId = id || '1';
  const article = articles.find(a => a.id === articleId) || articles[0];
  
  const [title, setTitle] = useState(article.title);
  const [status, setStatus] = useState<"draft" | "review" | "published">(article.status as "draft" | "review" | "published");
  const [colorPickerOpened, setColorPickerOpened] = useState(false);
  
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
          <SidebarTabs article={article} />
        </Grid.Col>
      </Grid>
    </div>
  );
}

