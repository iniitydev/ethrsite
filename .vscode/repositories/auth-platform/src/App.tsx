import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline, Box } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Core Components
import { Shell } from './components/layout/Shell';
import { MissionControl } from './components/dashboard/MissionControl';
import { IdentityHub } from './components/identity/IdentityHub';
import { NetworkCanvas } from './components/network/NetworkCanvas';
import { WorkspaceHub } from './components/workspace/WorkspaceHub';
import { IntelligenceCenter } from './components/intelligence/IntelligenceCenter';
import { SovereignProfile } from './components/profile/SovereignProfile';

// Context Providers
import { AuthProvider } from './contexts/AuthContext';
import { PlatformProvider } from './contexts/PlatformContext';
import { IntelligenceProvider } from './contexts/IntelligenceContext';

// Theme & Styles
import { nexusTheme } from './theme/nexusTheme';
import './styles/global.css';

// Query Client Configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }
        return failureCount < 3;
      },
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={nexusTheme}>
        <CssBaseline />
        <AuthProvider>
          <PlatformProvider>
            <IntelligenceProvider>
              <Router>
                <Box sx={{ display: 'flex', minHeight: '100vh' }}>
                  <Shell>
                    <Routes>
                      <Route path="/" element={<MissionControl />} />
                      <Route path="/identity/*" element={<IdentityHub />} />
                      <Route path="/network/*" element={<NetworkCanvas />} />
                      <Route path="/workspace/*" element={<WorkspaceHub />} />
                      <Route path="/intelligence/*" element={<IntelligenceCenter />} />
                      <Route path="/profile/*" element={<SovereignProfile />} />
                    </Routes>
                  </Shell>
                </Box>
              </Router>
            </IntelligenceProvider>
          </PlatformProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;