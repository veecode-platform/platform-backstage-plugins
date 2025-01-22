import { Paper, Typography, Box, Switch } from "@material-ui/core";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts";
import React, { useState } from "react";

const valueFormatter = (item: { value: number }) => `${item.value}`;

interface ClusterIssuesPieChartProps {
    issuesByCategory: any;
    issuesBySeverity: any;
    totalIssues: number | undefined;
}

export const ClusterIssuesPieChart = ({issuesByCategory, issuesBySeverity, totalIssues}: ClusterIssuesPieChartProps ) => {
    const [pieChartType, setPieChartType] = useState(false)
    return (
        <div style={{ display: "flex", gap: "2rem", width: "100%" }}>
            <Paper style={{ padding: "2rem", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%" }}>
                <Typography variant='h6'>Issues</Typography>
                <PieChart
                    series={[
                        {
                            ...{
                                data: pieChartType ? issuesByCategory : issuesBySeverity,
                                valueFormatter
                            },

                            innerRadius: 15,
                            outerRadius: 100,
                            paddingAngle: 5,
                            cornerRadius: 5,

                            arcLabel: (item) => `${item.value}`,
                            arcLabelMinAngle: 35,
                            arcLabelRadius: '60%',

                            highlightScope: { fade: 'global', highlight: 'item' },
                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                        },

                    ]}
                    sx={{
                        [`& .${pieArcLabelClasses.root}`]: {
                            fontWeight: 'bold',
                        },
                    }}
                    width={1000}
                    height={300}
                />
                <Box style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between", padding: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <p>Severity</p>
                        <Switch
                            color="default"
                            checked={pieChartType}
                            onChange={() => setPieChartType(!pieChartType)}
                            name="type"
                            inputProps={{ 'aria-label': 'type' }}
                        />
                        <p>Category</p>
                    </div>
                    <Typography>Total issues: {totalIssues}</Typography>
                </Box>
            </Paper>
        </div>

    )
}