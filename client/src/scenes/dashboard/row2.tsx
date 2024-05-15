import DashboardBox from '@/components/DashboardBox';
import { useGetKpisQuery, useGetSharesQuery, useGetTransactionsQuery } from '@/state/api';
import { Box, useTheme } from '@mui/material';
import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useMemo } from 'react';
import BoxHeader from '@/components/BoxHeader';
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import { GetSharesResponse } from '@/state/types';
import InputBox from '@/components/InputBox';


function findObjectId(array: GetSharesResponse[] | undefined, id: string | unknown): GetSharesResponse | undefined {
    if (array == undefined) {
        return undefined;
    }
    for (let i = 0; i < array.length; i++) {
        if (array[i]._id == id) {
            return array[i];
        }
    }
}

const Row2 = () => {
    const { palette } = useTheme();
    const { data: sharesData } = useGetSharesQuery();
    const { data: KpiData } = useGetKpisQuery();
    const { data: transactionsData } = useGetTransactionsQuery();    
    
    console.log("Transactions ", transactionsData);

    const pieData = useMemo(() => {
        return (
            KpiData &&
            KpiData[0].holdings.map(( {ticker, quantity, avgPurchasePrice }) => {
                return {
                    name: ticker,
                    value: parseFloat(((quantity * avgPurchasePrice) / (KpiData[0].capitol )).toFixed(4))
                }
            })
        );
    }, [KpiData]);

    const holdings = useMemo(() => {
        return (
            KpiData &&
            KpiData[0].holdings
        )
    }, [KpiData]);

    const transactions = useMemo(() => {
        return (
            transactionsData &&
            transactionsData.map(({ _id, amount, buyer, shareIds }) => {
                return {
                    id: _id,
                    _id: _id, 
                    amount: amount,
                    buyer: buyer,
                    shareIds: shareIds
                }
            })
        )
    }, [transactionsData]);

    const holdingColumns = [
        {
            field: "ticker",
            header: "Ticker",
            flex: 1,
        },
        {
            field: "quantity",
            header: "Quantity",
            flex: 0.5,
            renderCell: (params: GridCellParams) => `${params.value}`,
        },
        {
            field: "avgPurchasePrice",
            header: "Average Purchase Price",
            flex: 1,
            renderCell: (params: GridCellParams) => `$${params.value}`,
        }
    ];

    const transactionColumns = [
        {
            field: "shareIds",
            header: "Ticker",
            flex: .5,
            renderCell: (params: GridCellParams) => findObjectId(sharesData, params.value)?.ticker,
        },
        {
            field: "amount",
            header: "Amount",
            flex: .5,
            renderCell: (params: GridCellParams) => `$${params.value}`,
        },
        {
            field: "buyer",
            header: "Buyer",
            flex: 1,
        }
    ];

    return (
        <>
            <DashboardBox  gridArea="d">
                <BoxHeader 
                    title="Breakdown of Portfolio Allocation"
                    subtitle="This breakdown is out of 1 whole unit"
                />
                <ResponsiveContainer width="100%" height="85%">
                    <PieChart width={400} height={400}>
                    <Pie
                        dataKey="value"
                        isAnimationActive={true}
                        data={pieData}
                        outerRadius={80}
                        fill={palette.secondary.main}
                        label
                    />
                    <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </DashboardBox> 
            <DashboardBox  gridArea="g">
                <BoxHeader 
                    title= "List of Holdings"
                    sideText={`${sharesData?.length} different holdings`}
                />
                <Box
                    mt="0.5rem"
                    p="0 0.5rem"
                    height="75%"
                    sx={{
                        "& .MuiDataGrid-root": {
                            color: palette.grey[300],
                            border: "none"
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: `1px solid ${palette.grey[800]} !important`,
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            borderBottom: `1px solid ${palette.grey[800]} !important`,
                        },
                        "& .MuiDataGrid-columnSeparator": {
                            visibility: "hidden",
                        }
                    }}
                >
                    <DataGrid 
                        columnHeaderHeight={25}
                        rowHeight={35}
                        hideFooter={true}
                        rows={holdings|| []}
                        columns={holdingColumns}
                    />
                </Box>
            </DashboardBox> 
            <DashboardBox  gridArea="f">
                <BoxHeader 
                        title= "List of Transactions"
                        sideText={`${transactions?.length} different transactions`}
                    />
                <Box
                    mt="0.5rem"
                    p="0 0.5rem"
                    height="75%"
                    sx={{
                        "& .MuiDataGrid-root": {
                            color: palette.grey[300],
                            border: "none"
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: `1px solid ${palette.grey[800]} !important`,
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            borderBottom: `1px solid ${palette.grey[800]} !important`,
                        },
                        "& .MuiDataGrid-columnSeparator": {
                            visibility: "hidden",
                        }
                    }}
                >
                    <DataGrid 
                        columnHeaderHeight={25}
                        rowHeight={35}
                        hideFooter={true}
                        rows={transactions || []}
                        columns={transactionColumns}
                    />
                </Box>
            </DashboardBox>
            <DashboardBox  gridArea="e" display="flex">
                <InputBox
                    title='Insert a New Position'
                />
            </DashboardBox>
        </>
    );
};

export default Row2;