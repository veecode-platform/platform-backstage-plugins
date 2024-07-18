export enum Protocols {
  GRPC = "grpc",
  GRPCS = "grpcs",
  GRPC_GRPCS = "grpc,grpcs",
  HTTP = "http",
  HTTPS = "https",
  HTTP_HTTPS = "http,https",
  TCP = "tcp",
  TLS = "tls",
  UDP = "udp",
  TLS_UDP = "tls,udp",
  TCP_UDP = "tcp,udp",
  TCP_TLS = "tcp,tls",
  TCP_TLS_UDP = "tcp,tls,udp",
  TLS_PASSTHROUGH = "tls_passthrough",
  WS = "ws",
  WSS = "wss",
  WS_WSS = "ws,wss"
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
