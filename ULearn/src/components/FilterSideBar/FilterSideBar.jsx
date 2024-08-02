import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { IconButton, Typography } from '@mui/material';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import './FilterSideBar.css';

const FilterSideBar = ({ isOpen, onClose, priceFilter, setPriceFilter, ratingFilter, setRatingFilter }) => {
    const handlePriceChange = (event, newValue) => {
        setPriceFilter(newValue);
    };

    const minDistance = 1;

    const handleRatingChange = (e, ratingRange, activeThumb) => {
        if (activeThumb === 0 && ratingFilter[1] - ratingRange[0] < minDistance) {
            ratingRange = [ratingFilter[1] - 1, ratingFilter[1]];
        } else if (activeThumb === 1 && ratingRange[1] - ratingFilter[0] < minDistance) {
            ratingRange = [ratingFilter[0], ratingFilter[0] + 1];
        }
        setRatingFilter(ratingRange);
    };

    const priceMarks = [
        { value: 0, label: '$0' },
        { value: 10, label: '$10' },
        { value: 20, label: '$20' },
        { value: 30, label: '$30' },
        { value: 40, label: '$40' },
    ];

    const ratingMarks = [
        { value: 0, label: '0' },
        { value: 1, label: '1' },
        { value: 2, label: '2' },
        { value: 3, label: '3' },
        { value: 4, label: '4' },
        { value: 5, label: '5' },
    ];

    return (
        <div className={`filter-sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
                <Typography variant="h6">Filter Options</Typography>
                <IconButton onClick={onClose} className="close-button">
                    <AiOutlineCloseCircle />
                </IconButton>
            </div>
            <hr />
            <Typography className='filter-option-title'>Price</Typography>
            <Box className="filter-option">
                <Slider
                    value={priceFilter}
                    onChange={handlePriceChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={40}
                    defaultValue={40}
                    size='medium'
                    marks={priceMarks}
                />
            </Box>
            <hr />
            <Typography className='filter-option-title'>Rating</Typography>
            <Box className="filter-option">
                <Slider
                    value={ratingFilter}
                    onChange={handleRatingChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={5}
                    marks={ratingMarks}
                    disableSwap
                />
            </Box>
            <hr />
        </div>
    );
};

export default FilterSideBar;
