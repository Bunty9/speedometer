import { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import HistoricalDataGrid, { HistoricalItem } from '../components/HistoricalDataGrid';


const HistoryPage = () => {
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs(Date.now()- 3 * 24 * 60 * 60 * 1000));
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(Date.now()));
  const [history, setHistory] = useState<HistoricalItem[]>([]);

  const handleFetchData = async () => {
    const response = await fetch(`http://localhost:5000/api/speed/getvalues?startDate=${startDate}&endDate=${endDate}`);
    const data = await response.json();
    setHistory(data);
  };

  return (
    <div className="centered-container">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box p={3}>
          <Typography variant="h4" gutterBottom>History Page</Typography>
          <Box display="flex" gap={2} mb={3}>

            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
            />
            <Button variant="contained" color="primary" onClick={handleFetchData}>
              Fetch Data
            </Button>
          </Box>

          {history.length > 0 ? (
            <Box>
              <Typography variant="h6">Historical Data</Typography>
              <HistoricalDataGrid history={history} />
            </Box>
          ) : (
            <Typography>No data available for the selected date range.</Typography>
          )}
        </Box>
      </LocalizationProvider>
    </div>
  );
};

export default HistoryPage;
