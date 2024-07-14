export enum Protocols {
    GRPC = "GRPC",
    GRPCS = "GRPCS",
    GRPC_GRPCS = "GRPC, GRPCS",
    HTTP = "HTTP",
    HTTPS = "HTTPS",
    HTTP_HTTPS = "HTTP, HTTPS",
    TCP = "TCP",
    TLS = "TLS",
    UDP = "UDP",
    TLS_UDP = "TLS, UDP",
    TCP_UDP = "TCP, UDP",
    TCP_TLS = "TCP, TLS",
    TCP_TLS_UDP = "TCP, TLS, UDP",
    TLS_PASSTHROUGH = "TLS_PASSTHROUGH",
    WS = "WS",
    WSS = "WSS",
    WS_WSS = "WS, WSS"
  }

export enum ProtocolDescriptions {
    GRPC = "Hosts, Paths, Headers",
    GRPCS = "Hosts, Paths, Headers, SNIs",
    GRPC_GRPCS = "Hosts, Paths, Headers, SNIs",
    HTTP = "Hosts, Methods, Paths, Headers",
    HTTPS = "Hosts, Methods, Paths, Headers, SNIs",
    HTTP_HTTPS = "Hosts, Methods, Paths, Headers, SNIs",
    TCP = "Sources, Destinations",
    TLS = "Sources, Destinations, SNIs",
    UDP = "Sources, Destinations",
    TLS_UDP = "Sources, Destinations, SNIs",
    TCP_UDP = "Sources, Destinations",
    TCP_TLS = "Sources, Destinations, SNIs",
    TCP_TLS_UDP = "Sources, Destinations, SNIs",
    TLS_PASSTHROUGH = "SNIs",
    WS = "Hosts, Paths, Headers",
    WSS = "Hosts, Paths, Headers, SNIs",
    WS_WSS = "Hosts, Paths, Headers, SNIs"
};
