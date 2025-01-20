"use client";

import { Box } from "@mui/material";

export function TimeRuler() {
  return (
    <Box className="relative h-6 mb-4 ">
     
      {Array.from({ length: 13 }).map((_, i) => {
        const hour = i * 2;
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour === 0 ? '12' : hour > 12 ? (hour - 12).toString() : hour.toString();
        
        return (
          <Box
            key={i}
            className="absolute text-xs text-gray-400"
            sx={{
              left: `${(i * 2 / 24) * 100}%`,
              transform: 'translateX(-50%)',
              top: 0,
            }}
          >
            {`${displayHour} ${ampm}`}
          </Box>
        );
      })}
    </Box>
  );
}

