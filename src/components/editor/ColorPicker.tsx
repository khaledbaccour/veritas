import { Popover, Tooltip, ActionIcon, Box, Text, Group, ColorSwatch } from '@mantine/core';
import { Palette } from 'lucide-react';
import { Editor } from '@tiptap/react';

interface ColorPickerProps {
  opened: boolean;
  setOpened: (opened: boolean) => void;
  editor: Editor | null;
  colors: string[];
}

export function ColorPicker({ opened, setOpened, editor, colors }: ColorPickerProps) {
  const setTextColor = (color: string) => {
    editor?.chain().focus().setColor(color).run();
    setOpened(false);
  };

  return (
    <Popover 
      opened={opened} 
      onChange={setOpened}
      position="bottom"
      width={240}
      withinPortal
    >
      <Popover.Target>
        <Tooltip label="Text Color">
        <ActionIcon
            variant="light"
            onClick={(): void => setOpened(!opened)}
            color={editor?.getAttributes('textStyle').color || 'gray'}
        >
            <Palette size={16} />
        </ActionIcon>
        </Tooltip>
      </Popover.Target>
      <Popover.Dropdown>
        <Box p="xs">
          <Text size="sm" fw={500} mb="xs">Text Color</Text>
          <Group gap="xs">
            {colors.map((color) => (
              <ColorSwatch
                key={color}
                color={color}
                size={24}
                style={{ cursor: 'pointer' }}
                onClick={() => setTextColor(color)}
              />
            ))}
          </Group>
        </Box>
      </Popover.Dropdown>
    </Popover>
  );
}
