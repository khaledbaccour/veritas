import { TextInput, Card } from '@mantine/core';
import { RichTextEditor } from '@mantine/tiptap';
import { Editor } from '@tiptap/react';
import { ColorPicker } from './ColorPicker';

interface TextEditorProps {
  editor: Editor | null;
  title: string;
  setTitle: (title: string) => void;
  colorPickerOpened: boolean;
  setColorPickerOpened: (opened: boolean) => void;
  textColors: string[];
}

export function TextEditor({ 
  editor, 
  title, 
  setTitle, 
  colorPickerOpened,
  setColorPickerOpened,
  textColors
}: TextEditorProps) {
  return (
    <Card withBorder mb="md" padding="lg">
      <TextInput
        placeholder="Article Title"
        size="xl"
        variant="unstyled"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        styles={{ input: { fontSize: '28px', fontWeight: 700 } }}
        mb="lg"
      />
      
      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar sticky>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Highlight />
            
            <ColorPicker 
              opened={colorPickerOpened}
              setOpened={setColorPickerOpened}
              editor={editor}
              colors={textColors}
            />
          </RichTextEditor.ControlsGroup>
          
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>
          
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
          </RichTextEditor.ControlsGroup>
          
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>
          
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>
        
        <RichTextEditor.Content 
          style={{ minHeight: 'calc(100vh - 340px)' }} 
        />
      </RichTextEditor>
    </Card>
  );
}
