export const entityMock = {
    apiVersion: 'veecode.backstage.io/v1alpha1',
    kind: 'Cluster',
    metadata: {
      name: 'ec2-cluster-apr',
      description: 'An ec2 example',
      annotations: {
        'github.com/project-slug': 'veecode-platform/ec2-cluster-apr',
        'backstage.io/techdocs-ref': 'dir:.',
        'infracost/project': 'ec2-cluster-apr'
      },
    },
    spec: {
      type: 'ec2',
      lifecycle: 'experimental',
      owner: 'group:default/admin',
    },
  };
