import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Typography } from '@mui/material';

export interface HistoricalItem {
  createdAt: string;  // This could be a date string or a Date object
  value: number;
}

interface HistoricalDataGridProps {
  history: HistoricalItem[];
}

interface RowData {
  createdAt: string;
  value: number;
}

const gridStyle = {
          boxShadow: 2,
          border: 2,
          borderColor: 'white',
          color: 'white',
          '& .MuiDataGrid-cell:hover': {
            color: '#1976d2',
          },
          '& .MuiDataGrid-columnHeaderTitleContainerContent': {
            color: 'black',
          },
          '& .MuiToolbar-root': {
            color: 'white',
          },
        }

const HistoricalDataGrid: React.FC<HistoricalDataGridProps> = ({ history }) => {
  // Define the columns for the DataGrid
  const columns: GridColDef[] = [
    { field: 'createdAt', headerName: 'Timestamp', width: 250 },
    { field: 'value', headerName: 'Speed Value', width: 250 },
  ];

  // Map the historical data to the format expected by DataGrid
  const rows: RowData[] = history.map((item, index) => ({
    id: index + 1,
    createdAt: new Date(item.createdAt).toLocaleString(),
    value: item.value,
  }));

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      {history.length > 0 ? (
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 50,
              },
            },
          }}
          sx={gridStyle}
        />
      ) : (
        <Typography>No data available for the selected date range.</Typography>
      )}
    </Box>
  );
};

export default HistoricalDataGrid;
