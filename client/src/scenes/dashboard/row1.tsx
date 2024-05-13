import BoxHeader from '@/components/BoxHeader';
import DashboardBox from '@/components/DashboardBox';
import { useGetKpisQuery } from '@/state/api';
import { useTheme } from '@mui/material';
import { useMemo } from 'react';
import { 
    ResponsiveContainer, 
    AreaChart,  
    XAxis, 
    YAxis, 
    Tooltip, 
    Area 
} from 'recharts';


const Row1 = () => {
    const { palette } = useTheme();
    const { data } = useGetKpisQuery();

    const WeeklyData = useMemo(() => {
        return (
            data &&
            data[0].weeklyData.map(({ date, profit, loss }) => {
                return {
                    name: date, 
                    profit: profit,
                    loss: loss,
                    pnl: (data[0].capitol + ((profit - loss))) - data[0].capitol,
                }
            })
        )
    }, [data]);

    const MonthlyData = useMemo(() => {
        return (
            data &&
            data[0].monthlyData.map(({month, profit, loss, capitolAllocated}) => {
                return {
                    name: month.substring(0, 3),
                    pnl: (data[0].capitol + ((profit - loss) / 100)) - data[0].capitol,
                    capitolAllocated: capitolAllocated / 100
                }
            })
        )
    }, [data]);

    const CalculateMonthPnl = useMemo(() => {
        if (!data || data.length == 0) {
            return 0;
        }
        
        return (data[0].capitol + ((data[0].monthlyData[data[0].monthlyData.length - 1].profit - data[0].monthlyData[data[0].monthlyData.length - 1].loss) / 100)) - data[0].capitol ;
    }, [data]);

    const CalculateWeekPnl = useMemo(() => {
        if (!data || data.length == 0) {
            return 0;
        }
        
        return (data[0].capitol + ((data[0].weeklyData[data[0].weeklyData.length - 1].profit - data[0].weeklyData[data[0].weeklyData.length - 1].loss))) - data[0].capitol ;
    }, [data]);

    const calculateMonthCapitolAllocation = useMemo(() => {
        if (!data || data.length == 0) {
            return 0;
        }

        return (
            (data[0].monthlyData[data[0].monthlyData.length - 1].capitolAllocated / data[0].capitol)
        )

    }, [data]);

    return (
        <>
            <DashboardBox gridArea="a">
                <BoxHeader 
                    title="Monthly Profit/Loss"
                    subtitle="This represents the Monthly PnL of our portfolio"
                    sideText={`PnL: $${CalculateMonthPnl}`}
                />
                <ResponsiveContainer width="100%" height="85%">
                    <AreaChart
                    width={500}
                    height={400}
                    data={MonthlyData}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                    >
                    <defs>
                        <linearGradient id="colorPnL" x1="0" y1="0" x2="0" y2="1">
                            <stop 
                                offset="5%" 
                                stopColor={ palette.primary[300] }  
                                stopOpacity={0.5} 
                            />
                            <stop 
                                offset="95%" 
                                stopColor={ palette.primary[300] }  
                                stopOpacity={0.0} 
                            />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" style={ { fontSize: "11px"}}/>
                    <YAxis axisLine={ {strokeWidth: "0"} }style={ { fontSize: "11px"}}/>
                    <Tooltip />
                    <Area
                        type="monotone" 
                        dataKey="pnl"
                        dot={ true }
                        stroke={palette.primary.main} 
                        fillOpacity={1} 
                        fill="url(#colorPnL)" 
                    />
                    </AreaChart>
                </ResponsiveContainer>    
            </DashboardBox> 
            <DashboardBox  gridArea="b">
                <BoxHeader 
                        title="Weekly Profit/Loss"
                        subtitle="This represents the weekly PnL of our portfolio"
                        sideText={`PnL: $${CalculateWeekPnl}`}
                    />
                <ResponsiveContainer width="100%" height="85%">
                    <AreaChart
                    width={500}
                    height={400}
                    data={WeeklyData}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                    >
                    <defs>
                        <linearGradient id="colorPnL" x1="0" y1="0" x2="0" y2="1">
                            <stop 
                                offset="5%" 
                                stopColor={ palette.primary[300] }  
                                stopOpacity={0.5} 
                            />
                            <stop 
                                offset="95%" 
                                stopColor={ palette.primary[300] }  
                                stopOpacity={0.0} 
                            />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" style={ { fontSize: "11px"}}/>
                    <YAxis axisLine={ {strokeWidth: "0"} }style={ { fontSize: "11px"}}/>
                    <Tooltip />
                    <Area
                        type="monotone" 
                        dataKey="pnl"
                        dot={ true }
                        stroke={palette.primary.main} 
                        fillOpacity={1} 
                        fill="url(#colorPnL)" 
                    />
                    </AreaChart>
                </ResponsiveContainer> 
            </DashboardBox>
            <DashboardBox  gridArea="c">
                <BoxHeader 
                        title="Capitol Allocated"
                        subtitle="This represents total Capitol Allocated from Portfolio"
                        sideText={`%${calculateMonthCapitolAllocation}`}
                    />
                    <ResponsiveContainer width="100%" height="85%">
                        <AreaChart
                        width={500}
                        height={400}
                        data={MonthlyData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                        >
                        <defs>
                            <linearGradient id="colorCapitolAllocated" x1="0" y1="0" x2="0" y2="1">
                                <stop 
                                    offset="5%" 
                                    stopColor={ palette.secondary[300] }  
                                    stopOpacity={0.5} 
                                />
                                <stop 
                                    offset="95%" 
                                    stopColor={ palette.secondary[300] }  
                                    stopOpacity={0.0} 
                                />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" style={ { fontSize: "11px"}}/>
                        <YAxis axisLine={ {strokeWidth: "0"} }style={ { fontSize: "11px"}}/>
                        <Tooltip />
                        <Area
                            type="monotone" 
                            dataKey="capitolAllocated"
                            dot={ true }
                            stroke={palette.secondary.main} 
                            fillOpacity={1} 
                            fill="url(#colorCapitolAllocated)" 
                        />
                        </AreaChart>
                    </ResponsiveContainer>
            </DashboardBox>
        </>
    );
};

export default Row1;