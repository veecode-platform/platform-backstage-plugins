export interface MockDataProps {
    id: string,
    name: string,
    description: string
}

export const mockData = [
  {id: '0000000001',
    name: 'Item01',
    description:'Description Example for Item01'
  },
  {id: '0000000002',
    name: 'Item02',
    description:'Description Example for Item02'
  },
  {id: '0000000003',
    name: 'Item03',
    description:'Description Example for Item03'
  },
  {id: '0000000004',
    name: 'Item04',
    description:'Description Example for Item04'
  },
  {id: '0000000005',
    name: 'Item05',
    description:'Description Example for Item05'
  }
] as MockDataProps[]