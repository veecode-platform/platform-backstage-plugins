export const entityMock = {
    apiVersion: 'backstage.io/v1alpha1',
    kind: 'Component',
    metadata: {
      name: 'teste-lambda',
      description: 'teste',
      annotations: {
        'gitlab.com/project-slug': 'ValberJunior/teste-lambda',
        'backstage.io/techdocs-ref': 'dir:.',
        'aws.com/lambda-function-name': 'teste-lambda-start',
        'aws.com/lambda-region': 'us-east-1',
      },
    },
    spec: {
      type: 'service',
      lifecycle: 'experimental',
      owner: 'vjunior',
    },
  };
  