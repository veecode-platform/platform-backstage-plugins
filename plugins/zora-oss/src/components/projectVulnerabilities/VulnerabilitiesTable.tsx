import React from 'react';
import {
    Progress,
    ResponseErrorPanel,
    TableColumn,
    Table
} from '@backstage/core-components';
import useAsync from 'react-use/lib/useAsync';
import dataJson from "../clusterVulnerabilities/vulnerability-reports-all-ns.json"
import { IconButton, Typography, Paper, Tooltip } from '@material-ui/core';
import { Info, Link } from "@material-ui/icons";
import { useApi} from '@backstage/core-plugin-api';
import { kubernetesApiRef } from '@veecode-platform/plugin-kubernetes';
import {  useEntity } from '@backstage/plugin-catalog-react';



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

const Columns: TableColumn[] = [
    { title: "Id", field: "id" },
    { title: "Title", field: "title" },
    { title: "Description", field: "description" },
    { title: "Package", field: "package" },
    { title: "Score", field: "score" },
    { title: "Severity", field: "severity" },
    { title: "Status", field: "status" },
    { title: "Url", field: "url" },
    { title: "Version", field: "version" },

]
export const ProjectVulnerabilitiesTable = () => {
    const kubernetesApi = useApi(kubernetesApiRef);
    const { entity } = useEntity();
    const clusterName = entity?.metadata.annotations?.['veecode/cluster-name'] || entity.metadata?.name;
    const imageName = entity?.metadata.annotations?.['veecode/image-name'] || entity.metadata?.annotations?.["github.com/project-slug"] || entity.metadata?.name

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
    if (!value) {
        return <Paper>
            <Typography variant="h4" style={{ paddingTop: "1rem", paddingLeft: "1rem" }}>Vulnerabilities</Typography>
            <Typography style={{ paddingLeft: "1rem" }} color='textSecondary' variant='subtitle2'>No vulnerabilities found in the last scan</Typography>
        </Paper>
    }

    return (
        <Paper>

            <Table
                title={"Image Vulnerabilities"}
                options={{ search: true, paging: true }}
                columns={Columns}
                data={value.spec.vulnerabilities.map((vulnerability) => {
                    return {
                        id: vulnerability.id,
                        description: <Tooltip style={{cursor: "pointer"}} title={`${vulnerability.description}`}><Info/></Tooltip>,
                        package: vulnerability.package,
                        score: vulnerability.score,
                        severity: vulnerability.severity,
                        status: vulnerability.status,
                        title: vulnerability.title,
                        version: vulnerability.version,
                        url: <IconButton target='_blank' href={`${vulnerability.url}`}><Link/></IconButton> ,
                    }
                }
                )}
            />

        </Paper>



    )

};



