import React from 'react';
import { useApi } from '@backstage/core-plugin-api';
import { kubernetesApiRef } from '@veecode-platform/plugin-kubernetes';
import useAsync from 'react-use/lib/useAsync';
import { Progress } from '@backstage/core-components';
import { useEntity, MissingAnnotationEmptyState } from '@backstage/plugin-catalog-react';
import { Grid } from '@material-ui/core';
import OpenInNewIcon from "@material-ui/icons/OpenInNew"
import { InfoCard, Content, Link, StructuredMetadataTable, Table, StatusOK, StatusError } from '@backstage/core-components';
import { ClusterCapacity, ClusterInformation, ClusterLinks, ClusterNamespace, ClusterNodes, ClusterResponse, NamespacesResponse, NodeResponse } from '../../utils/types';
import { useEntityAnnotations } from '../../hooks';
import { Entity } from '@backstage/catalog-model';
import { convertCpuValues } from '../../utils/helpers/convertCpuValues';
import { convertMemoryValues } from '../../utils/helpers/convertMemoryValues';
import { showMemoryDisplayValueInGi } from '../../utils/helpers/showMemoryDisplayValueInGi';
import { initialNodeInfoState, NodeInfoReducer } from './state';
import { InfoButton } from './infoButton/InfoButton';
import { ClusterNotConfigured } from './clusterNotConfigured';
import { SwitchStatuses } from './switchStatuses';
import { DrawerComponent } from './DrawerComponent/DrawerComponent';


export const ClusterOverview = () => {
    const [isOpen, toggleDrawer] = React.useState(false);
    const [nodeInfoState, nodeInfoDispatch] = React.useReducer(NodeInfoReducer, initialNodeInfoState);
    const { entity } = useEntity();
    const { clusterName, clusterMode } = useEntityAnnotations(entity as Entity);
    const kubernetesApi = useApi(kubernetesApiRef);

    const { loading, error, value } = useAsync(async (): Promise<ClusterResponse> => {

        const namespaces: any = await (await kubernetesApi.proxy({
            clusterName: clusterName,
            path: '/api/v1/namespaces',
        
        })).json();
        
        if (!namespaces.items) {
            console.log("RESPONSE FROM PROXY NAMESPACES: ", namespaces)
            throw new Error(namespaces.message);
        }

        const nodes: any = await (await kubernetesApi.proxy({
            clusterName: clusterName,
            path: '/api/v1/nodes',

        })).json();

        if (!nodes.items) throw new Error(nodes.message);

        const ingressClasses: any = await (await kubernetesApi.proxy({
            clusterName: clusterName,
            path: '/apis/networking.k8s.io/v1/ingressclasses',

        })).json();

        if (!ingressClasses.items) throw new Error(ingressClasses.message);

        const clusterStatus: Response = await kubernetesApi.proxy({
            clusterName: clusterName,
            path: '/api/v1',
        })

        const services: any = await (await kubernetesApi.proxy({
            clusterName: clusterName,
            path: '/api/v1/services',

        })).json();

        if (!services.items) throw new Error(services.message);

        const namespacesList: ClusterNamespace[] = namespaces.items?.map((namespace: NamespacesResponse) => {
            return <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>{<SwitchStatuses status={namespace.status.phase as string} />}{namespace.metadata?.name}</div>
        })

        const nodesList: ClusterNodes[] = nodes.items?.map((node: NodeResponse) => {
            const fullInfo = {
                name: node.metadata?.name,
                createdAt: node.metadata?.creationTimestamp,
                id: node.metadata?.uid,
                os: node.metadata?.labels["kubernetes.io/os"],
                arch: node.metadata?.labels["kubernetes.io/arch"],
                region: node.metadata?.labels.region,
                capacity: {
                    cpu: node.status.capacity.cpu,
                    memory: node.status.capacity.memory,
                    pods: node.status.capacity.pods,
                },
                internalIp: node.status.addresses[0].address,
                externalIp: node.status.addresses[1].address,
                kubeletVersion: node.status.nodeInfo.kubeletVersion,
                kernelVersion: node.status.nodeInfo.kernelVersion,
                osImage: node.status.nodeInfo.osImage,
            }
            return {
                ...fullInfo,
                info: <InfoButton info={fullInfo} toggleDrawer={toggleDrawer} nodeInfoDispatch={nodeInfoDispatch} />
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
            capacity.pods += Number(node.capacity.pods)
        })
        capacity.memory = showMemoryDisplayValueInGi(memory)

        const info: ClusterInformation = {
            status: clusterStatus.status === 200 ? <StatusOK>{clusterStatus.statusText}</StatusOK> : <StatusError>{clusterStatus.statusText}</StatusError>,
            name: clusterName,
            namespaces: namespacesList
        }

        const servicesLoadBalancerList = services.items?.filter((service: { spec: { type: string; }; }) => service.spec.type === "LoadBalancer")

        const mapedIngressClasses = servicesLoadBalancerList.map(
            (serviceLoadBalancer: { metadata: { labels: { [x: string]: any; }; }; status: { loadBalancer: { ingress: any[]; }; }; }) => {

                const filteredIngressClass = ingressClasses.items?.find(
                    (ingressClass: { metadata?: { labels: { [x: string]: any; }; }; }) =>
                        ingressClass.metadata?.labels["app.kubernetes.io/instance"] === serviceLoadBalancer.metadata?.labels["app.kubernetes.io/instance"]
                )
                if (!filteredIngressClass) return null
                const ipList = serviceLoadBalancer.status?.loadBalancer?.ingress?.length > 0 ? serviceLoadBalancer.status?.loadBalancer?.ingress.map((ingress: { hostname: any; ip: any; }) => ingress.hostname ? ingress.hostname : ingress.ip).join(",") : "Pending"
                return {
                    name: filteredIngressClass.metadata.name,
                    version: filteredIngressClass.metadata.labels["app.kubernetes.io/version"],
                    createdAt: filteredIngressClass.metadata.creationTimestamp,
                    ip: ipList
                }
            })

        const response: ClusterResponse = {
            nodes: nodesList,
            capacity: capacity,
            info: info,
            ingressClasses: mapedIngressClasses.filter((item: null | any) => item !== null),
        }
        const hasAdminUrl = entity.metadata?.annotations?.["eks/region"]


        if (hasAdminUrl) {
            const clusterlinks: ClusterLinks = {
                admin:
                    <Link to={`https://${hasAdminUrl}.console.aws.amazon.com/eks/home?region=${hasAdminUrl}#/clusters/${clusterName}`}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2px" }}>
                            Cluster Manager Console
                            <OpenInNewIcon />
                        </div>
                    </Link>
            }
            response.links = clusterlinks
        }

        return response

    }, []);

    if (!clusterName)
        return (
            <Grid item lg={12}>
                <MissingAnnotationEmptyState
                    annotation={['veecode/cluster-name']}
                />
            </Grid>
        );

    if (loading) return <Progress />;

    if (error) return <ClusterNotConfigured error={error} />

    if (!value) return null;

    return (
        <Content>
            <Grid container spacing={4} direction="row">
                <DrawerComponent
                    isOpen={isOpen}
                    toggleDrawer={toggleDrawer}
                    nodeInfoState={nodeInfoState as ClusterNodes}

                />
                <Grid item md={3} sm={12} >{/* left-side div: cluster info + capacity*/}
                    <Grid container spacing={1}>
                        <Grid item md={12} sm={12} style={{ maxHeight: "600px", overflow: "auto" }}>
                            <InfoCard title="Cluster information">
                                <StructuredMetadataTable dense={false} metadata={value.info} />
                            </InfoCard>
                        </Grid>
                        {
                            value.links ?
                                <Grid item md={12}>
                                    <InfoCard title="Links">
                                        <div>{value.links.admin}</div>
                                    </InfoCard>
                                </Grid>
                                : null
                        }
                        <Grid item md={12}>
                            <InfoCard title="Capacity">
                                <StructuredMetadataTable metadata={value.capacity} />
                            </InfoCard>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item md={9} sm={12}> {/* right-side div: node table + ingress classes*/}
                    <Grid container spacing={2}>
                        <Grid item md={12}>
                            <Table
                                title="Nodes"
                                columns={[
                                    { title: 'Name', field: 'name' },
                                    { title: 'Os', field: 'os' },
                                    { title: 'Arch', field: 'arch' },
                                    { title: "Info", field: "info" },
                                    { title: 'Creation', field: 'createdAt' }
                                ]}
                                data={value.nodes}
                                options={{ search: true, paging: true }} />
                        </Grid>
                        {clusterMode !== "demo" && (<Grid item md={12}>
                            <Table
                                title="Ingress classes"
                                columns={[
                                    { title: 'Name', field: 'name' },
                                    { title: 'Ip', field: 'ip' },
                                    { title: 'Version', field: 'version' },
                                    { title: 'Creation', field: 'createdAt' }
                                ]}
                                data={value.ingressClasses}
                                options={{ search: true, paging: true }} />
                        </Grid>)}
                    </Grid>
                </Grid>
            </Grid>
        </Content>
    )

}