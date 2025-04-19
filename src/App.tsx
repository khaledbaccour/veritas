import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppShell } from '@mantine/core';
import { Toaster } from './components/ui/toaster';

import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import Search from './pages/Search';
import Editor from './pages/Editor';
import Messages from './pages/Messages';
import NotificationsPage from './pages/NotificationsPage';
import VersionControl from './pages/VersionControl';
import Articles from './pages/Articles';
import Whiteboards from './pages/Whiteboards';
import Whiteboard from './pages/Whiteboard';
import Whistleblower from './pages/Whistleblower';

function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ 
        width: collapsed ? 80 : 240, 
        breakpoint: 'sm', 
        collapsed: { mobile: collapsed } 
      }}
      padding="md"
    >
      <AppShell.Header>
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
      </AppShell.Header>
      <AppShell.Navbar>
        <Sidebar collapsed={collapsed} />
      </AppShell.Navbar>
      <AppShell.Main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/search" element={<Search />} />
          <Route path="/editor/:id?" element={<Editor />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/version-control" element={<VersionControl />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/whiteboards" element={<Whiteboards />} />
          <Route path="/whiteboard/:id?" element={<Whiteboard />} />
          <Route path="/whistleblower" element={<Whistleblower />} />
        </Routes>
        <Toaster />
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
