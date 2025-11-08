import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
interface IntelligenceSuggestion {
  id: string;
  type: 'action' | 'insight' | 'warning' | 'opportunity';
  title: string;
  description: string;
  confidence: number; // 0-1
  context: {
    user?: string;
    resource?: string;
    location?: string;
  };
  actions: Array<{
    label: string;
    primary: boolean;
    handler: () => void;
  }>;
  timestamp: Date;
  dismissed?: boolean;
}

interface IntelligenceMetrics {
  suggestionsGenerated: number;
  actionsTaken: number;
  userSatisfaction: number;
  automationRate: number;
}

interface IntelligenceState {
  suggestions: IntelligenceSuggestion[];
  metrics: IntelligenceMetrics;
  isActive: boolean;
  lastAnalysis: Date | null;
}

interface IntelligenceContextType extends IntelligenceState {
  generateSuggestions: () => Promise<void>;
  dismissSuggestion: (id: string) => void;
  executeAction: (suggestionId: string, actionIndex: number) => void;
  toggleIntelligence: () => void;
}

// Context
const IntelligenceContext = createContext<IntelligenceContextType | undefined>(undefined);

// Provider Component
interface IntelligenceProviderProps {
  children: ReactNode;
}

export const IntelligenceProvider: React.FC<IntelligenceProviderProps> = ({ children }) => {
  const [intelligenceState, setIntelligenceState] = useState<IntelligenceState>({
    suggestions: [],
    metrics: {
      suggestionsGenerated: 0,
      actionsTaken: 0,
      userSatisfaction: 0,
      automationRate: 0,
    },
    isActive: true,
    lastAnalysis: null,
  });

  // Generate suggestions periodically
  useEffect(() => {
    if (intelligenceState.isActive) {
      generateSuggestions();

      const interval = setInterval(() => {
        generateSuggestions();
      }, 60000); // Every minute

      return () => clearInterval(interval);
    }
  }, [intelligenceState.isActive]);

  const generateSuggestions = async (): Promise<void> => {
    try {
      // Mock intelligence generation - replace with actual AI service
      const newSuggestions = await analyzePlatformData();

      setIntelligenceState(prev => ({
        ...prev,
        suggestions: [
          ...prev.suggestions.filter(s => !s.dismissed),
          ...newSuggestions,
        ].slice(0, 10), // Keep only latest 10
        metrics: {
          ...prev.metrics,
          suggestionsGenerated: prev.metrics.suggestionsGenerated + newSuggestions.length,
        },
        lastAnalysis: new Date(),
      }));
    } catch (error) {
      console.error('Intelligence analysis failed:', error);
    }
  };

  const analyzePlatformData = async (): Promise<IntelligenceSuggestion[]> => {
    // Mock analysis - replace with actual AI/ML analysis
    const suggestions: IntelligenceSuggestion[] = [];

    // Example suggestions based on patterns
    const mockPatterns = [
      {
        type: 'warning' as const,
        title: 'Unusual Login Pattern Detected',
        description: 'User "alice" logged in from an unusual location. Consider requiring additional verification.',
        confidence: 0.85,
        context: { user: 'alice', location: 'Unknown City' },
        actions: [
          {
            label: 'Require MFA',
            primary: true,
            handler: () => console.log('Require MFA for alice'),
          },
          {
            label: 'Block Location',
            primary: false,
            handler: () => console.log('Block location for alice'),
          },
        ],
      },
      {
        type: 'opportunity' as const,
        title: 'Storage Optimization Available',
        description: '12 unused files older than 6 months could be archived, freeing 2.3GB of space.',
        confidence: 0.92,
        context: { resource: 'storage' },
        actions: [
          {
            label: 'Auto Archive',
            primary: true,
            handler: () => console.log('Auto archive old files'),
          },
          {
            label: 'Review Files',
            primary: false,
            handler: () => console.log('Show files for review'),
          },
        ],
      },
      {
        type: 'insight' as const,
        title: 'Team Collaboration Pattern',
        description: 'Finance team shares documents with Marketing 3x more than average. Consider creating a shared workspace.',
        confidence: 0.78,
        context: { user: 'team' },
        actions: [
          {
            label: 'Create Workspace',
            primary: true,
            handler: () => console.log('Create shared workspace'),
          },
          {
            label: 'View Details',
            primary: false,
            handler: () => console.log('Show collaboration details'),
          },
        ],
      },
    ];

    // Randomly select 1-2 suggestions for demo
    const selectedCount = Math.floor(Math.random() * 2) + 1;
    for (let i = 0; i < selectedCount; i++) {
      const pattern = mockPatterns[Math.floor(Math.random() * mockPatterns.length)];
      suggestions.push({
        ...pattern,
        id: `suggestion-${Date.now()}-${i}`,
        timestamp: new Date(),
      });
    }

    return suggestions;
  };

  const dismissSuggestion = (id: string): void => {
    setIntelligenceState(prev => ({
      ...prev,
      suggestions: prev.suggestions.map(s =>
        s.id === id ? { ...s, dismissed: true } : s
      ),
    }));
  };

  const executeAction = (suggestionId: string, actionIndex: number): void => {
    const suggestion = intelligenceState.suggestions.find(s => s.id === suggestionId);
    if (suggestion && suggestion.actions[actionIndex]) {
      suggestion.actions[actionIndex].handler();

      // Update metrics
      setIntelligenceState(prev => ({
        ...prev,
        metrics: {
          ...prev.metrics,
          actionsTaken: prev.metrics.actionsTaken + 1,
        },
        suggestions: prev.suggestions.map(s =>
          s.id === suggestionId ? { ...s, dismissed: true } : s
        ),
      }));
    }
  };

  const toggleIntelligence = (): void => {
    setIntelligenceState(prev => ({
      ...prev,
      isActive: !prev.isActive,
    }));
  };

  const contextValue: IntelligenceContextType = {
    ...intelligenceState,
    generateSuggestions,
    dismissSuggestion,
    executeAction,
    toggleIntelligence,
  };

  return (
    <IntelligenceContext.Provider value={contextValue}>
      {children}
    </IntelligenceContext.Provider>
  );
};

// Hook
export const useIntelligence = (): IntelligenceContextType => {
  const context = useContext(IntelligenceContext);
  if (context === undefined) {
    throw new Error('useIntelligence must be used within an IntelligenceProvider');
  }
  return context;
};