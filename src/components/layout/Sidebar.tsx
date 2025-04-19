
import { NavLink } from '@mantine/core';
import { useLocation, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Search, 
  FileText, 
  MessageSquare, 
  Bell, 
  GitBranch, 
  Layers
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
}

export default function Sidebar({ collapsed }: SidebarProps) {
  const location = useLocation();
  
  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', to: '/' },
    { icon: <Search size={20} />, label: 'Search Data', to: '/search' },
    { icon: <FileText size={20} />, label: 'Article Editor', to: '/editor' },
    { icon: <MessageSquare size={20} />, label: 'Messages', to: '/messages' },
    { icon: <Bell size={20} />, label: 'Notifications', to: '/notifications' },
    { icon: <GitBranch size={20} />, label: 'Version Control', to: '/version-control' },
    { icon: <Layers size={20} />, label: 'My Articles', to: '/articles' },
  ];

  return (
    <div style={{ padding: collapsed ? '8px 0' : '16px 8px' }}>
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          leftSection={item.icon}
          label={collapsed ? '' : item.label}
          active={location.pathname === item.to}
          variant="light"
          component={Link}
          to={item.to}
          style={{ 
            borderRadius: '4px',
            marginBottom: '4px',
            justifyContent: collapsed ? 'center' : 'flex-start'
          }}
        />
      ))}
    </div>
  );
}
