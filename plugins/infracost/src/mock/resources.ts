const chartData = [
    {
      resourceName: 'aws_instance.platform_ec2',
      monthlyCost:'31.168', // ? 
      costComponents: [
        {
          name: 'Instance usage (Linux/UNIX, on-demand, t3.medium)',
          monthlyQuantity: '730',
          unit: 'hours',
          monthlyCost: '30.368',
        },
        {
          name: 'CPU credits',
          monthlyQuantity: '0',  
          unit: 'vCPU-hours',
          monthlyCost: '0',
        }
      ],
      subResources: [{
        name: 'root_block_device',
        monthlyCost: '0.8',
        costComponents: [
          {
            name: 'Storage (general purpose SSD, gp2)',
            monthlyQuantity: '8',
            unit: 'GB',
            monthlyCost: '0.8',
          }
        ]
      }]
    },
    {
      resourceName: 'aws_efs_file_system.efs',
      monthlyCost:'31.168', 
      costComponents: [
        {
          name: 'CPU credits',
          monthlyQuantity: '0', 
          unit: 'GB',
          price: '0.3',  // ?
          monthlyCost: '0',
          usageBased: true // ? boolean
        }
      ],
    },
  ]