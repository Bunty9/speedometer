import { useEffect, useState } from 'react';
import {
  GaugeContainer,
  GaugeValueArc,
  GaugeReferenceArc,
  useGaugeState,
} from '@mui/x-charts/Gauge';
import { Box, CircularProgress, Typography } from '@mui/material';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function GaugePointer() {
  const { valueAngle, outerRadius, cx, cy } = useGaugeState();

  if (valueAngle === null) {
    // No value to display
    return null;
  }

  const target = {
    x: cx + outerRadius * Math.sin(valueAngle),
    y: cy - outerRadius * Math.cos(valueAngle),
  };
  return (
    <g>
      <circle cx={cx} cy={cy} r={5} fill="red" />
      <path
        d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
        stroke="red"
        strokeWidth={3}
      />
    </g>
  );
}

const Homepage = () => {
  const [speed, setSpeed] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // console.log("backend host url in frontend env",BACKEND_URL)
    const socket = new WebSocket(`ws://${BACKEND_URL}/speedometer`);

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const speedValue = parseFloat(data.speed);
        // console.log(data);
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
            <GaugeContainer
              width={300} height={300}
              value={speed}
              startAngle={-110}
              endAngle={110}
              innerRadius="80%"
              outerRadius="100%"
            >
              <GaugeReferenceArc />
              <GaugeValueArc />
              <GaugePointer />
            </GaugeContainer>
            <Typography variant="h5">{speed}</Typography>
            <Typography variant="h5">Realtime Speed</Typography>
          </Box>
        )}
      </Box>

    </div>
  );
};

export default Homepage;
