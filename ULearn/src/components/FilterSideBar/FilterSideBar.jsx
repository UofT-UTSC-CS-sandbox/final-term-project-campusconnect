import React from 'react';
import { IconButton, Typography, Slider, Box } from '@mui/material';
import { AiOutlineCloseCircle } from 'react-icons/ai'; // Importing an alternative icon
import './FilterSideBar.css';

const FilterSideBar = ({ isOpen, onClose, priceRange, setPriceRange, rating, setRating }) => {
    const handlePriceChange = (event, newValue) => {
        setPriceRange(newValue);
    };

    const handleRatingChange = (event, newValue) => {
        setRating(newValue);
    };
    const marks = [
        {
          value: 0,
          label: '0',
        },
        {
          value: 1,
          label: '1',
        },
        {
            value: 2,
            label: '2',
        },
        {
            value: 3,
            label: '3',
        },
        {
            value: 4,
            label: '4',
        },
        {
            value: 5,
            label: '5',
        },
      ];

    return (
        <div className={`filter-sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
                <Typography variant="h6">
                    Filter Options
                </Typography>
                <IconButton onClick={onClose} className="close-button">
                    <AiOutlineCloseCircle /> {/* Using an alternative icon */}
                </IconButton>
            </div>
            <hr/>
            <Typography className='filter-option-title'>Price Range</Typography>
            <Box className="filter-option">
                <Slider
                    value={priceRange}
                    onChange={handlePriceChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={40}
                    defaultValue={40}
                    size={'medium'}
                />
            </Box>
            <hr/>
            <Typography className='filter-option-title'>Rating</Typography>
            <Box className="filter-option">
                <Slider
                    value={rating}
                    onChange={handleRatingChange}
                    valueLabelDisplay="auto"
                    min={1}
                    max={5}
                    step={1}
                    size={'medium'}
                    marks={marks}
                />
            </Box>
            <hr/>
        </div>
    );
};

export default FilterSideBar;
