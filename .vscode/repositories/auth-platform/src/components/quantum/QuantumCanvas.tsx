import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Box, Paper, Typography, IconButton, Tooltip, Fab } from '@mui/material';
import {
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  CenterFocusStrong as CenterIcon,
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  Shuffle as ShuffleIcon,
  Psychology as AIIcon,
} from '@mui/icons-material';

// Quantum Node Types
interface QuantumNode {
  id: string;
  type: 'user' | 'device' | 'file' | 'policy' | 'service';
  label: string;
  x: number;
  y: number;
  vx: number; // velocity for physics
  vy: number;
  ax: number; // acceleration
  ay: number;
  mass: number;
  charge: number; // for electromagnetic forces
  connections: string[];
  data: any;
  quantumState: {
    superposition: boolean;
    entangled: boolean;
    collapsed: boolean;
    probability: number;
  };
}

// Quantum Connection Types
interface QuantumConnection {
  id: string;
  from: string;
  to: string;
  type: 'identity' | 'network' | 'data' | 'policy' | 'entanglement';
  strength: number;
  phase: number; // quantum phase
  entangled: boolean;
}

// Quantum Field Properties
interface QuantumField {
  gravity: number;
  electromagnetism: number;
  entanglement: number;
  uncertainty: number;
  observer: { x: number; y: number };
}

const QUANTUM_CONSTANTS = {
  PLANCK: 6.626e-34,
  LIGHT_SPEED: 299792458,
  GRAVITY_CONSTANT: 6.674e-11,
  ENTANGLEMENT_STRENGTH: 0.8,
  UNCERTAINTY_PRINCIPLE: 1e-34,
};

export const QuantumCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [isPlaying, setIsPlaying] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Quantum State
  const [nodes, setNodes] = useState<QuantumNode[]>([
    {
      id: 'user-1',
      type: 'user',
      label: 'Alice',
      x: 400,
      y: 300,
      vx: 0,
      vy: 0,
      ax: 0,
      ay: 0,
      mass: 1,
      charge: 1,
      connections: ['device-1', 'file-1'],
      data: { role: 'admin', mfa: true },
      quantumState: { superposition: false, entangled: true, collapsed: false, probability: 1 },
    },
    {
      id: 'device-1',
      type: 'device',
      label: 'MacBook Pro',
      x: 500,
      y: 250,
      vx: 0,
      vy: 0,
      ax: 0,
      ay: 0,
      mass: 0.8,
      charge: -0.5,
      connections: ['user-1', 'policy-1'],
      data: { os: 'macOS', trusted: true },
      quantumState: { superposition: false, entangled: true, collapsed: false, probability: 1 },
    },
    {
      id: 'file-1',
      type: 'file',
      label: 'Q4_Report.pdf',
      x: 300,
      y: 350,
      vx: 0,
      vy: 0,
      ax: 0,
      ay: 0,
      mass: 0.3,
      charge: 0.2,
      connections: ['user-1', 'policy-2'],
      data: { size: '2.3MB', shared: true },
      quantumState: { superposition: false, entangled: false, collapsed: false, probability: 1 },
    },
    {
      id: 'policy-1',
      type: 'policy',
      label: 'Admin Access',
      x: 450,
      y: 400,
      vx: 0,
      vy: 0,
      ax: 0,
      ay: 0,
      mass: 0.5,
      charge: 0.8,
      connections: ['device-1', 'service-1'],
      data: { type: 'network', strength: 'high' },
      quantumState: { superposition: true, entangled: false, collapsed: false, probability: 0.7 },
    },
    {
      id: 'service-1',
      type: 'service',
      label: 'NetBird',
      x: 550,
      y: 350,
      vx: 0,
      vy: 0,
      ax: 0,
      ay: 0,
      mass: 2,
      charge: 0,
      connections: ['policy-1'],
      data: { status: 'healthy', peers: 23 },
      quantumState: { superposition: false, entangled: false, collapsed: true, probability: 1 },
    },
  ]);

  const [connections] = useState<QuantumConnection[]>([
    { id: 'conn-1', from: 'user-1', to: 'device-1', type: 'identity', strength: 1, phase: 0, entangled: true },
    { id: 'conn-2', from: 'user-1', to: 'file-1', type: 'data', strength: 0.8, phase: Math.PI/4, entangled: false },
    { id: 'conn-3', from: 'device-1', to: 'policy-1', type: 'policy', strength: 0.9, phase: Math.PI/2, entangled: false },
    { id: 'conn-4', from: 'policy-1', to: 'service-1', type: 'network', strength: 1, phase: 0, entangled: false },
  ]);

  const [quantumField] = useState<QuantumField>({
    gravity: 0.1,
    electromagnetism: 0.05,
    entanglement: 0.3,
    uncertainty: 0.01,
    observer: { x: 400, y: 300 },
  });

  // Quantum Physics Engine
  const calculateForces = useCallback((node: QuantumNode, allNodes: QuantumNode[]): { fx: number; fy: number } => {
    let fx = 0;
    let fy = 0;

    allNodes.forEach(otherNode => {
      if (node.id === otherNode.id) return;

      const dx = otherNode.x - node.x;
      const dy = otherNode.y - node.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 1) return; // Prevent division by zero

      // Gravitational Force (attractive)
      const gravitationalForce = (QUANTUM_CONSTANTS.GRAVITY_CONSTANT * node.mass * otherNode.mass) / (distance * distance);
      const gravFx = (gravitationalForce * dx) / distance;
      const gravFy = (gravitationalForce * dy) / distance;

      // Electromagnetic Force (repulsive/attractive based on charge)
      const electromagneticForce = (quantumField.electromagnetism * node.charge * otherNode.charge) / (distance * distance);
      const emFx = (electromagneticForce * dx) / distance;
      const emFy = (electromagneticForce * dy) / distance;

      // Entanglement Force (if entangled)
      let entFx = 0;
      let entFy = 0;
      if (node.quantumState.entangled && otherNode.quantumState.entangled) {
        const entanglementForce = QUANTUM_CONSTANTS.ENTANGLEMENT_STRENGTH / distance;
        entFx = (entanglementForce * dx) / distance;
        entFy = (entanglementForce * dy) / distance;
      }

      fx += gravFx + emFx + entFx;
      fy += gravFy + emFy + entFy;
    });

    // Observer Effect (Heisenberg Uncertainty)
    const observerDx = quantumField.observer.x - node.x;
    const observerDy = quantumField.observer.y - node.y;
    const observerDistance = Math.sqrt(observerDx * observerDx + observerDy * observerDy);

    if (observerDistance < 100) { // Within observation range
      const uncertainty = quantumField.uncertainty / observerDistance;
      fx += (Math.random() - 0.5) * uncertainty;
      fy += (Math.random() - 0.5) * uncertainty;
    }

    return { fx, fy };
  }, [quantumField]);

  // Animation Loop
  const animate = useCallback(() => {
    if (!isPlaying) return;

    setNodes(prevNodes => {
      return prevNodes.map(node => {
        // Calculate forces
        const { fx, fy } = calculateForces(node, prevNodes);

        // Update acceleration
        const ax = fx / node.mass;
        const ay = fy / node.mass;

        // Update velocity with damping
        const newVx = (node.vx + ax) * 0.99;
        const newVy = (node.vy + ay) * 0.99;

        // Update position
        const newX = node.x + newVx;
        const newY = node.y + newVy;

        // Boundary constraints
        const constrainedX = Math.max(50, Math.min(750, newX));
        const constrainedY = Math.max(50, Math.min(550, newY));

        return {
          ...node,
          x: constrainedX,
          y: constrainedY,
          vx: constrainedX !== newX ? 0 : newVx,
          vy: constrainedY !== newY ? 0 : newVy,
          ax,
          ay,
        };
      });
    });

    animationRef.current = requestAnimationFrame(animate);
  }, [isPlaying, calculateForces]);

  useEffect(() => {
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, animate]);

  // Canvas Rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Apply zoom and pan
      ctx.save();
      ctx.translate(pan.x, pan.y);
      ctx.scale(zoom, zoom);

      // Draw connections first
      connections.forEach(connection => {
        const fromNode = nodes.find(n => n.id === connection.from);
        const toNode = nodes.find(n => n.id === connection.to);

        if (!fromNode || !toNode) return;

        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);

        // Connection styling based on type
        switch (connection.type) {
          case 'identity':
            ctx.strokeStyle = '#2563EB';
            ctx.lineWidth = 3;
            break;
          case 'network':
            ctx.strokeStyle = '#7C3AED';
            ctx.lineWidth = 2;
            break;
          case 'data':
            ctx.strokeStyle = '#059669';
            ctx.lineWidth = 2;
            break;
          case 'policy':
            ctx.strokeStyle = '#D97706';
            ctx.lineWidth = 2;
            break;
          case 'entanglement':
            ctx.strokeStyle = '#DC2626';
            ctx.lineWidth = 1;
            ctx.setLineDash([5, 5]);
            break;
        }

        ctx.stroke();

        // Draw entanglement particles if applicable
        if (connection.entangled) {
          const midX = (fromNode.x + toNode.x) / 2;
          const midY = (fromNode.y + toNode.y) / 2;
          ctx.beginPath();
          ctx.arc(midX, midY, 3, 0, 2 * Math.PI);
          ctx.fillStyle = '#DC2626';
          ctx.fill();
        }
      });

      // Draw nodes
      nodes.forEach(node => {
        const isSelected = selectedNode === node.id;
        const isHovered = hoveredNode === node.id;

        // Node glow effect
        if (isSelected || isHovered) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, 35, 0, 2 * Math.PI);
          ctx.fillStyle = node.quantumState.entangled ? 'rgba(220, 38, 38, 0.2)' : 'rgba(37, 99, 235, 0.2)';
          ctx.fill();
        }

        // Node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);

        // Node color based on type and quantum state
        let fillColor = '#64748B'; // default
        switch (node.type) {
          case 'user':
            fillColor = node.quantumState.entangled ? '#DC2626' : '#2563EB';
            break;
          case 'device':
            fillColor = node.quantumState.entangled ? '#DC2626' : '#7C3AED';
            break;
          case 'file':
            fillColor = node.quantumState.entangled ? '#DC2626' : '#059669';
            break;
          case 'policy':
            fillColor = node.quantumState.superposition ? '#D97706' : '#F59E0B';
            break;
          case 'service':
            fillColor = '#334155';
            break;
        }

        ctx.fillStyle = fillColor;
        ctx.fill();

        // Node border
        ctx.strokeStyle = isSelected ? '#FFFFFF' : '#E2E8F0';
        ctx.lineWidth = isSelected ? 3 : 2;
        ctx.stroke();

        // Quantum state indicators
        if (node.quantumState.superposition) {
          // Draw probability cloud
          ctx.beginPath();
          ctx.arc(node.x, node.y, 25, 0, 2 * Math.PI);
          ctx.strokeStyle = 'rgba(245, 158, 11, 0.5)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Node label
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.x, node.y + 30);
      });

      ctx.restore();
    };

    render();
  }, [nodes, connections, zoom, pan, selectedNode, hoveredNode]);

  // Mouse interaction handlers
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left - pan.x) / zoom;
    const y = (event.clientY - rect.top - pan.y) / zoom;

    // Find clicked node
    const clickedNode = nodes.find(node => {
      const dx = node.x - x;
      const dy = node.y - y;
      return Math.sqrt(dx * dx + dy * dy) < 25;
    });

    setSelectedNode(clickedNode?.id || null);
  };

  const handleCanvasMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left - pan.x) / zoom;
    const y = (event.clientY - rect.top - pan.y) / zoom;

    // Find hovered node
    const hoveredNode = nodes.find(node => {
      const dx = node.x - x;
      const dy = node.y - y;
      return Math.sqrt(dx * dx + dy * dy) < 25;
    });

    setHoveredNode(hoveredNode?.id || null);
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev * 1.2, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev / 1.2, 0.5));
  const handleCenter = () => {
    setPan({ x: 0, y: 0 });
    setZoom(1);
  };

  const toggleAnimation = () => setIsPlaying(!isPlaying);

  const randomizePositions = () => {
    setNodes(prev => prev.map(node => ({
      ...node,
      x: Math.random() * 600 + 100,
      y: Math.random() * 400 + 100,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
    })));
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100vh', bgcolor: 'background.default' }}>
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onClick={handleCanvasClick}
        onMouseMove={handleCanvasMouseMove}
        style={{
          border: '1px solid #E2E8F0',
          borderRadius: '8px',
          cursor: 'pointer',
          background: 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)',
        }}
      />

      {/* Control Panel */}
      <Paper
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          bgcolor: 'background.paper',
          boxShadow: 3,
        }}
      >
        <Typography variant="h6" sx={{ mb: 1 }}>
          Quantum Controls
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Zoom In">
            <IconButton onClick={handleZoomIn} size="small">
              <ZoomInIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Zoom Out">
            <IconButton onClick={handleZoomOut} size="small">
              <ZoomOutIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Center View">
            <IconButton onClick={handleCenter} size="small">
              <CenterIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title={isPlaying ? 'Pause Simulation' : 'Play Simulation'}>
            <IconButton onClick={toggleAnimation} size="small">
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Randomize Positions">
            <IconButton onClick={randomizePositions} size="small">
              <ShuffleIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Paper>

      {/* Selected Node Details */}
      {selectedNode && (
        <Paper
          sx={{
            position: 'absolute',
            bottom: 16,
            left: 16,
            p: 2,
            maxWidth: 300,
            bgcolor: 'background.paper',
            boxShadow: 3,
          }}
        >
          {(() => {
            const node = nodes.find(n => n.id === selectedNode);
            if (!node) return null;

            return (
              <>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  {node.label}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Type: {node.type}
                </Typography>

                {/* Quantum State */}
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Quantum State
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {node.quantumState.superposition && (
                      <Chip label="Superposition" size="small" color="warning" variant="outlined" />
                    )}
                    {node.quantumState.entangled && (
                      <Chip label="Entangled" size="small" color="error" variant="outlined" />
                    )}
                    {node.quantumState.collapsed && (
                      <Chip label="Collapsed" size="small" color="info" variant="outlined" />
                    )}
                  </Box>
                </Box>

                {/* Node Data */}
                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Properties
                  </Typography>
                  {Object.entries(node.data).map(([key, value]) => (
                    <Typography key={key} variant="body2" sx={{ fontSize: '0.8rem' }}>
                      {key}: {String(value)}
                    </Typography>
                  ))}
                </Box>
              </>
            );
          })()}
        </Paper>
      )}

      {/* AI Assistant FAB */}
      <Fab
        sx={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          bgcolor: 'secondary.main',
          '&:hover': { bgcolor: 'secondary.dark' },
        }}
      >
        <AIIcon />
      </Fab>
    </Box>
  );
};