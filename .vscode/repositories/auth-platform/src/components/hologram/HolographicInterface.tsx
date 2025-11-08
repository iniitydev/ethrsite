import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Paper, IconButton, Slider, Switch, FormControlLabel } from '@mui/material';
import {
  ViewInAr as HologramIcon,
  ThreeDRotation as RotateIcon,
  Straighten as ScaleIcon,
  Opacity as OpacityIcon,
  Animation as AnimationIcon,
  BlurOn as ParticleIcon,
} from '@mui/icons-material';

// Holographic Data Structures
interface HolographicNode {
  id: string;
  type: 'user' | 'device' | 'file' | 'policy' | 'service';
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  scale: number;
  opacity: number;
  color: string;
  connections: string[];
  data: any;
  holographic: {
    glow: number;
    particles: number;
    distortion: number;
    energy: number;
  };
}

interface HolographicConnection {
  id: string;
  from: string;
  to: string;
  type: 'data' | 'identity' | 'network' | 'policy';
  thickness: number;
  color: string;
  animated: boolean;
  holographic: {
    flow: number;
    pulse: number;
    twist: number;
  };
}

interface HologramSettings {
  rotation: { x: number; y: number; z: number };
  scale: number;
  opacity: number;
  animation: boolean;
  particles: boolean;
  distortion: number;
  perspective: number;
}

export const HolographicInterface: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [settings, setSettings] = useState<HologramSettings>({
    rotation: { x: 0, y: 0, z: 0 },
    scale: 1,
    opacity: 1,
    animation: true,
    particles: true,
    distortion: 0.5,
    perspective: 1000,
  });

  // Sample holographic data
  const [nodes] = useState<HolographicNode[]>([
    {
      id: 'user-1',
      type: 'user',
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: 1,
      opacity: 1,
      color: '#2563EB',
      connections: ['device-1', 'file-1'],
      data: { name: 'Alice', role: 'Admin' },
      holographic: { glow: 0.8, particles: 50, distortion: 0.2, energy: 1 },
    },
    {
      id: 'device-1',
      type: 'device',
      position: { x: 200, y: 100, z: 50 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: 0.8,
      opacity: 1,
      color: '#7C3AED',
      connections: ['user-1', 'policy-1'],
      data: { name: 'MacBook Pro', status: 'online' },
      holographic: { glow: 0.6, particles: 30, distortion: 0.1, energy: 0.8 },
    },
    {
      id: 'file-1',
      type: 'file',
      position: { x: -150, y: 80, z: -30 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: 0.6,
      opacity: 1,
      color: '#059669',
      connections: ['user-1'],
      data: { name: 'Q4_Report.pdf', size: '2.3MB' },
      holographic: { glow: 0.4, particles: 20, distortion: 0.3, energy: 0.6 },
    },
    {
      id: 'policy-1',
      type: 'policy',
      position: { x: 100, y: -100, z: 80 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: 0.7,
      opacity: 1,
      color: '#D97706',
      connections: ['device-1', 'service-1'],
      data: { name: 'Admin Access', strength: 'high' },
      holographic: { glow: 0.7, particles: 40, distortion: 0.4, energy: 0.9 },
    },
    {
      id: 'service-1',
      type: 'service',
      position: { x: 0, y: 200, z: 100 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: 1.2,
      opacity: 1,
      color: '#DC2626',
      connections: ['policy-1'],
      data: { name: 'NetBird', status: 'healthy' },
      holographic: { glow: 1, particles: 100, distortion: 0.1, energy: 1.2 },
    },
  ]);

  const [connections] = useState<HolographicConnection[]>([
    {
      id: 'conn-1',
      from: 'user-1',
      to: 'device-1',
      type: 'identity',
      thickness: 3,
      color: '#2563EB',
      animated: true,
      holographic: { flow: 1, pulse: 0.5, twist: 0.2 },
    },
    {
      id: 'conn-2',
      from: 'user-1',
      to: 'file-1',
      type: 'data',
      thickness: 2,
      color: '#059669',
      animated: true,
      holographic: { flow: 0.8, pulse: 0.3, twist: 0.1 },
    },
    {
      id: 'conn-3',
      from: 'device-1',
      to: 'policy-1',
      type: 'policy',
      thickness: 2,
      color: '#D97706',
      animated: false,
      holographic: { flow: 0.6, pulse: 0.2, twist: 0.3 },
    },
    {
      id: 'conn-4',
      from: 'policy-1',
      to: 'service-1',
      type: 'network',
      thickness: 4,
      color: '#DC2626',
      animated: true,
      holographic: { flow: 1.2, pulse: 0.8, twist: 0.4 },
    },
  ]);

  // 3D Projection Matrix
  const project3D = (point: { x: number; y: number; z: number }, perspective: number) => {
    const factor = perspective / (perspective + point.z);
    return {
      x: point.x * factor,
      y: point.y * factor,
      scale: factor,
    };
  };

  // Holographic Rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Apply global transformations
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.scale(settings.scale, settings.scale);
      ctx.rotate(settings.rotation.z * Math.PI / 180);
      ctx.globalAlpha = settings.opacity;

      // Render connections first (behind nodes)
      connections.forEach(connection => {
        const fromNode = nodes.find(n => n.id === connection.from);
        const toNode = nodes.find(n => n.id === connection.to);

        if (!fromNode || !toNode) return;

        const fromProj = project3D(fromNode.position, settings.perspective);
        const toProj = project3D(toNode.position, settings.perspective);

        // Holographic connection rendering
        ctx.beginPath();
        ctx.moveTo(fromProj.x, fromProj.y);
        ctx.lineTo(toProj.x, toProj.y);

        // Animated flow effect
        if (connection.animated && settings.animation) {
          const time = Date.now() * 0.001;
          const flowOffset = (time * connection.holographic.flow) % 1;

          ctx.strokeStyle = connection.color;
          ctx.lineWidth = connection.thickness;
          ctx.globalAlpha = 0.3 + 0.7 * Math.sin(time * connection.holographic.pulse);

          // Draw flowing particles
          for (let i = 0; i < 10; i++) {
            const particlePos = flowOffset + i * 0.1;
            if (particlePos <= 1) {
              const x = fromProj.x + (toProj.x - fromProj.x) * particlePos;
              const y = fromProj.y + (toProj.y - fromProj.y) * particlePos;

              ctx.beginPath();
              ctx.arc(x, y, 2, 0, 2 * Math.PI);
              ctx.fillStyle = connection.color;
              ctx.fill();
            }
          }
        } else {
          ctx.strokeStyle = connection.color;
          ctx.lineWidth = connection.thickness;
        }

        ctx.stroke();
      });

      // Render nodes
      nodes.forEach(node => {
        const projection = project3D(node.position, settings.perspective);

        ctx.save();
        ctx.translate(projection.x, projection.y);
        ctx.scale(projection.scale, projection.scale);

        // Holographic node glow
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 40);
        gradient.addColorStop(0, node.color + '40');
        gradient.addColorStop(1, node.color + '00');

        ctx.beginPath();
        ctx.arc(0, 0, 40, 0, 2 * Math.PI);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Node core
        ctx.beginPath();
        ctx.arc(0, 0, 20, 0, 2 * Math.PI);
        ctx.fillStyle = node.color;
        ctx.fill();

        // Holographic distortion effect
        if (settings.distortion > 0) {
          ctx.beginPath();
          for (let i = 0; i < 20; i++) {
            const angle = (i / 20) * 2 * Math.PI;
            const radius = 25 + Math.sin(Date.now() * 0.001 + i) * settings.distortion * 5;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = node.color + '60';
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Particle effects
        if (settings.particles && node.holographic.particles > 0) {
          for (let i = 0; i < node.holographic.particles; i++) {
            const angle = (i / node.holographic.particles) * 2 * Math.PI;
            const distance = 30 + Math.sin(Date.now() * 0.002 + i) * 10;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;

            ctx.beginPath();
            ctx.arc(x, y, 1, 0, 2 * Math.PI);
            ctx.fillStyle = node.color + '80';
            ctx.fill();
          }
        }

        // Energy field
        if (node.holographic.energy > 0) {
          ctx.beginPath();
          ctx.arc(0, 0, 35, 0, 2 * Math.PI);
          ctx.strokeStyle = node.color;
          ctx.lineWidth = 2;
          ctx.globalAlpha = 0.3 + 0.2 * Math.sin(Date.now() * 0.003);
          ctx.stroke();
        }

        // Node label
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(node.data.name || node.id, 0, 35);

        ctx.restore();
      });

      ctx.restore();

      if (settings.animation) {
        requestAnimationFrame(render);
      }
    };

    render();
  }, [nodes, connections, settings]);

  const updateSetting = (key: keyof HologramSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const updateRotation = (axis: 'x' | 'y' | 'z', value: number) => {
    setSettings(prev => ({
      ...prev,
      rotation: { ...prev.rotation, [axis]: value },
    }));
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#000011' }}>
      {/* Main Canvas */}
      <Box sx={{ flex: 1, position: 'relative' }}>
        <canvas
          ref={canvasRef}
          width={1200}
          height={800}
          style={{
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle at center, #000033 0%, #000011 100%)',
          }}
        />

        {/* Holographic Overlay Effects */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: 'none',
            background: `
              radial-gradient(circle at 20% 20%, rgba(37, 99, 235, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(124, 58, 237, 0.1) 0%, transparent 50%),
              linear-gradient(45deg, transparent 0%, rgba(255, 255, 255, 0.02) 50%, transparent 100%)
            `,
            animation: settings.animation ? 'hologram-flicker 3s infinite' : 'none',
          }}
        />
      </Box>

      {/* Control Panel */}
      <Paper
        sx={{
          width: 320,
          p: 3,
          bgcolor: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(37, 99, 235, 0.2)',
          color: 'white',
        }}
      >
        <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
          <HologramIcon />
          Holographic Controls
        </Typography>

        {/* Rotation Controls */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <RotateIcon fontSize="small" />
            Rotation
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
              <Typography variant="caption">X: {settings.rotation.x}°</Typography>
              <Slider
                value={settings.rotation.x}
                onChange={(_, value) => updateRotation('x', value as number)}
                min={-180}
                max={180}
                sx={{ color: '#2563EB' }}
              />
            </Box>
            <Box>
              <Typography variant="caption">Y: {settings.rotation.y}°</Typography>
              <Slider
                value={settings.rotation.y}
                onChange={(_, value) => updateRotation('y', value as number)}
                min={-180}
                max={180}
                sx={{ color: '#7C3AED' }}
              />
            </Box>
            <Box>
              <Typography variant="caption">Z: {settings.rotation.z}°</Typography>
              <Slider
                value={settings.rotation.z}
                onChange={(_, value) => updateRotation('z', value as number)}
                min={-180}
                max={180}
                sx={{ color: '#059669' }}
              />
            </Box>
          </Box>
        </Box>

        {/* Scale & Opacity */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ScaleIcon fontSize="small" />
              Scale: {settings.scale.toFixed(1)}x
            </Typography>
            <Slider
              value={settings.scale}
              onChange={(_, value) => updateSetting('scale', value)}
              min={0.1}
              max={2}
              step={0.1}
              sx={{ color: '#D97706' }}
            />
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <OpacityIcon fontSize="small" />
              Opacity: {Math.round(settings.opacity * 100)}%
            </Typography>
            <Slider
              value={settings.opacity}
              onChange={(_, value) => updateSetting('opacity', value)}
              min={0.1}
              max={1}
              step={0.1}
              sx={{ color: '#DC2626' }}
            />
          </Box>
        </Box>

        {/* Effects */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <ParticleIcon fontSize="small" />
            Effects
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.animation}
                  onChange={(e) => updateSetting('animation', e.target.checked)}
                  color="primary"
                />
              }
              label="Animation"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.particles}
                  onChange={(e) => updateSetting('particles', e.target.checked)}
                  color="secondary"
                />
              }
              label="Particles"
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="caption">Distortion: {settings.distortion.toFixed(1)}</Typography>
            <Slider
              value={settings.distortion}
              onChange={(_, value) => updateSetting('distortion', value)}
              min={0}
              max={1}
              step={0.1}
              sx={{ color: '#059669' }}
            />
          </Box>
        </Box>

        {/* Preset Actions */}
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Quick Presets
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <IconButton
              onClick={() => setSettings({
                rotation: { x: 15, y: 30, z: 0 },
                scale: 1.2,
                opacity: 0.9,
                animation: true,
                particles: true,
                distortion: 0.3,
                perspective: 800,
              })}
              sx={{ justifyContent: 'flex-start', color: 'white' }}
            >
              <AnimationIcon sx={{ mr: 1 }} />
              <Typography variant="body2">Immersive View</Typography>
            </IconButton>
            <IconButton
              onClick={() => setSettings({
                rotation: { x: 0, y: 0, z: 0 },
                scale: 1,
                opacity: 1,
                animation: false,
                particles: false,
                distortion: 0,
                perspective: 1000,
              })}
              sx={{ justifyContent: 'flex-start', color: 'white' }}
            >
              <HologramIcon sx={{ mr: 1 }} />
              <Typography variant="body2">Technical View</Typography>
            </IconButton>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};