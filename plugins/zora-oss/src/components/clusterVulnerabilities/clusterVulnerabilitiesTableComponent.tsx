import React, { useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Table,
    TableColumn,
    Progress,
    ResponseErrorPanel,
    InfoCard,
} from '@backstage/core-components';
import useAsync from 'react-use/lib/useAsync';
import dataJson from "./vulnerability-reports-all-ns.json"
import { IconButton, Drawer, Grid, Chip, Accordion, AccordionSummary, Box, Typography } from '@material-ui/core';
import { Link, Info, Close, ExpandMore } from "@material-ui/icons";
import { useApi } from '@backstage/core-plugin-api';
import { kubernetesApiRef } from '@veecode-platform/plugin-kubernetes';
import { createStyles, Theme } from "@material-ui/core";
import { useZoraWrapperStyles } from '../styles';
import { ClusterVulnerabilitiesLineChart } from './clusterVulnerabilitiesLineChart';
import { CveModalComponent } from './AI/CveModal';
import { SiOpenai } from "react-icons/si";


function groupItemsByScan(items: typeof dataJson.items) {
    const groupedItems = new Map();

    items.forEach((item) => {
        const scan = item.metadata.creationTimestamp;
        if (!groupedItems.has(scan)) {
            groupedItems.set(scan, []);
        }
        groupedItems.get(scan).push(item);
    });

    return groupedItems;
}



type DenseTableProps = {
    clusterVulnerabilities: typeof dataJson.items;
};


const useDrawerStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            width: '100%',
            padding: theme.spacing(2.5),
        },
        critical: {
            backgroundColor: "#b22222"
        },
        high: {
            backgroundColor: "#ea5216"
        },
        medium: {
            backgroundColor: "#f8bf22"
        },
    }),
);




export const DenseTable = ({ clusterVulnerabilities }: DenseTableProps) => {
    const { paper, critical, high, medium } = useDrawerStyles();
    const [isOpen, setIsOpen] = useState(false);
    const [clusterResources, setClusterResources] = useState([{}])
    const [showModal, setShowModal] = useState(false);
    //const [loadingAi, setLoadingAI] = useState(false)

    const [cve, setCve] = useState("")
    const [packageName, setPackageName] = useState("")
    const [imageName, setImageName] = useState("")
    const [distro, setDistro] = useState("")

    const columns: TableColumn[] = [
        { title: 'Namespace', field: 'namespace' },
        { title: 'Architecture', field: 'architecture' },
        //{ title: 'Cluster', field: 'cluster' },
        { title: 'Distro', field: 'distro' },
        { title: 'Image', field: 'image' },
        { title: 'Vulnerabilities', field: 'summary' },
        { title: "CVEs", field: "resources" },
        //{ title: "Os", field: "os" },
    ];


    const cvesColumns: TableColumn[] = [
        { title: "Id", field: "id" },
        //{ title: "Description", field: "description" },
        { title: "Package", field: "package" },
        { title: "Score", field: "score" },
        { title: "Severity", field: "severity" },
        { title: "Status", field: "status" },
        //{ title: "Title", field: "title" },
        { title: "Url", field: "url" },
        { title: "Version", field: "version" },
        //{ title: "Fix", field: "fixVersion" },
        { title: "AI", field: "ai" }

    ]

    const data = clusterVulnerabilities.map(clusterVulnerability => {
        return {
            namespace: clusterVulnerability.metadata.namespace,
            architecture: clusterVulnerability.spec.architecture,
            cluster: clusterVulnerability.spec.cluster,
            distro: `${clusterVulnerability.spec.distro.name}:${clusterVulnerability.spec.distro.version}`,
            image: clusterVulnerability.spec.image,
            os: clusterVulnerability.spec.os,
            summary: <div style={{ display: "flex" }}>
                <Chip className={critical} label={clusterVulnerability.spec.summary.critical} />
                <Chip className={high} label={clusterVulnerability.spec.summary.high} />
                <Chip className={medium} label={clusterVulnerability.spec.summary.medium} />
                <Chip label={clusterVulnerability.spec.summary.low} />
            </div>,
            tags: clusterVulnerability.spec.tags,
            resources: <IconButton onClick={() => {
                setIsOpen(true)
                setClusterResources(clusterVulnerability.spec.vulnerabilities.map(cve => {
                    return {
                        id: cve.id,
                        package: cve.package,
                        score: cve.score,
                        severity: cve.severity,
                        status: cve.status,
                        url: <a href={cve.url} target='_blank'><IconButton><Link /></IconButton></a>,
                        version: cve.version,
                        ai: cve.status === "fixed" ? <IconButton onClick={() => {
                            setShowModal(true)
                            setImageName(clusterVulnerability.spec.image)
                            setCve(cve.id)
                            setDistro(clusterVulnerability.spec.distro.name)
                            setPackageName(cve.package)                           
                        }}><SiOpenai /></IconButton> : null

                    }
                }))
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
                        <InfoCard title="CVES">
                            <Table
                                options={{ search: true, paging: true }}
                                columns={cvesColumns}
                                data={clusterResources}
                            />
                        </InfoCard>
                    </Grid>

                </Grid>
            </Drawer>
            <CveModalComponent show={showModal} imageName={imageName} distro={distro} cve={cve} packageName={packageName} /*handleLoadingAi={setLoadingAI}*/ handleCloseModal={() => setShowModal(!showModal)}/>    
            <Table
                options={{ search: true, paging: true }}
                columns={columns}
                data={data}
            />
        </>
    );
};

export const ClusterVulnerabilitiesTableComponent = ({clusterName}: {clusterName: string}) => {
    const kubernetesApi = useApi(kubernetesApiRef);
    const { content } = useZoraWrapperStyles();

    const { value, loading, error } = useAsync(async (): Promise<{
        lastScan: typeof dataJson.items,
        xLabels: string[],
        criticalData: number[],
        highData: number[],
        mediumData: number[],
        lowData: number[],
        unknownData: number[],
        totalData: number[]
    }> => {
        const vulnerabilities: typeof dataJson = await (await kubernetesApi.proxy({
            clusterName: clusterName,
            path: '/apis/zora.undistro.io/v1alpha1/namespaces/zora-system/vulnerabilityreports',
        })).json();


        const grouped = groupItemsByScan(vulnerabilities.items);

        const groupedSummary = new Map();

        grouped.forEach((value: typeof dataJson.items, key) => {
            if (!groupedSummary.has(key)) {
                groupedSummary.set(key, [])

                const sumOfSummary = value.reduce((acc, item) => {
                    return {
                        critical: acc.critical + item.spec.summary.critical,
                        high: acc.high + item.spec.summary.high,
                        medium: acc.medium + item.spec.summary.medium,
                        low: acc.low + item.spec.summary.low,
                        unknown: acc.unknown + item.spec.summary.unknown,
                        total: acc.total + item.spec.summary.total,
                    };

                },
                    {
                        critical: 0,
                        high: 0,
                        medium: 0,
                        low: 0,
                        unknown: 0,
                        total: 0
                    })
                groupedSummary.get(key).push(sumOfSummary)
            }

        })

        const criticalData: number[] = []
        const highData: number[] = []
        const mediumData: number[] = []
        const lowData: number[] = []
        const unknownData: number[] = []
        const totalData: number[] = []

        groupedSummary.forEach((value, _key) => {
            criticalData.push(value[0].critical)
            highData.push(value[0].high)
            mediumData.push(value[0].medium)
            lowData.push(value[0].low)
            unknownData.push(value[0].unknown)
            totalData.push(value[0].total)
        })

        return {
            lastScan: grouped.values().next().value,
            xLabels: Array.from(grouped.keys()),
            criticalData: criticalData,
            highData: highData,
            mediumData: mediumData,
            lowData: lowData,
            unknownData: unknownData,
            totalData: totalData
        }
    }, []);

    if (loading) {
        return <Progress />;
    } else if (error) {
        return <ResponseErrorPanel error={error} />;
    }

    return (
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "3rem", padding: "2rem" }}>
            <ClusterVulnerabilitiesLineChart
                xLabels={value?.xLabels}
                criticalData={value?.criticalData}
                highData={value?.highData}
                mediumData={value?.mediumData}
                lowData={value?.mediumData}
                unknownData={value?.unknownData}
                totalData={value?.totalData}
            />
            <Box >
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography variant='h6'>Cluster Vulnerabilities</Typography>
                    </AccordionSummary>
                    <div className={content}>
                        <DenseTable clusterVulnerabilities={value?.lastScan || []} />
                    </div>
                </Accordion>
            </Box>
        </div>

    )

};


