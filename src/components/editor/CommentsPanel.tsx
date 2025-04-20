import { Text, Group, Badge, Card, Avatar, Button, TextInput, ActionIcon } from '@mantine/core';
import { CornerDownLeft } from 'lucide-react';

interface Comment {
  id: string;
  content: string;
  userName: string;
  userAvatar: string;
  createdAt: string;
  resolved: boolean;
}

interface CommentsPanelProps {
  comments: Comment[];
}

export function CommentsPanel({ comments }: CommentsPanelProps) {
  return (
    <>
      <Group justify="space-between" mb="md">
        <Text fw={500}>Comments ({comments.length})</Text>
        <Badge>{comments.filter(c => !c.resolved).length} Open</Badge>
      </Group>
      
      {comments.map((comment) => (
        <Card key={comment.id} withBorder mb="sm" padding="sm">
          <Group mb="xs">
            <Avatar src={comment.userAvatar} radius="xl" size="sm" />
            <div style={{ flex: 1 }}>
              <Text size="sm" fw={500}>{comment.userName}</Text>
              <Text size="xs" c="dimmed">
                {new Date(comment.createdAt).toLocaleDateString()}
              </Text>
            </div>
            {comment.resolved && (
              <Badge color="teal" size="sm">Resolved</Badge>
            )}
          </Group>
          
          <Text size="sm">{comment.content}</Text>
          
          {!comment.resolved && (
            <Group mt="xs">
              <Button variant="subtle" size="xs">Reply</Button>
              <Button variant="outline" size="xs">Resolve</Button>
            </Group>
          )}
        </Card>
      ))}
      
      <TextInput
        placeholder="Add a comment..."
        rightSection={
          <ActionIcon>
            <CornerDownLeft size={16} />
          </ActionIcon>
        }
        mt="md"
      />
    </>
  );
}
