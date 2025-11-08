import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  CircularProgress,
  Fade,
  Grow,
} from '@mui/material';
import {
  Mic as MicIcon,
  Send as SendIcon,
  Psychology as BrainIcon,
  SmartToy as AIIcon,
  Person as UserIcon,
  Router as NetworkIcon,
  Folder as FileIcon,
  Security as SecurityIcon,
  CheckCircle as SuccessIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

// Neural Command Types
interface NeuralCommand {
  id: string;
  text: string;
  timestamp: Date;
  type: 'user' | 'system' | 'ai';
  status: 'processing' | 'completed' | 'error' | 'pending';
  intent?: {
    action: string;
    target: string;
    context: any;
  };
  response?: {
    text: string;
    actions: Array<{
      label: string;
      type: 'primary' | 'secondary';
      handler: () => void;
    }>;
    data?: any;
  };
}

interface NeuralState {
  isListening: boolean;
  isProcessing: boolean;
  confidence: number;
  suggestions: string[];
  context: {
    user: any;
    location: string;
    recentActions: string[];
  };
}

export const NeuralCommandInterface: React.FC = () => {
  const [commands, setCommands] = useState<NeuralCommand[]>([
    {
      id: '1',
      text: 'Welcome to NEXUS CORTEX. How can I help you secure your digital workspace?',
      timestamp: new Date(),
      type: 'system',
      status: 'completed',
    },
  ]);

  const [currentInput, setCurrentInput] = useState('');
  const [neuralState, setNeuralState] = useState<NeuralState>({
    isListening: false,
    isProcessing: false,
    confidence: 0,
    suggestions: [
      'Secure the finance folder',
      'Add a new team member',
      'Check network health',
      'Create a backup policy',
    ],
    context: {
      user: { name: 'Alice', role: 'Admin' },
      location: 'Office Network',
      recentActions: ['Created user account', 'Updated security policy'],
    },
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const commandsEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    commandsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [commands]);

  // Neural Processing Simulation
  const processCommand = useCallback(async (text: string): Promise<void> => {
    const commandId = `cmd-${Date.now()}`;

    // Add user command
    const userCommand: NeuralCommand = {
      id: commandId,
      text,
      timestamp: new Date(),
      type: 'user',
      status: 'processing',
    };

    setCommands(prev => [...prev, userCommand]);
    setNeuralState(prev => ({ ...prev, isProcessing: true }));

    // Simulate neural processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    // AI Response based on command analysis
    const aiResponse = generateAIResponse(text);

    const aiCommand: NeuralCommand = {
      id: `ai-${Date.now()}`,
      text: aiResponse.text,
      timestamp: new Date(),
      type: 'ai',
      status: 'completed',
      response: aiResponse,
    };

    setCommands(prev => prev.map(cmd =>
      cmd.id === commandId
        ? { ...cmd, status: 'completed' }
        : cmd
    ));

    setCommands(prev => [...prev, aiCommand]);
    setNeuralState(prev => ({ ...prev, isProcessing: false, confidence: aiResponse.confidence }));
  }, []);

  const generateAIResponse = (input: string): NeuralCommand['response'] => {
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes('secure') && lowerInput.includes('folder')) {
      return {
        text: 'I understand you want to secure a folder. I can apply encryption, access controls, and monitoring. Which folder would you like to secure?',
        confidence: 0.95,
        actions: [
          {
            label: 'Secure Finance Folder',
            type: 'primary',
            handler: () => console.log('Securing finance folder'),
          },
          {
            label: 'Choose Different Folder',
            type: 'secondary',
            handler: () => console.log('Opening folder selector'),
          },
        ],
      };
    }

    if (lowerInput.includes('add') && lowerInput.includes('team member')) {
      return {
        text: 'Perfect! I can help you add a new team member with appropriate access controls. What\'s their email address?',
        confidence: 0.92,
        actions: [
          {
            label: 'Start Onboarding Flow',
            type: 'primary',
            handler: () => console.log('Starting onboarding'),
          },
        ],
      };
    }

    if (lowerInput.includes('network') && lowerInput.includes('health')) {
      return {
        text: 'Checking network health across all connected devices and services. All systems are operating normally with 98% uptime.',
        confidence: 0.88,
        actions: [
          {
            label: 'View Detailed Report',
            type: 'primary',
            handler: () => console.log('Showing network report'),
          },
          {
            label: 'Run Diagnostics',
            type: 'secondary',
            handler: () => console.log('Running diagnostics'),
          },
        ],
        data: {
          uptime: '98.5%',
          devices: 23,
          alerts: 1,
        },
      };
    }

    return {
      text: `I understand you want to "${input}". Let me analyze this request and provide the best course of action.`,
      confidence: 0.75,
      actions: [
        {
          label: 'Proceed',
          type: 'primary',
          handler: () => console.log('Proceeding with action'),
        },
        {
          label: 'Get More Details',
          type: 'secondary',
          handler: () => console.log('Requesting more details'),
        },
      ],
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentInput.trim() || neuralState.isProcessing) return;

    const text = currentInput.trim();
    setCurrentInput('');
    await processCommand(text);
  };

  const handleSuggestionClick = async (suggestion: string) => {
    setCurrentInput(suggestion);
    await processCommand(suggestion);
  };

  const toggleVoiceInput = () => {
    setNeuralState(prev => ({
      ...prev,
      isListening: !prev.isListening,
    }));

    // Simulate voice recognition
    if (!neuralState.isListening) {
      setTimeout(() => {
        setNeuralState(prev => ({ ...prev, isListening: false }));
        setCurrentInput('Secure the finance folder');
      }, 2000);
    }
  };

  const getCommandIcon = (command: NeuralCommand) => {
    switch (command.type) {
      case 'user':
        return <UserIcon />;
      case 'ai':
        return <AIIcon />;
      case 'system':
        return <BrainIcon />;
      default:
        return <InfoIcon />;
    }
  };

  const getStatusIcon = (status: NeuralCommand['status']) => {
    switch (status) {
      case 'processing':
        return <CircularProgress size={16} />;
      case 'completed':
        return <SuccessIcon color="success" />;
      case 'error':
        return <ErrorIcon color="error" />;
      default:
        return <InfoIcon color="info" />;
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      bgcolor: 'background.default',
    }}>
      {/* Header */}
      <Paper sx={{
        p: 2,
        borderRadius: 0,
        bgcolor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{
            bgcolor: 'primary.main',
            width: 40,
            height: 40,
          }}>
            <BrainIcon />
          </Avatar>
          <Box>
            <Typography variant="h6">Neural Command Interface</Typography>
            <Typography variant="body2" color="text.secondary">
              AI-powered workspace control • Confidence: {Math.round(neuralState.confidence * 100)}%
            </Typography>
          </Box>
          <Chip
            label={neuralState.isListening ? 'Listening...' : 'Voice Ready'}
            color={neuralState.isListening ? 'primary' : 'default'}
            size="small"
            sx={{ ml: 'auto' }}
          />
        </Box>
      </Paper>

      {/* Commands History */}
      <Box sx={{
        flex: 1,
        overflow: 'auto',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}>
        {commands.map((command, index) => (
          <Grow in key={command.id} timeout={300 + index * 100}>
            <Paper
              sx={{
                p: 2,
                bgcolor: command.type === 'user' ? 'primary.main' : 'background.paper',
                color: command.type === 'user' ? 'primary.contrastText' : 'text.primary',
                alignSelf: command.type === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '70%',
                borderRadius: 3,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <Avatar sx={{
                  width: 24,
                  height: 24,
                  bgcolor: command.type === 'user' ? 'primary.contrastText' : 'primary.main',
                }}>
                  {getCommandIcon(command)}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    {command.text}
                  </Typography>

                  {command.response && (
                    <Box sx={{ mt: 2 }}>
                      {command.response.actions.map((action, actionIndex) => (
                        <Chip
                          key={actionIndex}
                          label={action.label}
                          onClick={action.handler}
                          color={action.type === 'primary' ? 'secondary' : 'default'}
                          size="small"
                          sx={{ mr: 1, mb: 1 }}
                        />
                      ))}
                    </Box>
                  )}

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                    {getStatusIcon(command.status)}
                    <Typography variant="caption" color="text.secondary">
                      {command.timestamp.toLocaleTimeString()}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grow>
        ))}

        {neuralState.isProcessing && (
          <Fade in>
            <Paper sx={{
              p: 2,
              bgcolor: 'background.paper',
              alignSelf: 'flex-start',
              borderRadius: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}>
              <AIIcon color="primary" />
              <Typography variant="body2">Analyzing your request...</Typography>
              <CircularProgress size={16} />
            </Paper>
          </Fade>
        )}

        <div ref={commandsEndRef} />
      </Box>

      {/* Suggestions */}
      {neuralState.suggestions.length > 0 && !neuralState.isProcessing && (
        <Box sx={{ px: 2, pb: 1 }}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            Suggested commands:
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {neuralState.suggestions.map((suggestion, index) => (
              <Chip
                key={index}
                label={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
                variant="outlined"
                size="small"
                sx={{ cursor: 'pointer' }}
              />
            ))}
          </Box>
        </Box>
      )}

      {/* Input Area */}
      <Paper sx={{
        p: 2,
        borderRadius: 0,
        bgcolor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider',
      }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TextField
              fullWidth
              placeholder="Ask me anything about your workspace..."
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              disabled={neuralState.isProcessing}
              inputRef={inputRef}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                },
              }}
            />
            <IconButton
              onClick={toggleVoiceInput}
              color={neuralState.isListening ? 'primary' : 'default'}
              disabled={neuralState.isProcessing}
            >
              <MicIcon />
            </IconButton>
            <IconButton
              type="submit"
              color="primary"
              disabled={!currentInput.trim() || neuralState.isProcessing}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Context Indicators */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
          <Typography variant="caption" color="text.secondary">
            Context: {neuralState.context.user.name} • {neuralState.context.location}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <NetworkIcon fontSize="small" color="success" />
            <SecurityIcon fontSize="small" color="success" />
            <FileIcon fontSize="small" color="success" />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};