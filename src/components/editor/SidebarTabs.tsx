import { Tabs } from '@mantine/core';
import { UserPlus, MessageSquare, History } from 'lucide-react';
import { CollaboratorsPanel } from './CollaboratorsPanel';
import { CommentsPanel } from './CommentsPanel';
import { VersionHistoryPanel } from './VersionHistoryPanel';

interface SidebarTabsProps {
  article: any;
}

export function SidebarTabs({ article }: SidebarTabsProps) {
  return (
    <Tabs defaultValue="collaborators">
      <Tabs.List grow>
        <Tabs.Tab value="collaborators" leftSection={<UserPlus size={16} />}>
          Team
        </Tabs.Tab>
        <Tabs.Tab value="comments" leftSection={<MessageSquare size={16} />}>
          Comments
        </Tabs.Tab>
        <Tabs.Tab value="versions" leftSection={<History size={16} />}>
          History
        </Tabs.Tab>
      </Tabs.List>
      
      <Tabs.Panel value="collaborators" pt="md">
        <CollaboratorsPanel collaborators={article.collaborators} />
      </Tabs.Panel>
      
      <Tabs.Panel value="comments" pt="md">
        <CommentsPanel comments={article.comments} />
      </Tabs.Panel>
      
      <Tabs.Panel value="versions" pt="md">
        <VersionHistoryPanel versions={article.versions} />
      </Tabs.Panel>
    </Tabs>
  );
}
