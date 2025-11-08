import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  LinearProgress,
  IconButton,
  Button,
  Alert,
  AlertTitle,
} from '@mui/material';
import {
  People as PeopleIcon,
  Router as RouterIcon,
  Folder as FolderIcon,
  Security as SecurityIcon,
  TrendingUp as TrendingUpIcon,
  Warning as WarningIcon,
  Add as AddIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    label: string;
  };
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  color = 'primary'
}) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar sx={{ bgcolor: `${color}.main`, width: 40, height: 40 }}>
            {icon}
          </Avatar>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: `${color}.main` }}>
              {value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
          </Box>
        </Box>
        {trend && (
          <Chip
            icon={<TrendingUpIcon />}
            label={`${trend.value > 0 ? '+' : ''}${trend.value}% ${trend.label}`}
            size="small"
            color={trend.value > 0 ? 'success' : 'error'}
          />
        )}
      </Box>
      {subtitle && (
        <Typography variant="caption" color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </CardContent>
  </Card>
);

interface ActionItemProps {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  actionLabel: string;
  onAction: () => void;
}

const ActionItem: React.FC<ActionItemProps> = ({
  title,
  description,
  priority,
  actionLabel,
  onAction
}) => {
  const getPriorityColor = () => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'info';
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      p: 2,
      border: 1,
      borderColor: 'divider',
      borderRadius: 2,
      mb: 1,
      backgroundColor: 'background.paper'
    }}>
      <Box sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          <Typography variant="subtitle2">{title}</Typography>
          <Chip
            label={priority.toUpperCase()}
            size="small"
            color={getPriorityColor()}
            variant="outlined"
          />
        </Box>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Box>
      <Button
        variant="outlined"
        size="small"
        onClick={onAction}
        sx={{ ml: 2 }}
      >
        {actionLabel}
      </Button>
    </Box>
  );
};

export const MissionControl: React.FC = () => {
  // Mock data - in real app, this would come from API
  const metrics = [
    {
      title: 'Active Users',
      value: 145,
      subtitle: '12 new this week',
      icon: <PeopleIcon />,
      trend: { value: 8.2, label: 'vs last week' },
      color: 'primary' as const,
    },
    {
      title: 'Connected Devices',
      value: 23,
      subtitle: '98% trusted',
      icon: <RouterIcon />,
      trend: { value: 15.3, label: 'vs last week' },
      color: 'secondary' as const,
    },
    {
      title: 'Storage Used',
      value: '8.2 TB',
      subtitle: 'of 10 TB total',
      icon: <FolderIcon />,
      color: 'success' as const,
    },
  ];

  const actionItems = [
    {
      title: 'Approve guest access for "External Auditor"',
      description: 'Sarah requested temporary access to Q4 financial documents',
      priority: 'high' as const,
      actionLabel: 'Review',
      onAction: () => console.log('Review access request'),
    },
    {
      title: 'Unusual login attempt for user "cnorton"',
      description: 'Multiple failed attempts from new location detected',
      priority: 'high' as const,
      actionLabel: 'Investigate',
      onAction: () => console.log('Investigate login'),
    },
    {
      title: 'Storage quota at 87% for Research team',
      description: 'Consider archiving old files or increasing quota',
      priority: 'medium' as const,
      actionLabel: 'Manage',
      onAction: () => console.log('Manage storage'),
    },
  ];

  const recentActivity = [
    { time: '2 hours ago', action: 'Admin Alice enabled MFA for group "Finance"' },
    { time: '4 hours ago', action: 'Device "MacBook-Pro" joined network' },
    { time: '1 day ago', action: 'File "Q4_Budget.xlsx" accessed by 12 users' },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
          Welcome back, Alex
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's what's happening across your digital workspace today.
        </Typography>
      </Box>

      {/* Critical Alerts */}
      <Box sx={{ mb: 4 }}>
        <Alert severity="warning" sx={{ mb: 2 }}>
          <AlertTitle>Security Alert</AlertTitle>
          Multiple failed login attempts detected for user "cnorton". Account temporarily locked.
        </Alert>
        <Alert severity="info">
          <AlertTitle>Storage Notice</AlertTitle>
          Research team storage usage at 87%. Consider archiving old files.
        </Alert>
      </Box>

      {/* Metrics Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {metrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <MetricCard {...metric} />
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">Pending Actions</Typography>
          <Button startIcon={<AddIcon />} variant="outlined" size="small">
            Create Task
          </Button>
        </Box>
        {actionItems.map((item, index) => (
          <ActionItem key={index} {...item} />
        ))}
      </Box>

      {/* System Health & Recent Activity */}
      <Grid container spacing={3}>
        {/* System Health */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>
                System Health
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <SecurityIcon color="success" />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2">Identity</Typography>
                    <Typography variant="caption" color="text.secondary">
                      All systems secure, MFA enabled for 98% of users
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <RouterIcon color="success" />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2">Network</Typography>
                    <Typography variant="caption" color="text.secondary">
                      All peers connected, latency avg: 24ms
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <FolderIcon color="warning" />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2">Storage</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Usage at 82%, consider cleanup
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={82}
                    sx={{ width: 60, height: 4 }}
                    color="warning"
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Recent Activity
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {recentActivity.map((activity, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: 'primary.main',
                        mt: 1,
                        flexShrink: 0,
                      }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2">{activity.action}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {activity.time}
                      </Typography>
                    </Box>
                    <IconButton size="small">
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Box>
              <Button variant="text" sx={{ mt: 2 }}>
                View All Activity
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};