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
import {
    InfoCard,
    Content,
    ContentHeader,
    SupportButton,
    StructuredMetadataTable,
    Table,
    StatusOK,
    //StatusError,
    StatusWarning,
    StatusRunning,
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

export type CLusterInformation = {
    name: string
    status: React.JSX.Element
}

type NodeResponse = { metadata: { [x: string]: any; name: any; creationTimestamp: any; uid: any; region: any; }; status: { capacity: { cpu: any; memory: any; pods: any; }; addresses: { address: any; }[]; nodeInfo: { kubeletVersion: any; kernelVersion: any; osImage: any; }; }; }
type NamespacesResponse = { metadata: { name: string; }; status: { phase: string; }; }

const switchStatuses = (status: string) => {
    switch (status) {
        case "Active":
            return <StatusRunning>{status}</StatusRunning>
        default:
            return <StatusWarning>{status}</StatusWarning>
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

    const CLUSTER_NAME = entity.metadata?.name || entity.metadata?.annotations?.["veecode/cluster-name"]
    if (!CLUSTER_NAME) return <MissingAnnotationEmptyState annotation={["veecode/cluster-name", "metadata.name"]} />

    const { loading, error, value } = useAsync(async (): Promise<{
        namespaces: ClusterNamespace[],
        nodes: ClusterNodes[],
        capacity: ClusterCapacity,
        info: CLusterInformation,
        ingressClasses: any[]
    }> => {

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


        const namespacesList: ClusterNamespace[] = namespaces.items.map((namespace: NamespacesResponse) => {
            return {
                status: switchStatuses(namespace.status.phase as string),
                name: namespace.metadata.name as string
            }
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

        const info = {
            name: CLUSTER_NAME,
            status: <StatusOK>Ok</StatusOK>
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

        const response = {
            namespaces: namespacesList,
            nodes: nodesList,
            capacity: capacity,
            info: info,
            ingressClasses: mapedIngressClasses
        }
        //console.log("response pre: ", namespaces, nodes)
        //console.log("response pos: ", response)

        return response

    }, []);

    if (loading) {
        return <Progress />;
    }
    if (error) {
        return <ErrorPage status={error.name} statusMessage={error.message} />;
    }
    if (value) {
        const { namespaces, nodes, capacity, info, ingressClasses } = value

        return (
            <Content>
                <ContentHeader title="Overview">
                    <SupportButton>Your cluster's information.</SupportButton>
                </ContentHeader>
                <Grid container spacing={3} direction="row">

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
                        <Grid container spacing={3}>
                            <Grid item md={12}>
                                <InfoCard title="Cluster information">
                                    <StructuredMetadataTable metadata={info} />
                                </InfoCard>
                            </Grid>
                            <Grid item md={12}>
                                <InfoCard title="Capacity">
                                    <StructuredMetadataTable metadata={capacity} />
                                </InfoCard>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item md={9}> {/* right-side div: node table + namespaces*/}
                        <Grid container spacing={3}>
                            <Grid item md={12}>
                                <Table
                                    title={"Nodes"}
                                    columns={[
                                        { title: 'Name', field: 'name' },
                                        { title: 'Os', field: 'os' },
                                        { title: 'Arch', field: 'arch' },
                                        { title: "Info", field: "info" },
                                        { title: 'Creation', field: 'createdAt' },

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
                                        { title: 'Creation', field: 'createdAt' },
                                    ]}
                                    data={ingressClasses}
                                    options={{ search: true, paging: true }} />
                            </Grid>
                            <Grid item md={12}>
                                <InfoCard title="Namespaces">
                                    <Grid container spacing={2}>
                                        {namespaces.map((namespace, index) => {
                                            return (
                                                <Grid item md={3} key={index}>
                                                    <InfoCard>
                                                        <StructuredMetadataTable metadata={namespace} />
                                                    </InfoCard>
                                                </Grid>
                                            )
                                        })}
                                    </Grid>
                                </InfoCard>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
            </Content>
        )
    }
    return <></>
}