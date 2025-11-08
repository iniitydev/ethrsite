import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  FormControlLabel,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Security as SecurityIcon,
  Group as GroupIcon,
  Person as PersonIcon,
  VpnKey as VpnKeyIcon,
} from '@mui/icons-material';
import { Routes, Route, useNavigate } from 'react-router-dom';

// Mock data - replace with API calls
const mockUsers = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@company.com',
    role: 'Admin',
    status: 'Active',
    mfaEnabled: true,
    lastLogin: '2025-11-08T10:30:00Z',
    groups: ['Admins', 'Engineering'],
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@company.com',
    role: 'User',
    status: 'Active',
    mfaEnabled: false,
    lastLogin: '2025-11-07T15:45:00Z',
    groups: ['Marketing'],
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol@company.com',
    role: 'User',
    status: 'Pending',
    mfaEnabled: false,
    lastLogin: null,
    groups: [],
  },
];

const mockGroups = [
  { id: '1', name: 'Admins', members: 3, description: 'System administrators' },
  { id: '2', name: 'Engineering', members: 12, description: 'Development team' },
  { id: '3', name: 'Marketing', members: 8, description: 'Marketing team' },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => (
  <div role="tabpanel" hidden={value !== index}>
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
);

export const IdentityHub: React.FC = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleInviteUser = () => {
    setInviteDialogOpen(true);
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>, user: any) => {
    setSelectedUser(user);
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
    setSelectedUser(null);
  };

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
            Identity & Access
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage users, roles, and authentication policies
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleInviteUser}
          sx={{ borderRadius: 2 }}
        >
          Invite User
        </Button>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab icon={<PersonIcon />} label="Users" />
          <Tab icon={<GroupIcon />} label="Groups" />
          <Tab icon={<SecurityIcon />} label="Policies" />
          <Tab icon={<VpnKeyIcon />} label="Applications" />
        </Tabs>
      </Box>

      {/* Users Tab */}
      <TabPanel value={tabValue} index={0}>
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ maxWidth: 400 }}
          />
        </Box>

        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>MFA</TableCell>
                <TableCell>Last Login</TableCell>
                <TableCell>Groups</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ width: 32, height: 32 }}>
                        {user.name.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {user.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {user.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.role}
                      size="small"
                      color={user.role === 'Admin' ? 'primary' : 'default'}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.status}
                      size="small"
                      color={
                        user.status === 'Active' ? 'success' :
                        user.status === 'Pending' ? 'warning' : 'error'
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={user.mfaEnabled}
                      size="small"
                      disabled
                    />
                  </TableCell>
                  <TableCell>
                    {user.lastLogin ? (
                      <Typography variant="caption">
                        {new Date(user.lastLogin).toLocaleDateString()}
                      </Typography>
                    ) : (
                      <Typography variant="caption" color="text.secondary">
                        Never
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {user.groups.slice(0, 2).map((group) => (
                        <Chip key={group} label={group} size="small" variant="outlined" />
                      ))}
                      {user.groups.length > 2 && (
                        <Chip label={`+${user.groups.length - 2}`} size="small" variant="outlined" />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={(e) => handleUserMenuOpen(e, user)}>
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      {/* Groups Tab */}
      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          {mockGroups.map((group) => (
            <Grid item xs={12} sm={6} md={4} key={group.id}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">{group.name}</Typography>
                    <IconButton size="small">
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {group.description}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <GroupIcon fontSize="small" color="action" />
                    <Typography variant="caption">
                      {group.members} members
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Policies Tab */}
      <TabPanel value={tabValue} index={2}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Authentication Policies
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Password Policy
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Require strong passwords"
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Password expiration (90 days)"
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Prevent password reuse"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  MFA Policy
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Require MFA for all users"
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Allow TOTP authenticator apps"
                  />
                  <FormControlLabel
                    control={<Switch />}
                    label="Allow hardware security keys"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Applications Tab */}
      <TabPanel value={tabValue} index={3}>
        <Box sx={{ mb: 3 }}>
          <Button variant="contained" startIcon={<AddIcon />}>
            Register Application
          </Button>
        </Box>
        <Typography variant="body2" color="text.secondary">
          OAuth 2.0 and SAML applications will be displayed here.
        </Typography>
      </TabPanel>

      {/* User Menu */}
      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={handleUserMenuClose}
      >
        <MenuItem onClick={handleUserMenuClose}>
          <EditIcon sx={{ mr: 1 }} />
          Edit User
        </MenuItem>
        <MenuItem onClick={handleUserMenuClose}>
          <SecurityIcon sx={{ mr: 1 }} />
          Reset MFA
        </MenuItem>
        <MenuItem onClick={handleUserMenuClose}>
          <DeleteIcon sx={{ mr: 1 }} />
          Deactivate User
        </MenuItem>
      </Menu>

      {/* Invite User Dialog */}
      <Dialog open={inviteDialogOpen} onClose={() => setInviteDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Invite New User</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              placeholder="user@company.com"
            />
            <TextField
              fullWidth
              label="Full Name"
              placeholder="John Doe"
            />
            <TextField
              select
              fullWidth
              label="Role"
              defaultValue="User"
            >
              <MenuItem value="User">User</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setInviteDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setInviteDialogOpen(false)}>
            Send Invitation
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};