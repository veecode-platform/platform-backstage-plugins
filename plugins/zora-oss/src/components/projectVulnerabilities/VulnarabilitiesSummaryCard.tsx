import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Progress,
    ResponseErrorPanel,
    Link
} from '@backstage/core-components';
import useAsync from 'react-use/lib/useAsync';
import dataJson from "../clusterVulnerabilities/vulnerability-reports-all-ns.json"
import { IconButton, Typography, Paper, Tooltip } from '@material-ui/core';
import { Error, Warning, NewReleases, Announcement, ExitToApp } from "@material-ui/icons";
import { useApi, useRouteRef } from '@backstage/core-plugin-api';
import { kubernetesApiRef } from '@veecode-platform/plugin-kubernetes';
import { createStyles, Theme } from "@material-ui/core";
import { entityRouteRef, useEntity } from '@backstage/plugin-catalog-react';



function groupItemsByScan(items: typeof dataJson.items) {
    const groupedItems = new Map<string, typeof dataJson.items>();

    items.forEach((item) => {
        const scan = item.metadata.creationTimestamp;
        if (!groupedItems.has(scan)) {
            groupedItems.set(scan, []);
        }
        groupedItems.get(scan)?.push(item);
    });

    return groupedItems;
}



const useStyles = makeStyles((theme: Theme) =>
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
        low:{
            backgroundColor: "#4caf50"
        },
        vulnerabilitieChip: {
            width: "8rem",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
            padding: "0.3rem",
            borderRadius: "1rem",
        }
    }),
);

export const VulnerabilitiesSummaryCard = () => {
    const kubernetesApi = useApi(kubernetesApiRef);
    const { entity } = useEntity();
    const clusterName = entity?.metadata.annotations?.['veecode/cluster-name'] || entity.metadata?.name;
    const imageName = entity?.metadata.annotations?.['veecode/image-name'] || entity.metadata?.annotations?.["github.com/project-slug"] || entity.metadata?.name

    const entityUrl = useRouteRef(entityRouteRef);

    const { value, loading, error } = useAsync(async (): Promise<typeof dataJson.items[0] | undefined> => {
        const vulnerabilities: typeof dataJson = await (await kubernetesApi.proxy({
            clusterName: clusterName,
            path: '/apis/zora.undistro.io/v1alpha1/vulnerabilityreports',
        })).json();


        const grouped = groupItemsByScan(vulnerabilities.items);

        const lastScan = grouped.values().next().value;

        return lastScan?.filter((vulnerability: typeof dataJson.items[0]) => vulnerability.spec.image.includes(imageName))[0]

    }, []);

    if (loading) {
        return <Progress />;
    } else if (error) {
        return <ResponseErrorPanel error={error} />;
    }
    if(!value){
        return <Paper>
            <Typography variant="h4" style={{ paddingTop: "1rem", paddingLeft: "1rem" }}>Vulnerabilities</Typography>
            <Typography style={{ paddingLeft: "1rem" }} color='textSecondary' variant='subtitle2'>No vulnerabilities found in the last scan</Typography>
        </Paper>
    }

    return (
        <Paper>
            <Typography variant="h4" style={{ paddingTop: "1rem", paddingLeft: "1rem" }}>Vulnerabilities</Typography>
            <Typography style={{ paddingLeft: "1rem" }} color='textSecondary' variant='subtitle2'>Found in the last scan: {value?.metadata.creationTimestamp} </Typography>

            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent:"flex-start",  padding: "1rem", gap: "1rem" }}>
                <VulnerabilitieChip severity="Critical" count={value?.spec.summary.critical} />
                <VulnerabilitieChip severity="High" count={value?.spec.summary.high} />
                <VulnerabilitieChip severity="Medium" count={value?.spec.summary.medium} />
                <VulnerabilitieChip severity="Low" count={value?.spec.summary.low} />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", paddingBottom: "1rem", paddingRight: "1rem" }}>
                <Link to={`${entityUrl({ name: entity.metadata.name, kind: entity.kind, namespace: entity.metadata.namespace || 'default' })}/zora`}>
                <Tooltip title="View more details">
                    <IconButton>
                        <ExitToApp />
                    </IconButton>
                </Tooltip>
                </Link>
            </div>

        </Paper>



    )

};

const VulnerabilitieChip = ({ severity, count }: { severity: string, count: number | undefined }) => {
    const { vulnerabilitieChip, critical, high, medium, low } = useStyles();

    const resolveSeverity = (severity: string) => {
        switch (severity) {
            case "Critical":
                return critical
            case "High":
                return high
            case "Medium":
                return medium
            case "Low":
                return low
            default:
                return critical
        }
    }
    return (
        <div className={`${vulnerabilitieChip} ${resolveSeverity(severity)}`}>
            <Typography>{severity}</Typography>
            <Typography>{count}</Typography>
            {getSeverityIcon(severity)}
        </div>
    )
}

const getSeverityIcon = (severity: string) => {
    switch (severity) {
        case "Critical":
            return <NewReleases />
        case "High":
            return <Error />
        case "Medium":
            return <Warning />
        case "Low":
            return <Announcement />
        default:
            return <Error />
    }
}


