import React, { useState } from 'react'
import { useApi } from '@backstage/core-plugin-api';
import { kubernetesApiRef } from '@backstage/plugin-kubernetes';
import useAsync from 'react-use/lib/useAsync';
import { Progress, ErrorPage } from '@backstage/core-components';
import { useEntity, MissingAnnotationEmptyState } from '@backstage/plugin-catalog-react';
import { Grid, Drawer, IconButton } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import OpenInNewIcon from "@material-ui/icons/OpenInNew"

import {
    InfoCard,
    Content,
    Link,
    //ContentHeader,
    //SupportButton,
    StructuredMetadataTable,
    Table,
    StatusOK,
    StatusError,
    StatusWarning,
    //StatusRunning,
} from '@backstage/core-components';

const useDrawerStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            width: '50%',
            padding: theme.spacing(2.5),
        },
    }),
);

export type ClusterNamespace = {
    status: React.JSX.Element
    name: string
}

export type ClusterNodes = {
    name: string
    createdAt: string
    id: string
    os: string
    arch: string
    region: string
    capacity: {
        cpu: string
        memory: string
        pods: string
    },
    internalIp: string
    externalIp: string
    kubeletVersion: string
    kernelVersion: string
    osImage: string
}

export type ClusterCapacity = {
    cpu: number
    memory: string
    pods: number
}

export type ClusterInformation = {
    name: string
    status: React.JSX.Element,
    namespaces: any,
}

export type ClusterLinks = {
    admin?: React.JSX.Element
}

export type ClusterResponse = {
    nodes: ClusterNodes[],
    capacity: ClusterCapacity,
    info: ClusterInformation,
    ingressClasses: any[],
    links?: ClusterLinks
}

type NodeResponse = { metadata: { [x: string]: any; name: any; creationTimestamp: any; uid: any; region: any; }; status: { capacity: { cpu: any; memory: any; pods: any; }; addresses: { address: any; }[]; nodeInfo: { kubeletVersion: any; kernelVersion: any; osImage: any; }; }; }
type NamespacesResponse = { metadata: { name: string; }; status: { phase: string; }; }

const switchStatuses = (status: string) => {
    switch (status) {
        case "Active":
            return <StatusOK />
        case "Terminating":
            return <StatusError />
        default:
            return <StatusWarning />
    }
}

const convertMemoryValues = (value: string) => {
    const splited = value.split(/(?=[a-zA-z])|(?<=[a-zA-z])/g)

    switch (splited[1].toLowerCase()) {
        case "k"://k
            return parseInt(splited[0])
        case "m":
            return parseInt(splited[0]) / 1024// k*1024
        case "g":
            return parseInt(splited[0]) / 1024 ** 2// k*1024*2
        case "t":
            return parseInt(splited[0]) / 1024 ** 3// k*1024*3
        case "p":
            return parseInt(splited[0]) / 1024 ** 4// k*1024*4
        default:
            return parseInt(splited[0])
    }
}

const showMemoryDisplayValueInGi = (valueInKi: number) => {
    return `${(valueInKi / 1024 ** 2).toFixed(2)} Gi`
}

const convertCpuValues = (value: string) => {
    const splited = value.split(/(?=[a-zA-z])|(?<=[a-zA-z])/g)

    if (splited.length == 1) return parseInt(value)

    switch (splited[1].toLowerCase()) {
        case "m":
            return parseInt(splited[0]) / 1000

        default:
            return parseInt(splited[0])
    }
}

export const ClusterOverview = () => {
    const { entity } = useEntity();
    const kubernetesApi = useApi(kubernetesApiRef);
    const [isOpen, toggleDrawer] = useState(false);
    const classes = useDrawerStyles();
    const [nodeInfo, setNodeInfo] = useState<Partial<ClusterNodes>>()

    const InfoButton = ({ info }: { info: Partial<ClusterNodes> }) => {
        return (<IconButton
            key="open"
            title="More info"
            onClick={() => {
                setNodeInfo(info)
                toggleDrawer(true)
            }}
            color="inherit"
        >
            <InfoIcon />
        </IconButton>)
    }

    const CLUSTER_NAME = entity.metadata?.annotations?.["veecode/cluster-name"] || entity.metadata?.name
    if (!CLUSTER_NAME) return <MissingAnnotationEmptyState annotation={["veecode/cluster-name", "metadata.name"]} />

    const { loading, error, value } = useAsync(async (): Promise<ClusterResponse> => {

        const namespaces: any = await (await kubernetesApi.proxy({
            clusterName: CLUSTER_NAME,
            path: '/api/v1/namespaces',

        })).json();
        const nodes: any = await (await kubernetesApi.proxy({
            clusterName: CLUSTER_NAME,
            path: '/api/v1/nodes',

        })).json();

        const ingressClasses: any = await (await kubernetesApi.proxy({// ingress class, name, version, ip
            clusterName: CLUSTER_NAME,
            path: '/apis/networking.k8s.io/v1/ingressclasses',

        })).json();

        const ingresses: any = await (await kubernetesApi.proxy({// ingress class, name, version, ip
            clusterName: CLUSTER_NAME,
            path: '/apis/networking.k8s.io/v1/ingresses',

        })).json();

        const clusterStatus: Response = await kubernetesApi.proxy({// ingress class, name, version, ip
            clusterName: CLUSTER_NAME,
            path: '/api/v1',
        })


        const namespacesList: ClusterNamespace[] = namespaces.items.map((namespace: NamespacesResponse) => {
            return <div>{switchStatuses(namespace.status.phase as string)}{namespace.metadata.name}</div>
        })

        const nodesList: ClusterNodes[] = nodes.items.map((node: NodeResponse) => {
            const fullInfo = {
                name: node.metadata.name,
                createdAt: node.metadata.creationTimestamp,
                id: node.metadata.uid,
                os: node.metadata.labels["kubernetes.io/os"],
                arch: node.metadata.labels["kubernetes.io/arch"],
                region: node.metadata.labels.region,
                capacity: {
                    cpu: node.status.capacity.cpu,
                    memory: node.status.capacity.memory,
                    pods: node.status.capacity.pods,
                },
                internalIp: node.status.addresses[0].address,
                externalIp: node.status.addresses[2].address,
                kubeletVersion: node.status.nodeInfo.kubeletVersion,
                kernelVersion: node.status.nodeInfo.kernelVersion,
                osImage: node.status.nodeInfo.osImage,
            }
            return {
                ...fullInfo,
                info: <InfoButton info={fullInfo} />
            }
        })

        const capacity: ClusterCapacity = {
            cpu: 0,
            memory: "",
            pods: 0,
        }

        let memory = 0
        nodesList.forEach(node => {
            capacity.cpu += convertCpuValues(node.capacity.cpu)
            memory += convertMemoryValues(node.capacity.memory)
            capacity.pods += parseInt(node.capacity.pods)
        })

        capacity.memory = showMemoryDisplayValueInGi(memory)

        const info: ClusterInformation = {
            status: clusterStatus.status === 200 ? <StatusOK>{clusterStatus.statusText}</StatusOK> : <StatusError>{clusterStatus.statusText}</StatusError>,
            name: CLUSTER_NAME,
            namespaces: namespacesList
        }

        const mapedIngressClasses = ingressClasses.items.map((ic: { metadata: { name: any; labels: any; creationTimestamp: any; }; }) => {
            const filteredIngresses = ingresses.items.filter((ingress: { spec: { ingressClassName: any; }; }) => ingress.spec.ingressClassName === ic.metadata.name)

            const ipList: any[] = []

            filteredIngresses.forEach((i: { status: { loadBalancer: { ingress: any[]; }; }; }) => {
                i.status.loadBalancer?.ingress?.forEach(x => {
                    ipList.push(x.ip)
                })
            });


            return {
                name: ic.metadata.name,
                version: ic.metadata.labels["app.kubernetes.io/version"],
                createdAt: ic.metadata.creationTimestamp,
                ip: ipList.filter((value, index, self) => self.indexOf(value) === index).join(",")

            }
        })

        const response: ClusterResponse = {
            nodes: nodesList,
            capacity: capacity,
            info: info,
            ingressClasses: mapedIngressClasses,
        }
        const hasAdminUrl = entity.metadata?.annotations?.["eks/region"]

        if (hasAdminUrl) {
            const clusterlinks: ClusterLinks = {
                admin:
                    <Link to={`https://${hasAdminUrl}.console.aws.amazon.com/eks/home?region=${hasAdminUrl}#/clusters/${CLUSTER_NAME}`}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent:"center", gap: "2px"}}>
                            Cluster Manager Console
                            <OpenInNewIcon />
                        </div>
                    </Link>
            }
            response.links = clusterlinks
        }

        return response

    }, []);

    if (loading) {
        return <Progress />;
    }
    if (error) {
        return <ErrorPage status={error.name} statusMessage={error.message} />;
    }
    if (value) {
        const { nodes, capacity, info, ingressClasses, links } = value

        return (
            <Content>
                <Grid container spacing={2} direction="row">
                    <Drawer
                        classes={{
                            paper: classes.paper,
                        }}
                        anchor="right"
                        open={isOpen}
                        onClose={() => toggleDrawer(false)}
                    >
                        <Grid container>
                            <Grid item md={12}>
                                <IconButton
                                    key="dismiss"
                                    title="Close the drawer"
                                    onClick={() => toggleDrawer(false)}
                                    color="inherit"
                                >
                                    <CloseIcon />
                                </IconButton>
                            </Grid>

                            <Grid item md={12}>
                                <InfoCard title="Information">
                                    <StructuredMetadataTable metadata={nodeInfo as ClusterNodes} />
                                </InfoCard>
                            </Grid>

                        </Grid>
                    </Drawer>

                    <Grid item md={3} sm={12} >{/* left-side div: cluster info + capacity*/}
                        <Grid container spacing={2}>
                            <Grid item md={12} sm={12}>
                                <InfoCard title="Cluster information">
                                    <StructuredMetadataTable metadata={info} />
                                </InfoCard>
                            </Grid>
                            {
                                links ?
                                    <Grid item md={12}>
                                        <InfoCard title="Links">
                                            <div>{links.admin}</div>
                                        </InfoCard>
                                    </Grid>
                                    : null
                            }
                            <Grid item md={12}>
                                <InfoCard title="Capacity">
                                    <StructuredMetadataTable metadata={capacity} />
                                </InfoCard>
                            </Grid>

                        </Grid>
                    </Grid>

                    <Grid item md={9} sm={12}> {/* right-side div: node table + ingress classes*/}
                        <Grid container spacing={2}>
                            <Grid item md={12}>
                                <Table
                                    title={"Nodes"}
                                    columns={[
                                        { title: 'Name', field: 'name' },
                                        { title: 'Os', field: 'os' },
                                        { title: 'Arch', field: 'arch' },
                                        { title: "Info", field: "info" },
                                        { title: 'Creation', field: 'createdAt' }
                                    ]}
                                    data={nodes}
                                    options={{ search: true, paging: true }} />
                            </Grid>
                            <Grid item md={12}>
                                <Table
                                    title={"Ingress classes"}
                                    columns={[
                                        { title: 'Name', field: 'name' },
                                        { title: 'Ip', field: 'ip' },
                                        { title: 'Version', field: 'version' },
                                        { title: 'Creation', field: 'createdAt' }
                                    ]}
                                    data={ingressClasses}
                                    options={{ search: true, paging: true }} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Content>
        )
    }
    return <></>
}