import { useEffect, useState } from 'react';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { Box, CircularProgress, Typography } from '@mui/material';

const Homepage = () => {
  const [speed, setSpeed] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:5000/speedometer');

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const speedValue = parseFloat(data.speed);
        console.log(data);
        setSpeed(speedValue);
        setLoading(false);
      } catch (error) {
        console.error("Error parsing the data:", error);
        setLoading(false);
      }
    };

    socket.onopen = () => {
      console.log('Connected to WebSocket');
    };

    socket.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket closed');
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      <Typography variant="h4">Welcome to the Home Page</Typography>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        width="100%"
        textAlign='center'
      >

        {loading ? (
          <CircularProgress />
        ) : (
          <Box >
            <Gauge
              width={300} height={300}
              value={speed}
              startAngle={-110}
              endAngle={110}
              innerRadius="80%"
              outerRadius="100%"
              sx={{
                [`& .${gaugeClasses.valueText}`]: {
                  fontSize: 30,
                  transform: 'translate(0px, 0px)',
                },
              }}
            />
            <Typography variant="h5">Realtime Speed</Typography>
          </Box>
        )}
      </Box>

    </div>
  );
};

export default Homepage;
