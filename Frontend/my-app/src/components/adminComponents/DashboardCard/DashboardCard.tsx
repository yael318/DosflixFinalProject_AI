
import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PeopleIcon from '@mui/icons-material/People';

const stats = [
  { title: 'New Orders', value: 150, color: '#F59C8A', icon: <ShoppingCartIcon fontSize="large" /> },
  { title: 'Bounce Rate', value: '53%', color: '#EE476F', icon: <BarChartIcon fontSize="large" /> },
  { title: 'User Registrations', value: 44, color: '#118AB2', icon: <PersonAddIcon fontSize="large" /> },
  { title: 'Unique Visitors', value: 65, color: '#2FD396', icon: <PeopleIcon fontSize="large" /> },
];

const DashboardCard = () => {
  return (
    <Grid container spacing={2}>
      {stats.map((stat, i) => (
        <Grid item xs={12} md={3} key={i}>
          <Paper style={{ backgroundColor: stat.color, color: 'white', padding: 16 }}>
            <Box display="flex" alignItems="center" gap={2}>
              {stat.icon}
              <Box>
                <Typography variant="h6">{stat.value}</Typography>
                <Typography variant="subtitle1">{stat.title}</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardCard;
