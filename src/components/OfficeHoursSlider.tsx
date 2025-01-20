"use client";

import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import MultiRangeSlider, { TimeRange } from "./MultiRangeSlider";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function OfficeHoursSlider() {
  const [schedule, setSchedule] = useState<Record<string, TimeRange[]>>({
    Monday: [{ id: "mon1", start: 540, end: 1020 }],
    Tuesday: [{ id: "tue1", start: 540, end: 1020 }],
    Wednesday: [{ id: "wed1", start: 540, end: 1020 }],
    Thursday: [{ id: "thu1", start: 540, end: 1020 }],
    Friday: [{ id: "fri1", start: 540, end: 1020 }],
    Saturday: [],
    Sunday: [],
  });

  const handleScheduleChange = (day: string, newRanges: TimeRange[]) => {
    setSchedule((prev) => ({ ...prev, [day]: newRanges }));
  };

  const handleSave = () => {
    console.log("Saved Schedule:", schedule);
   
  };

  return (
    <Box className="w-full p-6 bg-white rounded shadow">
      <Typography variant="h4" className="mb-6 text-center">
        Office Hours
      </Typography>
      {DAYS.map((day) => (
        <Box key={day} className="mb-8">
          <Typography variant="h6" className="mb-2">{day}</Typography>
          <MultiRangeSlider
            ranges={schedule[day]}
            onChange={(newRanges:any) => handleScheduleChange(day, newRanges)}
          />
        </Box>
      ))}
      <Button  className="w-full" onClick={handleSave}>
        Save Changes
      </Button>
    </Box>
  );
}

