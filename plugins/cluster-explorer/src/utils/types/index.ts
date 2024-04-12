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

export type NodeResponse = { metadata: { [x: string]: any; name: any; creationTimestamp: any; uid: any; region: any; }; status: { capacity: { cpu: any; memory: any; pods: any; }; addresses: { address: any; }[]; nodeInfo: { kubeletVersion: any; kernelVersion: any; osImage: any; }; }; }
export type NamespacesResponse = { metadata: { name: string; }; status: { phase: string; }; }