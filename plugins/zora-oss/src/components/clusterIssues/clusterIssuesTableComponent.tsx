import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Table,
    TableColumn,
    Progress,
    ResponseErrorPanel,
    InfoCard,
    StructuredMetadataTable,
} from '@backstage/core-components';
import useAsync from 'react-use/lib/useAsync';
import dataJson from "./clusterissue-all-ns.json"
import { IconButton, Drawer, Grid, Accordion, AccordionSummary, Box, Typography } from '@material-ui/core';
import { Link, Info, Close, ExpandMore } from "@material-ui/icons";
import { useApi } from '@backstage/core-plugin-api';
import { kubernetesApiRef } from '@veecode-platform/plugin-kubernetes';
import { ClusterIssuesPieChart } from './clusterIssuesPieChart';
import { createStyles, Theme } from "@material-ui/core";
import { useZoraWrapperStyles } from '../styles';

function getColorForSeverity(severity: string) {
    switch (severity) {
        case 'High':
            return '#ea5216';
        case 'Medium':
            return '#f8bf22';
        case 'Low':
            return '#5b9a4c';
        default:
            return '#000000';
    }
}

const useDrawerStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            width: '80%',
            padding: theme.spacing(2.5),
        },
    }),
);


type DenseTableProps = {
    clusterIssues: typeof dataJson.items;
};


export const DenseTable = ({ clusterIssues }: DenseTableProps) => {
    const { paper } = useDrawerStyles();
    const [isOpen, setIsOpen] = useState(false);
    const [clusterResources, setClusterResources] = useState({})

    const columns: TableColumn[] = [
        { title: 'Cluster', field: 'cluster' },
        { title: 'Id', field: 'id' },
        { title: 'Category', field: 'category' },
        { title: 'Severity', field: 'severityString' },
        { title: 'Message', field: 'message' },
        { title: "help", field: "url" },
        { title: "Resources", field: "resources" }
    ];

    const data = clusterIssues.map(clusterIssue => {
        return {
            category: clusterIssue.spec.category,
            cluster: clusterIssue.spec.cluster,
            id: clusterIssue.spec.id,
            severityString: clusterIssue.spec.severity,
            message: clusterIssue.spec.message,
            url: <a href={clusterIssue.spec.url} target='_blank'><IconButton><Link /></IconButton></a>,
            resources: <IconButton onClick={() => {
                setIsOpen(true)
                setClusterResources({
                    plugin: clusterIssue.metadata.labels.plugin,
                    "scan id": clusterIssue.metadata.labels.scanID,
                    ...clusterIssue.spec.resources,

                })
            }}><Info /></IconButton>
        };
    });

    return (
        <>
            <Drawer
                classes={{
                    paper: paper,
                }}
                anchor="right"
                open={isOpen}
                onClose={() => setIsOpen(false)}>
                <Grid container>
                    <Grid item md={12}>
                        <IconButton
                            key="dismiss"
                            title="Close the drawer"
                            onClick={() => setIsOpen(false)}
                            color="inherit"
                        >
                            <Close />
                        </IconButton>
                    </Grid>

                    <Grid item md={12}>
                        <InfoCard title="Resources">
                            <StructuredMetadataTable metadata={clusterResources}></StructuredMetadataTable>
                        </InfoCard>
                    </Grid>

                </Grid>


            </Drawer>
            <Table
                //title="Cluster issues"
                options={{ search: true, paging: true }}
                columns={columns}
                data={data}
            />
        </>
    );
};

export const ClusterIssuesTableComponent = ({clusterName}: {clusterName: string}) => {
    const { content } = useZoraWrapperStyles();
    const kubernetesApi = useApi(kubernetesApiRef);

    const { value, loading, error } = useAsync(async (): Promise<{ items: typeof dataJson.items, issuesBySeverityGraphData: { label: string, value: number, color: string }[], issuesByCategoryGraphData: { label: string, value: number }[] }> => {
        const issues:typeof dataJson  = await (await kubernetesApi.proxy({
            clusterName: clusterName,
            path: '/apis/zora.undistro.io/v1alpha1/namespaces/zora-system/clusterissues',
        })).json();

        const issuesBySeverityGraphData = issues.items.reduce((acc: { [key: string]: { label: string, value: number, color: string } }, issue) => {
            const severity = issue.metadata.labels.severity; 
            if (!acc[severity]) {
                acc[severity] = { label: severity, value: 0, color: getColorForSeverity(severity) };
            }
            acc[severity].value += 1;
            return acc;
        }, {});

        const issuesByCategoryGraphData = issues.items.reduce((acc: { [key: string]: { label: string, value: number } }, issue) => {
            const category = issue.spec.category;
            if (!acc[category]) {
                acc[category] = { label: category, value: 0 };
            }
            acc[category].value += 1;
            return acc;

        },
         {});
    
        return {
            items: issues.items,
            issuesBySeverityGraphData: Object.values(issuesBySeverityGraphData),
            issuesByCategoryGraphData: Object.values(issuesByCategoryGraphData),

        };

    }, []);

    if (loading) {
        return <Progress />;
    } else if (error) {
        return <ResponseErrorPanel error={error} />;
    }

    return (

        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "3rem", padding: "2rem" }}>
            <ClusterIssuesPieChart issuesByCategory={value?.issuesByCategoryGraphData} issuesBySeverity={value?.issuesBySeverityGraphData} totalIssues={value?.items.length} />
            <Box >
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography variant='h6'>Cluster Issues</Typography>
                    </AccordionSummary>
                    <div className={content}>
                        <DenseTable clusterIssues={value?.items || []} />

                    </div>

                </Accordion>
            </Box>
        </div>

    );
};

