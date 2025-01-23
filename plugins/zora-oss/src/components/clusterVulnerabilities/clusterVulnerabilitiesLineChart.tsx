import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Paper, Typography } from '@material-ui/core';

interface ClusterVulnerabilitiesLineChartProps {
    xLabels: string[] | undefined;
    criticalData: number[] | undefined;
    highData: number[] | undefined;
    mediumData: number[] | undefined;
    lowData: number[] | undefined;
    unknownData: number[] | undefined;
    totalData: number[] | undefined;
}

export function ClusterVulnerabilitiesLineChart({xLabels, criticalData, highData, mediumData, lowData, unknownData, totalData}: ClusterVulnerabilitiesLineChartProps ) {

    return (
        <div style={{ display: "flex", gap: "2rem" }}>
            <Paper style={{ padding: "2rem", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%", gap: "2rem" }}>
                <Typography variant='h6'>Vulnerabilities</Typography>
                <LineChart
                    width={800}
                    height={300}
                    series={[
                        { data: criticalData, label: 'critical' },
                        { data: highData, label: 'high' },
                        { data: mediumData, label: 'medium' },
                        { data: lowData, label: 'low' },
                        { data: unknownData, label: 'unknown' },
                        { data: totalData, label: 'total' },
                    ]}
                    xAxis={[{ scaleType: 'point', data: xLabels }]}
                />

            </Paper>
        </div>

    );
}