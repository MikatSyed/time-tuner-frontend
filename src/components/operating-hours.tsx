"use client";

import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { TimeRuler } from "./time-ruler";
import MultiRangeSlider, { TimeRange } from "./MultiRangeSlider";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function OperatingHours() {
  const [schedule, setSchedule] = useState<Record<string, TimeRange[]>>({
    Monday: [
      { id: "mon1", start: 240, end: 630 }, 
      { id: "mon2", start: 630, end: 810 }, 
      { id: "mon3", start: 810, end: 990 }  
    ],
    Tuesday: [{ id: "tue1", start: 240, end: 600 }],    
    Wednesday: [{ id: "wed1", start: 240, end: 600 }],  
    Thursday: [{ id: "thu1", start: 360, end: 600 }],   
    Friday: [{ id: "fri1", start: 360, end: 600 }],    
    Saturday: [],
    Sunday: [],
  });

  const handleAddRange = (day: string) => {
    if (schedule[day].length >= 4) return;

    const existingRanges = schedule[day];
    let newStart = 540; 
    let newEnd = 1020;  

    if (existingRanges.length > 0) {
      const lastRange = existingRanges[existingRanges.length - 1];
      newStart = Math.min(lastRange.end + 60, 1380); 
      newEnd = Math.min(newStart + 480, 1440); 
    }

    const newRange: TimeRange = {
      id: `${day.toLowerCase()}-${Date.now()}`,
      start: newStart,
      end: newEnd,
    };

    setSchedule(prev => ({
      ...prev,
      [day]: [...prev[day], newRange].sort((a, b) => a.start - b.start)
    }));
  };

  const handleDeleteRange = (day: string, id: string) => {
    setSchedule(prev => ({
      ...prev,
      [day]: prev[day].filter(range => range.id !== id)
    }));
  };

  const handleRangeChange = (day: string, newRanges: TimeRange[]) => {
    setSchedule(prev => ({
      ...prev,
      [day]: newRanges
    }));
  };

  return (
    <Box className="min-h-screen b p-6">
      <Box className="max-w-5xl mx-auto p-8 rounded-xl border">
        <Typography variant="h5" className="mb-8 text-white font-medium">
          Custom Business Hours
        </Typography>
        
        
        
        {DAYS.map((day) => (
          <Box key={day} className="mb-6">
            <Box className="flex items-center justify-between mb-2">
              <Typography className="text-sm text-gray-300 font-medium">
                {day}
              </Typography>
              {schedule[day].length === 0 && (
                <IconButton
                  size="small"
                  onClick={() => handleAddRange(day)}
                  sx={{ color: '#22c55e' }}
                >
                  <AddCircleOutlineIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
            
            {schedule[day].length === 0 ? (
              <Box className="h-12 flex items-center justify-center border border-dashed border-gray-600 rounded text-gray-400 text-sm">
                I'm offline (hover to add Operating hours)
              </Box>
            ) : (
              <MultiRangeSlider
                ranges={schedule[day]}
                onChange={(newRanges) => handleRangeChange(day, newRanges)}
                onDelete={(id:any) => handleDeleteRange(day, id)}
                onAdd={() => handleAddRange(day)}
              />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

