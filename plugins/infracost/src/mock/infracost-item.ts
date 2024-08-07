export const projectMock = {
  id: '41ea33a4-a357-41cb-b31f-0bcbb03c55c4',
  name: 'ec2-cluster-apr',
  currency: 'USD',
  projects: [
    {
      name: 'veecode-platform/ec2-cluster-apr',
      metadata: {
        path: '.',
        type: 'terraform_dir',
        vcsCodeChanged: true,
        providers: [
          { name: 'aws', filename: 'provider.tf', startLine: 1, endLine: 5 },
          {
            name: 'kubectl',
            filename: 'provider.tf',
            startLine: 13,
            endLine: 18,
          },
          {
            name: 'kubernetes',
            filename: 'provider.tf',
            startLine: 7,
            endLine: 11,
          },
        ],
      },
      pastBreakdown: {
        resources: [
          {
            name: 'aws_instance.platform_ec2',
            resourceType: 'aws_instance',
            tags: { Name: 'ec2-cluster-apr', Template: 'Platform_Ec2' },
            metadata: {
              calls: [
                {
                  blockName: 'aws_instance.platform_ec2',
                  endLine: 119,
                  filename: 'main.tf',
                  startLine: 96,
                },
              ],
              checksum:
                'fbd1a4dc63e2543f728eae53343dfde166310fd613d450b81b4d0af9018531eb',
              endLine: 119,
              filename: 'main.tf',
              startLine: 96,
            },
            hourlyCost: '0.0426958904109589',
            monthlyCost: '31.168',
            costComponents: [
              {
                name: 'Instance usage (Linux/UNIX, on-demand, t3.medium)',
                unit: 'hours',
                hourlyQuantity: '1',
                monthlyQuantity: '730',
                price: '0.0416',
                hourlyCost: '0.0416',
                monthlyCost: '30.368',
              },
              {
                name: 'CPU credits',
                unit: 'vCPU-hours',
                hourlyQuantity: '0',
                monthlyQuantity: '0',
                price: '0.05',
                hourlyCost: '0',
                monthlyCost: '0',
              },
            ],
            subresources: [
              {
                name: 'root_block_device',
                metadata: {},
                hourlyCost: '0.0010958904109589',
                monthlyCost: '0.8',
                costComponents: [
                  {
                    name: 'Storage (general purpose SSD, gp2)',
                    unit: 'GB',
                    hourlyQuantity: '0.010958904109589',
                    monthlyQuantity: '8',
                    price: '0.1',
                    hourlyCost: '0.0010958904109589',
                    monthlyCost: '0.8',
                  },
                ],
              },
            ],
          },
          {
            name: 'aws_efs_file_system.efs',
            resourceType: 'aws_efs_file_system',
            tags: {},
            metadata: {
              calls: [
                {
                  blockName: 'aws_efs_file_system.efs',
                  endLine: 129,
                  filename: 'main.tf',
                  startLine: 129,
                },
              ],
              checksum:
                '44136fa355b3678a1146ad16f7e8649e94fb4fc21fe77e8310c060f61caaff8a',
              endLine: 129,
              filename: 'main.tf',
              startLine: 129,
            },
            costComponents: [
              {
                name: 'Storage (standard)',
                unit: 'GB',
                hourlyQuantity: null,
                monthlyQuantity: null,
                price: '0.3',
                hourlyCost: null,
                monthlyCost: null,
                usageBased: true,
              },
            ],
          },
        ],
        totalHourlyCost: '0.0426958904109589',
        totalMonthlyCost: '31.168',
        totalMonthlyUsageCost: '0',
      },
      breakdown: {
        resources: [
          {
            name: 'aws_instance.platform_ec2',
            resourceType: 'aws_instance',
            tags: { Name: 'ec2-cluster-apr', Template: 'Platform_Ec2' },
            metadata: {
              calls: [
                {
                  blockName: 'aws_instance.platform_ec2',
                  endLine: 119,
                  filename: 'main.tf',
                  startLine: 96,
                },
              ],
              checksum:
                'fbd1a4dc63e2543f728eae53343dfde166310fd613d450b81b4d0af9018531eb',
              endLine: 119,
              filename: 'main.tf',
              startLine: 96,
            },
            hourlyCost: '0.0426958904109589',
            monthlyCost: '31.168',
            costComponents: [
              {
                name: 'Instance usage (Linux/UNIX, on-demand, t3.medium)',
                unit: 'hours',
                hourlyQuantity: '1',
                monthlyQuantity: '730',
                price: '0.0416',
                hourlyCost: '0.0416',
                monthlyCost: '30.368',
              },
              {
                name: 'CPU credits',
                unit: 'vCPU-hours',
                hourlyQuantity: '0',
                monthlyQuantity: '0',
                price: '0.05',
                hourlyCost: '0',
                monthlyCost: '0',
              },
            ],
            subresources: [
              {
                name: 'root_block_device',
                metadata: {},
                hourlyCost: '0.0010958904109589',
                monthlyCost: '0.8',
                costComponents: [
                  {
                    name: 'Storage (general purpose SSD, gp2)',
                    unit: 'GB',
                    hourlyQuantity: '0.010958904109589',
                    monthlyQuantity: '8',
                    price: '0.1',
                    hourlyCost: '0.0010958904109589',
                    monthlyCost: '0.8',
                  },
                ],
              },
            ],
          },
          {
            name: 'aws_efs_file_system.efs',
            resourceType: 'aws_efs_file_system',
            tags: {},
            metadata: {
              calls: [
                {
                  blockName: 'aws_efs_file_system.efs',
                  endLine: 129,
                  filename: 'main.tf',
                  startLine: 129,
                },
              ],
              checksum:
                '44136fa355b3678a1146ad16f7e8649e94fb4fc21fe77e8310c060f61caaff8a',
              endLine: 129,
              filename: 'main.tf',
              startLine: 129,
            },
            costComponents: [
              {
                name: 'Storage (standard)',
                unit: 'GB',
                hourlyQuantity: null,
                monthlyQuantity: null,
                price: '0.3',
                hourlyCost: null,
                monthlyCost: null,
                usageBased: true,
              },
            ],
          },
        ],
        totalHourlyCost: '0.0426958904109589',
        totalMonthlyCost: '31.168',
        totalMonthlyUsageCost: '0',
      },
      diff: {
        resources: [],
        totalHourlyCost: '0',
        totalMonthlyCost: '0',
        totalMonthlyUsageCost: '0',
      },
      summary: {
        totalDetectedResources: 9,
        totalSupportedResources: 2,
        totalUnsupportedResources: 0,
        totalUsageBasedResources: 2,
        totalNoPriceResources: 7,
        unsupportedResourceCounts: {},
        noPriceResourceCounts: {
          aws_efs_mount_target: 1,
          aws_eip: 1,
          aws_internet_gateway: 1,
          aws_route_table: 1,
          aws_route_table_association: 1,
          aws_security_group: 1,
          aws_subnet: 1,
        },
      },
    },
  ],
  total_hourly_cost: '0.0426958904109589',
  total_monthly_cost: '0.0426958904109589',
  total_monthly_usage_cost: '0',
  past_total_hourly_cost: '0.0426958904109589',
  past_total_monthly_cost: '31.168',
  past_total_monthly_usage_const: '0',
  diff_total_hourly_cost: '0',
  diff_total_monthly_cost: '0',
  diff_total_monthly_usage_cost: '0',
  sumary:
    '{""totalDetectedResources"":9,""totalSupportedResources"":2,""totalUnsupportedResources"":0,""totalUsageBasedResources"":2,""totalNoPriceResources"":7,""unsupportedResourceCounts"":{},""noPriceResourceCounts"":{""aws_efs_mount_target"":1,""aws_eip"":1,""aws_internet_gateway"":1,""aws_route_table"":1,""aws_route_table_association"":1,""aws_security_group"":1,""aws_subnet"":1}}',
  time_generated: '2024-05-06 13:24:32.166511+00',
  created_at: '2024-06-24 17:44:15.735024+00',
  updated_at: '2024-06-24 17:44:18.892+00',
};
