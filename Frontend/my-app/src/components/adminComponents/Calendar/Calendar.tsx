
import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Divider,
  IconButton,
  Box
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  CalendarMonth,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import dayjs, { Dayjs } from 'dayjs';

const CalendarContainer = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: theme.spacing(0.5),
  marginTop: theme.spacing(1),
  textAlign: 'center',
  height: 200,
  overflowY: 'auto',
}));

const DayBox = styled('div', {
  shouldForwardProp: (prop) => prop !== 'isToday',
})<{ isToday: boolean }>(({ theme, isToday }) => ({
  height: 28,
  lineHeight: '28px',
  borderRadius: 4,
  fontSize: '0.75rem',
  backgroundColor: isToday ? theme.palette.primary.main : '#f0f0f0',
  color: isToday ? '#fff' : '#000',
}));

const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const Calendar = () => {
  const today = dayjs();
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());

  const startOfMonth = currentDate.startOf('month');
  const daysInMonth = currentDate.daysInMonth();
  const firstDayIndex = startOfMonth.day();

  const daysArray = [];

  for (let i = 0; i < firstDayIndex; i++) {
    daysArray.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push(i);
  }

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, 'month'));
  };

  return (
    <Box  >
      <CardHeader
        avatar={<CalendarMonth color="primary" />}
        title={
          <Typography variant="subtitle1">
            {currentDate.format('MMMM YYYY')}
          </Typography>
        }
        action={
          <>
            <IconButton onClick={handlePrevMonth}>
              <ChevronLeft />
            </IconButton>
            <IconButton onClick={handleNextMonth}>
              <ChevronRight />
            </IconButton>
          </>
        }
        sx={{ py: 1 }}
      />
      <Divider />
      <CardContent sx={{ p: 1, flex: 1 }}>
        <CalendarContainer>
          {daysOfWeek.map((day) => (
            <Typography
              key={day}
              variant="caption"
              sx={{ fontWeight: 'bold', fontSize: '0.7rem' }}
            >
              {day}
            </Typography>
          ))}
          {daysArray.map((day, idx) => (
            <DayBox
              key={idx}
              isToday={day === today.date() && currentDate.isSame(today, 'month')}
            >
              {day || ''}
            </DayBox>
          ))}
        </CalendarContainer>
      </CardContent>
      </Box>
  );
};

export default Calendar;
