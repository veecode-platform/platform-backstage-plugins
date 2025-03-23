export const getLanguageFromFilename = (filename: string) => {
    if (filename.startsWith('.')) return filename.substring(1).toLowerCase();
    const parts = filename.split('.');
    if (parts.length > 1 ) {
      return parts.pop()!.toLowerCase();
    }
    return 'text';
  };