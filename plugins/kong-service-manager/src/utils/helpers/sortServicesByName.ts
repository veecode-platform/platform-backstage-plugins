
export const sortServicesByName = (serviceNames : string[]) => {
    if ( serviceNames === null || serviceNames === undefined) return [];
    return serviceNames.sort((a, b) => a.localeCompare(b));
  }
  