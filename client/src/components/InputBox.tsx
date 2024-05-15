import { useState } from 'react';
import FlexBetween from './FlexBetween';
import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import { useAddTransactionMutation } from '@/state/api';
import { useGetSharesQuery } from '@/state/api';
import { GetSharesResponse } from '@/state/types';


type Props = {
    title: string;
}


function findObjectId(array: GetSharesResponse[] | undefined, ticker: string | unknown): string {
    if (array == undefined) {
        return "";
    }
    for (let i = 0; i < array.length; i++) {
        if (array[i].ticker == ticker) {
            return array[i]._id;
        }
    }
    return "";
}

const InputBox = ({title}: Props) => {
    const { data: sharesData } = useGetSharesQuery();
    const { palette } = useTheme();
    const [ticker, setTicker] = useState("");
    const [amount, setAmount] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [buyer, setBuyer] = useState("");
    const [updateTransaction] = useAddTransactionMutation();


    type data = {
        ticker: string;
        amount: number;
        quantity: number;
        buyer: string;
    }

    const transaction = {
        ticker: ticker,
        amount: amount,
        quantity: quantity,
        buyer: buyer,
    }

    const handleSubmit = ({ticker, amount, quantity, buyer }: data) => {
        const id = findObjectId(sharesData, ticker);
        updateTransaction({ticker, amount, quantity, buyer, id});
        setTicker(""); setAmount(0); setQuantity(0); setBuyer("");
    }

    return (
        <FlexBetween
        color={palette.grey[400]}
        margin="1.3rem 1rem 1.3rem 1rem"
        display="flex"
        flexDirection="row"
        >
            <Box >
                <Typography variant='h4'>
                    {title}
                </Typography>
            </Box>
            <FlexBetween 
                color={palette.grey[400]}
                margin="1.3rem 1rem 1.3rem 1rem"
                display="flex"
                flexDirection="row"
            >
            <Box
                height="100%"
                width="100%"
                sx={{
                    "& .MuiOutlinedInput-root": {
                        '& fieldset': {
                            borderColor: `${palette.grey[400]}`
                        },
                        color: `${palette.grey[400]}`
                    },
                    '& label.Mui-focused': {
                        color: `${palette.grey[400]}`,
                    },
                    '& .MuiInput-underline:after': {
                        borderBottomColor: `${palette.grey[400]}`,
                    },
                    '&:hover fieldset': {
                        borderColor: `${palette.grey[400]}`,
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: `${palette.grey[400]}`,
                    },
                    '& .MuiInputLabel-root': {
                        color: `${palette.grey[400]}`
                    },
                }}
            >
                <TextField 
                    size="small" 
                    id="ticker" 
                    label="Ticker" 
                    onChange={(e) => setTicker(e.target.value.toUpperCase())}
                />
                <TextField 
                    size="small" 
                    id="amount" 
                    label="Amount" 
                    variant="outlined" 
                    onChange={(e) => setAmount(parseInt(e.target.value))}
                />
                <TextField 
                    size="small" 
                    id="quantity" 
                    label="Quantity" 
                    variant="outlined" 
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
                <TextField 
                    size="small" 
                    id="buyer" 
                    label="Buyer" 
                    variant="outlined" 
                    onChange={(e) => setBuyer(e.target.value)}
                />
            </Box>
            <Box
                ml="1.5rem"
            >
                <Button 
                    variant="contained"
                    onClick={() => {
                        handleSubmit(transaction);
                    }}
                >
                    Insert
                </Button>
            </Box>
            </FlexBetween>
        </FlexBetween>
    )
}

export default InputBox;