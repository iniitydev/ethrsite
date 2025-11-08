import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
interface PlatformHealth {
  identity: {
    status: 'healthy' | 'warning' | 'error';
    message: string;
    metrics: {
      activeUsers: number;
      mfaEnabled: number;
      failedLogins: number;
    };
  };
  network: {
    status: 'healthy' | 'warning' | 'error';
    message: string;
    metrics: {
      connectedPeers: number;
      totalPeers: number;
      averageLatency: number;
    };
  };
  workspace: {
    status: 'healthy' | 'warning' | 'error';
    message: string;
    metrics: {
      storageUsed: number;
      storageTotal: number;
      activeShares: number;
    };
  };
}

interface PlatformState {
  health: PlatformHealth;
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

interface PlatformContextType extends PlatformState {
  refreshHealth: () => Promise<void>;
  getHealthStatus: () => 'healthy' | 'warning' | 'error';
}

// Context
const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

// Provider Component
interface PlatformProviderProps {
  children: ReactNode;
}

export const PlatformProvider: React.FC<PlatformProviderProps> = ({ children }) => {
  const [platformState, setPlatformState] = useState<PlatformState>({
    health: {
      identity: {
        status: 'healthy',
        message: 'All systems operational',
        metrics: { activeUsers: 0, mfaEnabled: 0, failedLogins: 0 },
      },
      network: {
        status: 'healthy',
        message: 'All peers connected',
        metrics: { connectedPeers: 0, totalPeers: 0, averageLatency: 0 },
      },
      workspace: {
        status: 'healthy',
        message: 'Storage within limits',
        metrics: { storageUsed: 0, storageTotal: 0, activeShares: 0 },
      },
    },
    isLoading: true,
    error: null,
    lastUpdated: null,
  });

  // Initialize platform health on mount
  useEffect(() => {
    refreshHealth();
  }, []);

  // Auto-refresh health every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refreshHealth();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const refreshHealth = async (): Promise<void> => {
    setPlatformState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Fetch health from all services
      const [identityHealth, networkHealth, workspaceHealth] = await Promise.all([
        fetchIdentityHealth(),
        fetchNetworkHealth(),
        fetchWorkspaceHealth(),
      ]);

      setPlatformState({
        health: {
          identity: identityHealth,
          network: networkHealth,
          workspace: workspaceHealth,
        },
        isLoading: false,
        error: null,
        lastUpdated: new Date(),
      });
    } catch (error) {
      setPlatformState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch platform health',
      }));
    }
  };

  const fetchIdentityHealth = async () => {
    // Mock API call - replace with actual Zitadel health endpoint
    const response = await fetch('/api/health/identity');
    if (!response.ok) {
      throw new Error('Identity service health check failed');
    }
    return await response.json();
  };

  const fetchNetworkHealth = async () => {
    // Mock API call - replace with actual NetBird health endpoint
    const response = await fetch('/api/health/network');
    if (!response.ok) {
      throw new Error('Network service health check failed');
    }
    return await response.json();
  };

  const fetchWorkspaceHealth = async () => {
    // Mock API call - replace with actual Nextcloud health endpoint
    const response = await fetch('/api/health/workspace');
    if (!response.ok) {
      throw new Error('Workspace service health check failed');
    }
    return await response.json();
  };

  const getHealthStatus = (): 'healthy' | 'warning' | 'error' => {
    const { identity, network, workspace } = platformState.health;

    if (identity.status === 'error' || network.status === 'error' || workspace.status === 'error') {
      return 'error';
    }

    if (identity.status === 'warning' || network.status === 'warning' || workspace.status === 'warning') {
      return 'warning';
    }

    return 'healthy';
  };

  const contextValue: PlatformContextType = {
    ...platformState,
    refreshHealth,
    getHealthStatus,
  };

  return (
    <PlatformContext.Provider value={contextValue}>
      {children}
    </PlatformContext.Provider>
  );
};

// Hook
export const usePlatform = (): PlatformContextType => {
  const context = useContext(PlatformContext);
  if (context === undefined) {
    throw new Error('usePlatform must be used within a PlatformProvider');
  }
  return context;
};