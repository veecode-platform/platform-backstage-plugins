import React from 'react';
import { useApi } from '@backstage/core-plugin-api';
import { kubernetesApiRef } from '@backstage/plugin-kubernetes';
import useAsync from 'react-use/lib/useAsync';
import { CodeSnippet, EmptyState, Progress } from '@backstage/core-components';
import { useEntity, MissingAnnotationEmptyState } from '@backstage/plugin-catalog-react';
import { Grid, Drawer, IconButton } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import OpenInNewIcon from "@material-ui/icons/OpenInNew"
import { InfoCard, Content, Link, StructuredMetadataTable, Table, StatusOK, StatusError, StatusWarning} from '@backstage/core-components';
import { InfoBox } from '../shared';
import { ClusterCapacity, ClusterInformation, ClusterLinks, ClusterNamespace, ClusterNodes, ClusterResponse, NamespacesResponse, NodeResponse } from '../../utils/types';
import { useEntityAnnotations } from '../../hooks';
import { Entity } from '@backstage/catalog-model';
import { truncateMessage } from '../../utils/helpers/truncateMessage';
import { useDrawerStyles } from './styles';
import { convertCpuValues } from '../../utils/helpers/convertCpuValues';
import { convertMemoryValues } from '../../utils/helpers/convertMemoryValues';
import { showMemoryDisplayValueInGi } from '../../utils/helpers/showMemoryDisplayValueInGi';


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



export const ClusterOverview = () => {
    const [isOpen, toggleDrawer] = React.useState(false);
    const [nodeInfo, setNodeInfo] = React.useState<Partial<ClusterNodes>>()
    const { entity } = useEntity();
    const { clusterName,clusterMode } = useEntityAnnotations(entity as Entity);
    const kubernetesApi = useApi(kubernetesApiRef);
    const classes = useDrawerStyles();
    
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

    const { loading, error, value } = useAsync(async (): Promise<ClusterResponse> => {

        const namespaces: any = await (await kubernetesApi.proxy({
            clusterName: clusterName,
            path: '/api/v1/namespaces',

        })).json();

        if (!namespaces.items) throw new Error(namespaces.message);

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
            return <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>{switchStatuses(namespace.status.phase as string)}{namespace.metadata?.name}</div>
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
            if(!filteredIngressClass) return null
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

    if (error) return (
      <Content>
        <Grid container spacing={2}>
          <InfoBox
            message={truncateMessage(error?.stack as string) ?? "The cluster information could not be loaded. Possible reason: the cluster has been paused or is slow...."}
            url="https://github.com/veecode-platform/platform-backstage-plugins/tree/master/plugins/cluster-explorer"
          />
          <Grid item lg={12} md={12} xs={12}>
            <EmptyState
              title="Cluster not configured"
              missing="field"
              description="You need to add the settings for this cluster to the application's configuration files, like this:"
              action={
                <>
                  <InfoCard title="Configuration">
                       <CodeSnippet 
                         text={`kubernetes:\n  serviceLocatorMethod:\n    type: multiTenant\n  clusterLocatorMethods:\n   - type: "config"\n     clusters:\n       - url: $KUBERNETES_URL\n         name: $NAME\n         authProvider: serviceAccount\n         skipTLSVerify: false\n         skipMetricsLookup: false\n         skipMetricsLookup: false\n         serviceAccountToken: $KUBERNETES_SERVICE_ACCOUNT_TOKEN\n         caData: $KUBERNETES_CERTIFICATE_DATA`} 
                         language="yaml" 
                         showCopyCodeButton 
                         />
                  </InfoCard>
                </>
              }
            />
          </Grid>
        </Grid>
      </Content>
    );

    if(!value) return null;
    
        return (
            <Content>
                <Grid container spacing={4} direction="row">
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
                        <Grid container spacing={1}>
                            <Grid item md={12} sm={12} style={{maxHeight: "600px", overflow: "auto"}}>
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
                            { clusterMode !== "demo" && ( <Grid item md={12}>
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