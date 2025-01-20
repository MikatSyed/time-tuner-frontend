import React, { useState } from "react";
import { Box, Slider, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { TimeRuler } from "./time-ruler";

export interface TimeRange {
  id: string;
  start: number;
  end: number;
}

export interface MultiRangeSliderProps {
  ranges: TimeRange[];
  onChange: (newRanges: TimeRange[]) => void;
  onDelete?: (id: string) => void; 
  onAdd?: () => void;
}

const MultiRangeSlider: React.FC<MultiRangeSliderProps> = ({ ranges, onChange }) => {
  const maxRanges = 4;
  const minSpacing = 15; 
  const defaultDuration = 60; 

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
  };

  const handleAddRange = () => {
    const newRanges = [...ranges];
    newRanges.sort((a, b) => a.start - b.start);

    let newStart;
    if (newRanges.length === 0) {
      newStart = 540;
    } else {
      const lastRange = newRanges[newRanges.length - 1].end;
      newStart = Math.min(lastRange + minSpacing, 1440 - defaultDuration);
    }

    const newEnd = newStart + defaultDuration;

    if (
      newRanges.length < maxRanges &&
      !newRanges.some((r) => r.start < newEnd && r.end > newStart)
    ) {
      newRanges.push({
        id: `range-${Date.now()}`,
        start: newStart,
        end: newEnd,
      });
      onChange(newRanges);
    }
  };

  const handleDeleteRange = (id: string) => {
    const newRanges = ranges.filter((range) => range.id !== id);
    onChange(newRanges);
  };

  return (
    <Box>
      <Box className="relative py-2">
        {ranges.map((range) => (
          <Box
            key={range.id}
            sx={{
              position: "absolute",
              left: `${(range.start / 1440) * 100}%`,
              width: `${((range.end - range.start) / 1440) * 100}%`,
              height: "24px",
              marginTop: "24px",
              borderRadius: "4px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            
            <IconButton
              onClick={() => handleDeleteRange(range.id)}
              sx={{
                color: "#36b37e",
                backgroundColor: "#fff",
                width: "24px",
                height: "24px",
                fontSize: "16px",
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          
            <Typography
              sx={{
                position: "absolute",
                top: "-20px",
                fontSize: "12px",
                color: "#36b37e",
              }}
            >
              {formatTime(range.start)} - {formatTime(range.end)}
            </Typography>
          </Box>
        ))}

        <Slider
          value={ranges.flatMap((range) => [range.start, range.end])}
          onChange={(e, newValue) => {
            const flatValues = newValue as number[];
            const updatedRanges = ranges.map((range, index) => ({
              ...range,
              start: flatValues[index * 2],
              end: flatValues[index * 2 + 1],
            }));
            onChange(updatedRanges);
          }}
          valueLabelDisplay="off"
          min={0}
          max={1440}
          step={15}
          sx={{
            height: 8,
            "& .MuiSlider-thumb": {
              backgroundColor: "#111111",
              width: 16,
              height: 16,
              borderRadius: 0,
            },
            "& .MuiSlider-rail": {
              backgroundColor: "#ddd",
            },
            "& .MuiSlider-track": {
              backgroundColor: "#36b37e",
            },
          }}
        />
        <TimeRuler />
      </Box>

    
      {ranges.length < maxRanges && (
        <Box className="flex justify-end mt-[-84px] mr-[40px] pb-16">
          <IconButton
            onClick={handleAddRange}
            sx={{
              backgroundColor: "#36b37e",
              color: "#fff",
              fontSize: "1rem",
              height: "20px",
              width: "20px",
              borderRadius: "50%",
              padding: "0",
              "&:hover": {
                backgroundColor: "#2e9c6e",
              },
            }}
          >
            <AddIcon sx={{ fontSize: "inherit" }} />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default MultiRangeSlider;
