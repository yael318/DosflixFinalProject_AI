import React from 'react';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Box } from '@mui/material';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title
);

const SalesChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Sales',
        data: [30, 50, 40, 20, 80, 50, 60],
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: '#36a2eb',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#36a2eb',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // חשוב מאוד
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '', // ריק כי הכותרת תגיע מבחוץ
      },
    },
  };

  return (
    <Box sx={{ height: '100%' }}>
      <Line data={data} options={options} />
    </Box>
  );
};

export default SalesChart;
