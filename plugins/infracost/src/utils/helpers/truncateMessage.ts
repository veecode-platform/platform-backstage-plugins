export const truncateMessage = (message:string) => {
    const regex = /^(.*?)(?:\s+at\s+)/s;
    const match = message.match(regex);
  
    if (match) return match[1].trim();
    return message;
  };