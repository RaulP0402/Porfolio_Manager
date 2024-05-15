import React from 'react';
import FlexBetween from './FlexBetween';
import { Box, Typography, useTheme } from '@mui/material';

type Props = {
    icon?: React.ReactNode;
    title: string; 
    subtitle?: string;
    sideText?: string;
};

const BoxHeader = ({ icon, title, subtitle, sideText }: Props) => {
    const { palette } = useTheme();

    return (
        <FlexBetween 
        color={palette.grey[400]} 
        margin= "1.0rem 1.0rem 0.0rem 1.0rem"
        height="10%"
        >
            <FlexBetween>
                {icon}
                <Box width="100%" height="100%">
                    <Typography variant='h4' mb="-0.1rem">
                        {title}
                    </Typography>
                    <Typography variant="h6">{ subtitle }</Typography>
                </Box>
            </FlexBetween>
            <Typography variant="h5" fontWeight="700" color={palette.tertiary[500]}>
                {sideText}
            </Typography>
        </FlexBetween>
    )
}

export default BoxHeader;